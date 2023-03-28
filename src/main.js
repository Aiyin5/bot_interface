import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue';
import store from '../src/store'
import { createPinia } from 'pinia'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import 'element-plus/theme-chalk/dark/css-vars.css'

import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});
const pinia = createPinia()
const app = createApp(App)

app.use(ElementPlus)

app.use(router)
app.use(pinia)
app.use(store)
app.use(VMdPreview);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')

