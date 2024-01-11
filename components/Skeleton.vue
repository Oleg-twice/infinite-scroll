<template>
  <div class="user user-skelet" v-for="(user, index) in users">
    <div class="row">
      <div class="cell">
        <div class="image" />
        <div class="">
          <div class="text main skeleton"></div>
        </div>
      </div>
      <div class="cell">
        <div class="text main skeleton"></div>
      </div>
      <div class="cell">
        <div class="text main skeleton"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const users = Array.from({ length: 10 });
</script>

<style scoped>
  .skeleton {
    display: inline-block;
    position: relative;
    overflow: hidden;
    height: 40px;
    border-radius: 10px;
    width: 100%;
    min-width: 250px;
    padding: 0 20px;
  }

  .skeleton::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: -150%;
    animation: progress 1.5s ease-in-out infinite;
    background-image: linear-gradient(90deg, #f5f5f5, #bfbfbf, #f5f5f5);
  }

  .user-skelet .cell, .main-div-content {
    display: block;
    width: 300px;
    margin-top: 10px;
  }

@keyframes progress {

    0% {
        left: -100%
    }

    100% {
        left: 100%
    }
}
</style>