import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export function TurnHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)

  switch (req.body.direction) {
  case "left":
    car?.turnLeft()
    break
  case "right":
    car?.turnRight()
    break
  case "uturn":
    car?.uTurn()
    break
  case "uturn-jump":
    car?.uTurnJump()
    break
  }

  Factory.getInstance().debug(`Turn for car ${car?.id} in direction ${req.body.direction}`)

  res.json({
    id: car?.id,
  })
}