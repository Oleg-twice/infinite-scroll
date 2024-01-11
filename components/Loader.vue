<template>
  <div v-if="isLoading" class="loading-page">
    <div class="loading"></div>
  </div>
</template>

<script setup>
  defineProps(['isLoading'])
</script>

<style scoped>
  .loading-page {
    z-index: 1000;
    padding: 1rem;
    text-align: center;
    font-size: 3rem;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 45%;
  }
  .loading {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    border: 10px solid rgba(3, 22, 39, 0.705);
    border-radius: 50%;
    border-top-color: #0b4380;
    animation: spin 1s ease-in-out infinite;
  }
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
