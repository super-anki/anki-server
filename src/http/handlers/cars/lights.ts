import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export function LightsHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  car?.setLights(req.body.lights)

  Factory.getInstance().debug(`Set lights for car ${car?.id} to ${req.body.lights}`)

  res.json({
    id: car?.id,
  })
}