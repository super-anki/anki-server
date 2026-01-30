#!/usr/bin/env node

import { EventEmitter } from "node:events"
import { Factory } from "./common/logger"
import { CarStore } from "@super-anki/anki-sdk"
import { ApiService } from "./services/api"

EventEmitter.defaultMaxListeners = Infinity

const logger = Factory.getInstance()
const port = process.env.PORT || 3000

logger.info("Starting server...")
CarStore.getInstance().startLooking()

new ApiService(port)

process.on("SIGINT", () => {
  logger.info("Stopping server...")

  const store = CarStore.getInstance()
  const connectedCars = store.getCars().filter((car) => car.connected)
  store.stopLooking()

  logger.info(`Found ${connectedCars.length} connected cars`)
  connectedCars.forEach((car) => {
    logger.info(`Disconnecting car ${car.id}`)
    car.disconnect().catch(logger.error)
  })

  setTimeout(() => {
    logger.info("Server stopped")
    process.exit(0)
  }, 1500)
})
