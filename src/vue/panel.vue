<template>
  <div>hello world</div>
</template>

<script>
export default {
  name: "panel",
  methods: {
    opened() {
      console.log("opened");
    },
    closed() {
      console.log("closed");
    },
    removed() {
      console.log("removed");
    }
  }
};
</script>
