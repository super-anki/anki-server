import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export async function ConnectHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  await car?.connect()

  Factory.getInstance().debug(`Connected car ${car?.id}`)

  res.json({
    id: car?.id,
    connected: car?.connected ? "yes" : "no",
  })
}