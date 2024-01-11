import type { ComponentInternalInstance } from 'vue';

export const useObservable = (
  callback: (arg0: IntersectionObserverEntry) => void,
  options?
  ) => {
  const observableRef = ref();

  onMounted(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        
        if (entry.isIntersecting) {
          callback(entry)
        }
      },
      options,
    );

    if (observableRef.value) {
      observer.observe(observableRef.value);
    }

    onBeforeUnmount(() => {
      observer.disconnect();
    });
  },
  );

  return { observableRef };
}
