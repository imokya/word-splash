<template>
  <div id="app">

  </div>
</template>

<script>

import App from '@/libs/app.js'

export default {
  name: "App",
  mounted() {
    new App(this.$el)
  }
};
</script>

<style>

* {
  margin: 0;
  padding: 0;
}

html, body {
 height: 100%;
 overflow: hidden; 
}

#app {
  height: 100%;
}

</style>
