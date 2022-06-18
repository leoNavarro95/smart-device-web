import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import VueNativeSock from "vue-native-websocket-vue3"
import { useSocketStoreWithOut } from './stores/useSocketStore'

import './index.css'

const pinia = createPinia()
// const app = createApp(App)

const socketStore = useSocketStoreWithOut()

createApp(App)
    .use(pinia)
    .use(VueNativeSock, 'ws://' + location.hostname + '/ws', { store: socketStore, format: 'json' })
    .mount('#app')
