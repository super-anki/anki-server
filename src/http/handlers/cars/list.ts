import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export function ListCarsHandler(req: Request, res: Response) {
  const cars = CarStore.getInstance().getCars()

  res.json(cars?.map((car) => ({
    id: car.id,
    connected: car.connected ? "yes" : "no",
  })))
}