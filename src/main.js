import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import VueNativeSock from "vue-native-websocket-vue3"
import { useSocketStoreWithOut } from './stores/socket'

import './index.css'

const pinia = createPinia()
const app = createApp(App)

const socketStore = useSocketStoreWithOut()

app
    .use(pinia)
    // .use(VueNativeSock, 'ws://' + location.hostname + '/ws', { store: socketStore, format: 'json' })
    .use(VueNativeSock, 'ws://' + "192.168.43.239" + '/ws', { store: socketStore, format: 'json' })
    .mount('#app')

export default app