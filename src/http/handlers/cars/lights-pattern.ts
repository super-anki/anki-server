import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export function LightsPatternHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  const {
    redStart,
    redEnd,
    greenStart,
    greenEnd,
    blueStart,
    blueEnd,
    target,
    pattern,
    cycle,
  } = req.body

  car?.setLightsPattern(
    redStart,
    redEnd,
    greenStart,
    greenEnd,
    blueStart,
    blueEnd,
    target,
    pattern,
    cycle,
  )

  res.json({
    id: car?.id,
  })
}