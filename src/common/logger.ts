import type { Logger } from "log4js"
import { configure, getLogger } from "log4js"

const devMode = process.env.NODE_ENV  !== "production"

configure({
  appenders: {
    console: {
      type: "console",
    },
    file: {
      filename: "logs/server.log",
      pattern: "-yyyy-MM-dd",
      type: "dateFile",
    },
  },
  categories: {
    default: { appenders: ["console", "file"], level: "INFO" },
    dev: { appenders: ["console", "file"], level: "DEBUG" },
  },
})

export class Factory {
  public static getInstance(): Logger {
    return getLogger(devMode ? "dev" : "default")
  }
}