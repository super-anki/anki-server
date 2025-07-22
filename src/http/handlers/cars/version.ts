import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export async function VersionHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  const version = await car?.getVersion()

  Factory.getInstance().debug(`Version for car ${car?.id}: ${version}`)

  res.json({
    id: car?.id,
    version,
  })
}