import { log } from "./deps.ts";

export class Config {
  logLevel!: log.LevelName;
}

export async function config() {
  const config = {
    logLevel: getLogLevel(),
  };
  await setupLogger(config);

  return config;
}

function getLogLevel(): log.LevelName {
  const levels = Object.keys(log.LogLevels).filter((key) => isNaN(Number(key)));
  const raw = (Deno.env.get("LOG_LEVEL") || "").toUpperCase();

  const level = levels.includes(raw) ? raw as log.LevelName : "NOTSET";
  return level !== "NOTSET" ? level : "WARNING";
}

async function setupLogger(config: Config) {
  await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler(config.logLevel, {
        formatter: (record) =>
          JSON.stringify({
            time: record.datetime,
            msg: record.msg,
            level: record.levelName,
            logger: record.loggerName,
            args: record.args.length > 0 ? record.args : undefined,
          }),
      }),
    },

    loggers: {
      default: {
        level: config.logLevel,
        handlers: ["console"],
      },
    },
  });
}
