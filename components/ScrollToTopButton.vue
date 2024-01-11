<template>
  <button
    v-show="scY > 300"
    class="scroll-to-top-btn"
    @click="scrollToTop">{{ buttonText }}</button>
</template>

<script setup lang="ts">
  const { scrollToTop, buttonText } = defineProps(['scrollToTop', 'buttonText']);
  const scY = ref(0);
  const handleScroll = () => {
    scY.value = window.scrollY;
  };

  onMounted(
    () => {
      window.addEventListener('scroll', handleScroll);
    }
  );

  onBeforeUnmount(
    () => {
      window.removeEventListener('scroll', handleScroll);
    }
  );
</script>

<style>
  .scroll-to-top-btn {
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 200px;
    height: 100px;
    background-color: #313A4E;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
  }
</style>