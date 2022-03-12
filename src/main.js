import { createApp } from 'vue'
import router from './router'
import store from './store/index.js'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Global Components
import SpinningLoader from './components/Spinning-loader.vue'

const app = createApp(App)
app.component('SpinningLoader', SpinningLoader)
app.use(router)
app.use(store)
app.mount('#app')
