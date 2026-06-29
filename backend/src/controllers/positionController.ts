import type { Request, Response } from 'express-serve-static-core'
import type QueryString from 'qs'
import GPSHandler from '../features/gpsHandler.js'


export async function getPosition (
    req: Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>, number>
) {
    try {
        const position = await GPSHandler.instance.getCurrentPosition()

        if (!position) {
            return res.status(404).json({ code: 'PositionNotFound', message: 'Unable to get position.' })
        }

        res.status(200).json({ lat: position.lat, lon: position.lon })
    } catch (error) {
        console.error('[PositionController:getPosition]', error)
        res.status(500).json({ code: 'InternalServerError', message: 'Error getting current position.' })
    }
}
