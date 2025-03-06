import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export function CancelLaneChangeHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  car?.cancelLangeChange()

  res.json({
    id: car?.id,
    connected: car?.connected ? "yes" : "no",
  })
}