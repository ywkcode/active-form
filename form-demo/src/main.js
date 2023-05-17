import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueKonva from 'vue-konva';

import UUID from "vue-uuid";
const app = createApp(App);
app.use(VueKonva);
app.use(UUID);
app.mount('#app');
