
const OPEN_METEO_MODEL_KEY = 'open_meteo_model'

class OpenMeteoLocalStorage {
    static getModel (): OpenMeteoModels {
        const model =  window.localStorage.getItem(OPEN_METEO_MODEL_KEY) ?? OpenMeteoModels.best_match
        return model as OpenMeteoModels
    }

    static setModel (model: OpenMeteoModels | string) {
        window.localStorage.setItem(OPEN_METEO_MODEL_KEY, model ?? OpenMeteoModels.best_match)
    }
}

export enum OpenMeteoModels {
    best_match = 'best_match',
    ecmwf_ifs = 'ecmwf_ifs',
    ecmwf_ifs025 = 'ecmwf_ifs025',
    ecmwf_aifs025_single = 'ecmwf_aifs025_single',
    cma_grapes_global = 'cma_grapes_global',
    bom_access_global = 'bom_access_global',
    dwd_icon_seamless = 'dwd_icon_seamless',
    dwd_icon_global = 'dwd_icon_global',
    dwd_icon_eu = 'dwd_icon_eu',
    dwd_icon_d2 = 'dwd_icon_d2',
    metno_seamless = 'metno_seamless',
    metno_nordic = 'metno_nordic',
    geosphere_seamless = 'geosphere_seamless',
    geosphere_arome_austria = 'geosphere_arome_austria',
    ncep_gfs_seamless = 'ncep_gfs_seamless',
    ncep_gfs_global = 'ncep_gfs_global',
    ncep_hrrr_conus = 'ncep_hrrr_conus',
    ncep_nbm_conus = 'ncep_nbm_conus',
    ncep_nam_conus = 'ncep_nam_conus',
    ncep_gfs_graphcast025 = 'ncep_gfs_graphcast025',
    ncep_aigfs025 = 'ncep_aigfs025',
    ncep_hgefs025_ensemble_mean = 'ncep_hgefs025_ensemble_mean',
    cmc_gem_seamless = 'cmc_gem_seamless',
    cmc_gem_gdps = 'cmc_gem_gdps',
    cmc_gem_rdps = 'cmc_gem_rdps',
    cmc_gem_hrdps = 'cmc_gem_hrdps',
    cmc_gem_hrdps_west = 'cmc_gem_hrdps_west',
    knmi_seamless = 'knmi_seamless',
    knmi_harmonie_arome_europe = 'knmi_harmonie_arome_europe',
    knmi_harmonie_arome_netherlands = 'knmi_harmonie_arome_netherlands',
    dmi_seamless = 'dmi_seamless',
    dmi_harmonie_arome_europe = 'dmi_harmonie_arome_europe',
    jma_seamless = 'jma_seamless',
    jma_msm = 'jma_msm',
    jma_gsm = 'jma_gsm',
    meteofrance_seamless = 'meteofrance_seamless',
    meteofrance_arpege_world = 'meteofrance_arpege_world',
    meteofrance_arpege_europe = 'meteofrance_arpege_europe',
    meteofrance_arome_france = 'meteofrance_arome_france',
    meteofrance_arome_france_hd = 'meteofrance_arome_france_hd',
    ukmo_seamless = 'ukmo_seamless',
    ukmo_global_deterministic_10km = 'ukmo_global_deterministic_10km',
    ukmo_uk_deterministic_2km = 'ukmo_uk_deterministic_2km',
    kma_seamless = 'kma_seamless',
    kma_ldps = 'kma_ldps',
    kma_gdps = 'kma_gdps',
    italia_meteo_arpae_icon_2i = 'italia_meteo_arpae_icon_2i',
    meteoswiss_icon_seamless = 'meteoswiss_icon_seamless',
    meteoswiss_icon_ch1 = 'meteoswiss_icon_ch1',
    meteoswiss_icon_ch2 = 'meteoswiss_icon_ch2',
}

export default OpenMeteoLocalStorage
