import { TrackScanner } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export function ScanTrackHandler(req: Request, res: Response) {
  const scanner = new TrackScanner()

  scanner.scanWith(req.body.carId)

  Factory.getInstance().debug(`Scanning track for car ${req.body.carId}`)

  res.json({
    status: "ok",
  })
}