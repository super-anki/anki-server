import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export function OffsetHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  car?.setOffset(req.body.offset)
    
  res.json({
    id: car?.id,
  })
}