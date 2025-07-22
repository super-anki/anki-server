import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export async function DisconnectHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  await car?.disconnect()

  Factory.getInstance().debug(`Disconnected car ${car?.id}`)

  res.json({
    id: car?.id,
    connected: car?.connected ? "yes" : "no",
  })
}