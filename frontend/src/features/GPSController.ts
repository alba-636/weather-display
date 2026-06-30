
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
}

export default GPSController

export interface Position {
    lat: number,
    lon: number
}
