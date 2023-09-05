<script setup lang="ts">
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
</script>

<template>
  <div>{{ userStore.name }}</div>
  <RouterView />
</template>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
