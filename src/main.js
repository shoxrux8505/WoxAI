import { createApp } from 'vue';
import App from './App.vue';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

const app = createApp(App);

app.use(Quasar, quasarUserOptions);
app.mount('#app');