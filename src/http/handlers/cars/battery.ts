import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export async function BatteryHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  const battery = await car?.getBatteryLevel()

  Factory.getInstance().debug(`Battery level for car ${car?.id}: ${battery}`)

  res.json({
    id: car?.id,
    battery,
  })
}