import * as gpsd from 'node-gpsd' // see: https://github.com/eelcocramer/node-gpsd

const CONNECT_TIMEOUT = 5_000 // ms / 5s
const LISTENING_TIMEOOUT = 300_000 // ms / 5m

class GPSHandler {
    private static _instance: GPSHandler | null
    public static get instance(): GPSHandler {
        if (!this._instance) {
            this._instance = new GPSHandler()
        }
        
        return this._instance
    }
    
    private position: Position | undefined
    private listener: any | null = null

    private isListening: boolean = false
    private listeningTimeout: NodeJS.Timeout | null = null

    private constructor () {
        this.init()
    }

    private init () {
        console.log('[GPSHandler] Initialize listener')

        if (this.listener) {
            console.warn('[GPSHandler:init] Listener already initialized!')
            return
        }

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

    async connect(): Promise<boolean>  {
        if (!this.listener) {
            throw Error('[GPSHandler] listener not initialized')
        }

        if (this.listener.isConnected()) {
            console.warn('[GPSHandler] listener already connected!')
            return true
        }

        const connectPromise = new Promise<boolean>(resolve => this.listener.connect(() => resolve(true)))
        const timeoutPromise = new Promise<boolean>(resolve => setTimeout(() => resolve(false), CONNECT_TIMEOUT))

        return Promise.any([connectPromise, timeoutPromise])
    }

    async disconnect (): Promise<boolean> {
        if (!this.listener) {
            throw Error('[GPSHandler] listener not initialized')
        }

        if (!this.listener.isConnected()) {
            console.warn('[GPSHandler] listener already disconnected!')
            return true
        }

        if (this.listeningTimeout) {
            clearTimeout(this.listeningTimeout)
            this.listeningTimeout = null
        }

        const disconnectPromise = new Promise<boolean>(resolve => {
            this.listener.unwatch()
            this.listener.disconnect(() => resolve(true))
        })
        const timeoutPromise = new Promise<boolean>(resolve => setTimeout(() => resolve(false), CONNECT_TIMEOUT))

        return Promise.any([disconnectPromise, timeoutPromise]).finally(() => this.isListening = false)
    }

    async startListening () {
        try {
            const isConnected = await this.connect()
            if (!isConnected) {
                console.warn('[GPSHandler:startListening] Impossible to connect')
                return
            }

            this.listener.on('TPV', (data: TPVData) => {
                if (data.lat && data.lon) {
                    this.position = { lat: data.lat, lon: data.lon, alt: data.alt }
                }
            })

            this.listener.watch({class: 'WATCH', json: true, nmea: false})

            this.listeningTimeout = setTimeout(this.disconnect.bind(this), LISTENING_TIMEOOUT)

            this.isListening = true
        } catch (error) {
            console.error('[GPSHandler:startListening]', error)
        }
    }

    async getCurrentPosition (): Promise<Position | null> {
        if (!this.isListening) {
            await this.startListening()
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
        this.listeningTimeout?.refresh()
        return this.position ?? null
    }
}

export interface Position {
    lat: number,
    lon: number,
    alt: number,
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
