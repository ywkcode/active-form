import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueKonva from 'vue-konva';

import UUID from "vue-uuid";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App);
app.use(VueKonva);
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.use(UUID);
app.mount('#app');
