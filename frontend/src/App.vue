<script>
import AppHeader from '@/components/AppHeader.vue';
export default {
  components: {
    AppHeader,
  },
};
</script>
<template>
  <AppHeader />
  <br>
    <div class="container mt-3">
      <router-view />

    </div>
</template>

<style>
  .page {
    max-width: 1366px;
    margin: 0;
  }
  .mt-3{
    max-width: 1366px;
  }
</style>