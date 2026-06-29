import * as gpsd from 'node-gpsd' // see: https://github.com/eelcocramer/node-gpsd

const GET_CURRENT_POSITION_TIMEOUT = 5_000 // in milliseconds

class GPSHandler {
    private static _instance: GPSHandler | null
    public static get instance(): GPSHandler {
        if (!this._instance) {
            this._instance = new GPSHandler()
        }

        return this._instance
    }

    private listener: any | null = null

    private constructor () {
        this.init()
    }

    private init () {
        console.log('[GPSHandler] Initialize listener')

        // Listen the GPSD deamon events.
        // note: the deamon have to be started before starting listening.
        this.listener = new gpsd.Listener({
            port: process.env.GPSD_PORT,
            hostname: process.env.GPSD_HOSTNAME,
            logger:  {
                info: (...args: any) => console.log('[GPSHandler:listener]', ...args),
                warn: (...args: any) => console.warn('[GPSHandler:listener]', ...args),
                error: (...args: any) => console.error('[GPSHandler:listener]', ...args),
            },
            parse: true
        });
    }

    connect () {
        if (!this.listener) {
            throw Error('[GPSHandler] listener not initialized')
        }

        if (this.listener.isConnected()) {
            console.warn('[GPSHandler] listener already connected!')
            return
        }

        this.listener.connect()
    }

    disconnect () {
        if (!this.listener) {
            throw Error('[GPSHandler] listener not initialized')
        }

        if (!this.listener.isConnected()) {
            console.warn('[GPSHandler] listener already disconnected!')
            return
        }

        this.listener.unwatch()
        this.listener.disconnect()
    }

    async getCurrentPosition (): Promise<Position | null> {
        const promise = new Promise<Position | null>((resolve, reject) => {
            try {
                // Use a timeout to end the Promise to avoid to be stuck.
                const timeout = setTimeout(() => resolve(null), GET_CURRENT_POSITION_TIMEOUT)

                this.connect()

                this.listener.on('TPV', (data: TPVData) => {
                    clearInterval(timeout)
                    resolve({ lat: data.lat, lon: data.lon })
                })

                this.listener.watch({class: 'WATCH', json: true, nmea: false})
            } catch (error) {
                console.error('[GPSHandler:getCurrentPosition]', error)
                resolve(null)
            }
        })

        promise.finally(this.disconnect.bind(this))

        return promise
    }
}

export interface Position {
    lat: number,
    lon: number
}

export interface TPVData {
  class: string
  device: string
  mode: number
  time: string
  leapseconds: number
  ept: number
  lat: number
  lon: number
  altHAE: number
  altMSL: number
  alt: number
  epx: number
  epy: number
  epv: number
  track: number
  magtrack: number
  magvar: number
  speed: number
  climb: number
  eps: number
  epc: number
  ecefx: number
  ecefy: number
  ecefz: number
  ecefvx: number
  ecefvy: number
  ecefvz: number
  ecefpAcc: number
  ecefvAcc: number
  velN: number
  velE: number
  velD: number
  geoidSep: number
  eph: number
  sep: number
  clockbias: number
  clockdrift: number
}

export default GPSHandler
