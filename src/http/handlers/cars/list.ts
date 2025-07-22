import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export function ListCarsHandler(req: Request, res: Response) {
  const cars = CarStore.getInstance().getCars()

  Factory.getInstance().debug(`Listing cars: ${cars.map(car => car.id).join(", ")}`)

  res.json(cars?.map((car) => ({
    id: car.id,
    connected: car.connected ? "yes" : "no",
  })))
}