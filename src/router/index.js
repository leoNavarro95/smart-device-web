import { createRouter, createWebHistory  } from 'vue-router'

import GpioControl from '../pages/GpioControl.vue'
import MainPage from '../pages/MainPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/', 
            name: 'Posts',
            component: MainPage
        },
        {
            path:'/gpio-control', 
            name: 'GpioControl',
            component: GpioControl
        },
    ]
})

export default router