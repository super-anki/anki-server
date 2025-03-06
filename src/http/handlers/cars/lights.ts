import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export function LightsHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  car?.setLights(req.body.lights)

  res.json({
    id: car?.id,
  })
}