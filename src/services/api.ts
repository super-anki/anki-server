import { Factory } from "@/common/logger"
import { BatteryHandler } from "@/http/handlers/cars/battery"
import { CancelLaneChangeHandler } from "@/http/handlers/cars/cancel-lane-change"
import { ChangeLaneHandler } from "@/http/handlers/cars/change-lane"
import { ConnectHandler } from "@/http/handlers/cars/connect"
import { DisconnectHandler } from "@/http/handlers/cars/disconnect"
import { LightsHandler } from "@/http/handlers/cars/lights"
import { LightsPatternHandler } from "@/http/handlers/cars/lights-pattern"
import { ListCarsHandler } from "@/http/handlers/cars/list"
import { OffsetHandler } from "@/http/handlers/cars/offset"
import { PingHandler } from "@/http/handlers/cars/ping"
import { SpeedHandler } from "@/http/handlers/cars/speed"
import { TurnHandler } from "@/http/handlers/cars/turn"
import { VersionHandler } from "@/http/handlers/cars/version"
import { ScanTrackHandler } from "@/http/handlers/track/scan"
import type { Application, RequestHandler } from "express"
import express from "express"
import bodyParser from "body-parser"
import type { Logger } from "log4js"

type Route = {
    method: "get" | "post"
    path: string
    handler: RequestHandler
}

const routes: Array<Route> = [
  { method: "get", path: "/cars", handler: ListCarsHandler },
  { method: "post", path: "/cars/:id/connect", handler: ConnectHandler },
  { method: "post", path: "/cars/:id/disconnect", handler: DisconnectHandler },
  { method: "post", path: "/cars/:id/cancel-lane-change", handler: CancelLaneChangeHandler },
  { method: "post", path: "/cars/:id/change-lane", handler: ChangeLaneHandler },
  { method: "post", path: "/cars/:id/battery", handler: BatteryHandler },
  { method: "post", path: "/cars/:id/lights", handler: LightsHandler },
  { method: "post", path: "/cars/:id/lights-pattern", handler: LightsPatternHandler },
  { method: "post", path: "/cars/:id/offset", handler: OffsetHandler },
  { method: "post", path: "/cars/:id/ping", handler: PingHandler },
  { method: "post", path: "/cars/:id/speed", handler: SpeedHandler },
  { method: "post", path: "/cars/:id/turn", handler: TurnHandler },
  { method: "post", path: "/cars/:id/version", handler: VersionHandler },
  { method: "post", path: "/track/scan", handler: ScanTrackHandler },
]

export class ApiService {
  private app: Application
  private logger: Logger = Factory.getInstance()

  public constructor(port: number) {
    this.app = express()

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    this.registerRoutes()

    this.app.listen(port, () => {
      this.logger.info(`API service is running on port ${port}`)
    })
  }

  private registerRoutes(): void {
    routes.forEach(({ method, path, handler }) => {
      this.app[method](path, handler)
    })
  }
}
