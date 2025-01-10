import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.tsx'
import router from './router'
import { setupStyles } from './styles'

const app = createApp(App)

app.use(createPinia())
app.use(router)

setupStyles()

app.mount('#app')
