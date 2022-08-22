import { createRouter, createWebHistory  } from 'vue-router'

import GpioControl from '../pages/GpioControl.vue'
import MainPage from '../pages/MainPage.vue'
import Settings from '../pages/Settings.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/', 
            name: 'Home',
            component: MainPage
        },
        {
            path:'/gpio-control', 
            name: 'GpioControl',
            component: GpioControl
        },
        {
            path:'/settings', 
            name: 'Settings',
            component: Settings
        },
    ]
})

export default router