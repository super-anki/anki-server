import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export async function BatteryHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  const battery = await car?.getBatteryLevel()

  res.json({
    id: car?.id,
    battery,
  })
}