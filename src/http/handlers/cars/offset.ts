import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export function OffsetHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  car?.setOffset(req.body.offset)

  Factory.getInstance().debug(`Set offset for car ${car?.id} to ${req.body.offset}`)
    
  res.json({
    id: car?.id,
  })
}