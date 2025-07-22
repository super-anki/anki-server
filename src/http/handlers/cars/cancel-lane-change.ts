import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export function CancelLaneChangeHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  car?.cancelLangeChange()

  Factory.getInstance().debug(`Cancelled lane change for car ${car?.id}`)

  res.json({
    id: car?.id,
    connected: car?.connected ? "yes" : "no",
  })
}