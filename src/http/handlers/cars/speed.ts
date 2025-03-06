import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export function SpeedHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  car?.setSpeed(req.body.speed, req.body.acceleration)

  res.json({
    id: car?.id,
  })
}