<template>
  <div>
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/Hello.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
