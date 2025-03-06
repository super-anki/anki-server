import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export function ChangeLaneHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  const { offset, speed, acceleration, hopIntent, tag } = req.body

  car?.changeLane(offset, speed, acceleration, hopIntent, tag)

  res.json({
    id: car?.id,
  })
}