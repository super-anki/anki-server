import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export function ChangeLaneHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  const { offset, speed, acceleration, hopIntent, tag } = req.body

  car?.changeLane(offset, speed, acceleration, hopIntent, tag)

  Factory.getInstance().debug(`Changed lane for car ${car?.id} with offset ${offset}, speed ${speed}, acceleration ${acceleration}, hopIntent ${hopIntent}, tag ${tag}`)

  res.json({
    id: car?.id,
  })
}