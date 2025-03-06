import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export async function PingHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  const ping = await car?.getPing()

  res.json({
    id: car?.id,
    ping,
  })
}