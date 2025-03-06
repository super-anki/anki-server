import { TrackScanner } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"

export function ScanTrackHandler(req: Request, res: Response) {
  const scanner = new TrackScanner()

  scanner.scanWith(req.body.carId)

  res.json({
    status: "ok",
  })
}