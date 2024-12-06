<script setup>
import HeaderNav from "@/components/HeaderNav.vue";

const props = defineProps({
  title: {type: String, default: ''},
  back: {type: Boolean, default: false},
  header:{type: Boolean, default: true}
})

</script>

<template>
<HeaderNav v-if="header" :title="title" :back="back" />
<view class="page-container">
  <slot />
</view>
</template>

<style scoped lang="scss">

</style>
