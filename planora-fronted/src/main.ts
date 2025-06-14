import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue';
import { useAuthStore } from './service/auth';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import '@/styles/global.scss'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
const pinia = createPinia();
const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.use(pinia);
// Cargar autenticación desde el almacenamiento local al iniciar la aplicación
const authStore = useAuthStore();
authStore.initializeFromStorage();

router.isReady().then(() => {
  app.mount('#app');
});



import { addIcons } from 'ionicons'
import {
  trashBinOutline,
  pencilOutline,
  calendarOutline,
  calendar,
  timeOutline,
  locationOutline,
  alarmOutline,
  checkmarkCircleOutline,
  add,
  addCircleOutline,
  addOutline,
  arrowBack,
  barChartOutline,
  peopleOutline,
  people,
  person,
  document,
  documentOutline,
  camera,
  cameraOutline,
  cashOutline,
  checkmark,
  checkmarkCircle,
  chevronForwardOutline,
  close,
  cloudUpload,
  cloudUploadOutline,
  copyOutline,
  createOutline,
  saveOutline,
  ellipsisVertical,
  ellipsisVerticalOutline,
  exitOutline,
  eyeOutline,
  eyeOffOutline,
  key,
  lockClosedOutline,
  logIn,
  mailOutline,
  medalOutline,
  receiptOutline,
  removeCircleOutline,
  searchOutline,
  shield,
  star,
  starOutline,
  walletOutline,
  warningOutline,
  downloadOutline,
  home,
  car,
  restaurant,
  ticket,

  chevronBack,
  chevronForward,
  homeOutline,           // ← Añadido

  // Header
  settingsOutline,
  logOutOutline,

  // EventModal
  closeOutline,
  documentText,
  
  // QuickActions
  appsOutline,
  cash,
  checkboxOutline,
  images,

  refreshOutline,
  shieldCheckmarkOutline,
  cardOutline,
  documentTextOutline,
  personOutline,
  personCircleOutline,

  personAddOutline,
  personRemoveOutline,
  personCircle,
} from 'ionicons/icons'

addIcons({
  trashBinOutline,
  pencilOutline,
  calendarOutline,
  calendar,
  timeOutline,
  locationOutline,
  alarmOutline,
  checkmarkCircleOutline,
  add,
  addCircleOutline,
  addOutline,
  arrowBack,
  barChartOutline,
  peopleOutline,
  people,
  person,
  document,
  documentOutline,
  camera,
  cameraOutline,
  cashOutline,
  checkmark,
  checkmarkCircle,
  chevronForwardOutline,
  close,
  cloudUpload,
  cloudUploadOutline,
  copyOutline,
  createOutline,
  saveOutline,
  ellipsisVertical,
  ellipsisVerticalOutline,
  exitOutline,
  eyeOutline,
  eyeOffOutline,
  key,
  lockClosedOutline,
  logIn,
  mailOutline,
  medalOutline,
  receiptOutline,
  removeCircleOutline,
  searchOutline,
  shield,
  star,
  starOutline,
  walletOutline,
  warningOutline,
  downloadOutline,
  home,
  car,
  restaurant,
  ticket,
  chevronBack,
  chevronForward,
  homeOutline,           // ← Añadido
  settingsOutline,
  logOutOutline,
  closeOutline,
  documentText,
  appsOutline,
  cash,
  checkboxOutline,
  images,
  refreshOutline,
  shieldCheckmarkOutline,
  cardOutline,
  documentTextOutline,
  personOutline,
  personCircleOutline,
  personAddOutline,
  personRemoveOutline,
  personCircle,
  
})
