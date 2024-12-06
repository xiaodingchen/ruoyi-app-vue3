<script setup>
import AppFooter from '@/components/AppFooter.vue'
import AppLogos from '@/components/AppLogos.vue'
import InputEntry from '@/components/InputEntry.vue'
import AppLayout from "@/layout/AppLayout.vue";
</script>

<template>
  <AppLayout>
    <AppLogos />
    <InputEntry />
    <AppFooter />
  </AppLayout>
</template>

<style scoped>
:deep(.page-container) {
  padding: 5rem 2.5rem;
  text-align: center;
}
</style>
