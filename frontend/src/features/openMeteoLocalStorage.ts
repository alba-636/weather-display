
const OPEN_METEO_MODEL_KEY = 'open_meteo_model'
const DEFAULT_MODEL = 'best_match'

class OpenMeteoLocalStorage {
    static getModel (): string {
        return window.localStorage.getItem(OPEN_METEO_MODEL_KEY) ?? DEFAULT_MODEL
    }

    static setModel (model: string) {
        window.localStorage.setItem(OPEN_METEO_MODEL_KEY, model ?? DEFAULT_MODEL)
    }
}

export default OpenMeteoLocalStorage
