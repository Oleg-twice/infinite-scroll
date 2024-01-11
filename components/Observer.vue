<template>
  <div class="observer" ref="observableRef" />
</template>

<script setup lang="ts">
import { useObservable } from '~/composables/useObservable';

  const { loadMore } = defineProps(['loadMore']);

  const { observableRef } = useObservable(loadMore);
</script>