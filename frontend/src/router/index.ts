import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/routes/Home.vue'
import NotFoundPage from '@/components/routes/NotFound.vue'
import StatusesPage from '@/components/routes/Statuses.vue'
import CurrentWeatherPage from '@/components/routes/CurrentWeatherPage.vue'
import ForecastWeatherPage from '@/components/routes/ForecastWeatherPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      children: [
        { path: '/weather/current', name: 'current-weather', component: CurrentWeatherPage },
        { path: '/weather/forecast/:days?', name: 'forecast-weather', component: ForecastWeatherPage, props: true },
        { path: '/status', name: 'status', component: StatusesPage },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
      ]
    },
  ],
})

export default router
