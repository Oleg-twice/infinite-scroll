<template>
  <div class="user">
    <div class="row">
      <div class="main-div-content">
        <NuxtImg
          class="image"
          :src="user.avatar" 
          :placeholder="img(`https://github.com/nuxt.png`, { h: 128, w: 128, f: 'png', blur: 2, size: '100%' })"
          height="128"
          width="128"
        />
        <div class="name-text-holder">
          <div class="text main">{{ user.firstName }} {{ user.lastName }}</div>
        </div>
      </div>
      <div class="cell">
        <div class="text main">{{ user.website }}</div>
      </div>
      <div class="cell">
        <div class="text main">{{ user.numberOfViews }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { user } = defineProps(['user']);
  const img = useImage();
</script>
