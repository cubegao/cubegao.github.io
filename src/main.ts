import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './index.css'
import App from './App.vue'

library.add(faGithub)

const app = createApp(App)
// FontAwesome component registration
app.component('FontAwesomeIcon', FontAwesomeIcon as any)
app.mount('#app')
