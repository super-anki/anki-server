import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export function SpeedHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  car?.setSpeed(req.body.speed, req.body.acceleration)

  Factory.getInstance().debug(`Set speed for car ${car?.id} to ${req.body.speed} with acceleration ${req.body.acceleration}`)

  res.json({
    id: car?.id,
  })
}