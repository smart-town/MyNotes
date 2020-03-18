export class Logger {
    constructor(prefix, logFlag = true,) {
        this.prefix = prefix;
        this.logFlag = logFlag;
    }
    log(...message) {
        if (this.logFlag) {
            console.log(`[${this.prefix}]`, ...message)
        }
    }
}