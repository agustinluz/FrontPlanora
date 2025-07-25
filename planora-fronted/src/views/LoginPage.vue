<template>
  <ion-page>
    <PageHeader title="Iniciar Sesión" :showMenu="false"  />
    <ion-content :fullscreen="true" class="ion-padding login-page">
      <div class="login-background">
        <div class="login-card">
          <img src="../assets/logoPlanora.png" alt="Logo" class="logo" />
          <h1 class="title">Bienvenido a <strong>Planora</strong></h1>
          <p class="subtitle">Organiza, vota y comparte con tu grupo</p>

          <ion-input
            v-model="email"
            label="Email"
            label-placement="floating"
            type="email"
            fill="outline"
            placeholder="tu@email.com"
            class="input"
          >
            <ion-icon name="mail-outline" slot="start"></ion-icon>
          </ion-input>

          <ion-input
            v-model="password"
            label="Contraseña"
            label-placement="floating"
            :type="showPassword ? 'text' : 'password'"
            fill="outline"
            placeholder="••••••"
            class="input"
          >
            <ion-icon name="lock-closed-outline" slot="start"></ion-icon>
            <ion-icon
              :name="showPassword ? 'eye-off-outline' : 'eye-outline'"
              slot="end"
              class="toggle-password"
              @click="toggleShowPassword"
            ></ion-icon>
          </ion-input>

          <ion-button expand="block" class="login-button" @click="login">
            Iniciar sesión
          </ion-button>

          <ion-button expand="block" fill="clear" class="register-button" @click="goToRegister">
            ¿No tienes cuenta? <strong>Regístrate</strong>
          </ion-button>
<ion-button expand="block" fill="clear" class="forgot-button" @click="goToReset">
            ¿Olvidaste tu contraseña? <strong>Restablécela</strong>
          </ion-button>
          <ion-text color="danger" v-if="error" class="error-text">{{ error }}</ion-text>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
  useIonRouter
} from '@ionic/vue'
import PageHeader from '@/components/PageHeader.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/service/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useIonRouter()
const auth = useAuthStore()
const showPassword = ref(false)

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}
const login = async () => {
  error.value = ''
  try {
    const result = await auth.login({ email: email.value, password: password.value })
    if (result.success) {
      router.push('/grupo')
    } else {
      throw new Error(result.message)
    }
  } catch (err: any) {
    error.value = err.message
  }
}

const goToRegister = () => {
  router.push('/registro')
}
const goToReset = () => {
  router.push('/restablecer')
}
</script>

<style scoped>
.login-page {
  --background: transparent;
}

.login-background {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #f2f6fc, #e3ebf5);
}

.login-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 32px 24px;
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.logo {
  width: 100px;
  margin: 0 auto 20px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 24px;
  font-size: 14px;
}

.input {
  margin-top: 16px;
}

.login-button {
  margin-top: 24px;
  --background: #3880ff;
  --border-radius: 8px;
}

.register-button {
  margin-top: 12px;
  color: #3880ff;
  font-size: 15px;
}
.forgot-button {
  margin-top: 8px;
  color: #3880ff;
  font-size: 14px;
}

.error-text {
  display: block;
  margin-top: 16px;
  font-weight: 500;
}
.toggle-password {
  cursor: pointer;
}
</style>
