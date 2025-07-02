<script setup lang="ts">
import AuthForm from '@/components/auth/index.vue'

useSeoMeta({ title: 'Login | Flow CRM' })
definePageMeta({ layout: 'empty' })
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center">
    <AuthForm />
  </div>
</template>
