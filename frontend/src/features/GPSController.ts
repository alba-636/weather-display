const FALLBACK_POSITION_KEY = 'fallback_position'

class GPSController {
    static async fetchCurrentPosition (fallback?: Position): Promise<Position | null> {
        try {
            const response = await fetch('http://localhost:4242/api/position')
            const json = await response.json()
            if (json?.lat && json?.lon) {
                return json as Position
            }
        } catch (error) {
            console.error('[GPSController:fetchCurrentPosition]', error)
        }
        
        return null
    }

    static getFallbackPosition (): Position {
        try {
            const fallback =  window.localStorage.getItem(FALLBACK_POSITION_KEY)
            if (fallback) return JSON.parse(fallback) as Position
        } catch (error) {
            console.error('[GPSController:getFallbackPosition]', error)
        }
        return { lat: 0, lon: 0, alt: 0 }
    }

    static setFallbackPosition (position: Position) {
        try {
            window.localStorage.setItem(FALLBACK_POSITION_KEY, JSON.stringify(position))
        } catch (error) {
            console.error('[GPSController:setFallbackPosition]', error)
        }
    }
}

export default GPSController

export interface Position {
    lat: number,
    lon: number,
    alt: number,
}
