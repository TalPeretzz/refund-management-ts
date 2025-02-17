import log from "loglevel";

log.setLevel("debug");

const Logger = {
    debug: (message: string, ...optionalParams: any[]) =>
        log.debug(message, ...optionalParams),
    info: (message: string, ...optionalParams: any[]) =>
        log.info(message, ...optionalParams),
    warn: (message: string, ...optionalParams: any[]) =>
        log.warn(message, ...optionalParams),
    error: (message: string, ...optionalParams: any[]) =>
        log.error(message, ...optionalParams),
};

export default Logger;
