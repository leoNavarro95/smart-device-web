import { createRouter, createWebHistory  } from 'vue-router'

import Demo from '../components/Demo.vue'
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
            path:'/demo', 
            name: 'demo',
            component: Demo
        },
    ]
})

export default router