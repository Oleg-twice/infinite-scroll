<template>
  <div class="user">
    <div class="row">
      <div class="main-div-content">
        <img class="image" :src="user.avatar"/>
        <div class="">
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

  type Entry = {
    target: {
    [x: string]: any;
      classList: {
        [x: string]: any;
        add: (arg0: string) => void;
      }
    }
  }

  // let delay = 0.2;
  // const [handleSetClassName, cleareHandelr] = useDebounce((entry: Entry) => {
  //   entry.target.classList.add('animate-delay');
  //   entry.target.classList.remove('d-none');
  //   entry.target.style.animationDelay = `${delay}s`;
  //   entry.target.classList.add('animate-delay');
  //   delay += 0.2; // increment the delay for each element
  // }, 300)

  // const { observableRef } = useObservable(handleSetClassName, { rootMargin: "-40% 0px 0px 0px" });
</script>
