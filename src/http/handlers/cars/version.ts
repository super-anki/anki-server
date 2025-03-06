import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export async function VersionHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  const version = await car?.getVersion()

  res.json({
    id: car?.id,
    version,
  })
}