import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import 'jquery/dist/jquery.min'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Rsa from "@/utils/rsa.js"



/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faFaceSadTear } from '@fortawesome/free-regular-svg-icons'
import { faFaceFrown } from '@fortawesome/free-regular-svg-icons'
import { faFaceMeh } from '@fortawesome/free-regular-svg-icons'
import { faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons'
import { faFaceLaughBeam } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faFaceSadTear, faFaceFrown, faFaceMeh, faFaceSmileBeam, faFaceLaughBeam, faPenToSquare, faMagnifyingGlassChart,
    faChartLine, faChartColumn, faHeartPulse)

const app = createApp(App);
app.use(router)
app.use(ElementPlus)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('RSA', Rsa)
app.mount('#app')


