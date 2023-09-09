import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from '@/components/SvgIcon.vue'
import '@/assets/css/reset.css'

import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(store)
app.use(router)
app.component('SvgIcon', SvgIcon)

app.mount('#app')
