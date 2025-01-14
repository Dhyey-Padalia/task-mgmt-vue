<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script>

import HomePage from './components/HomePage.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    HomePage
  }
};
</script>

<style>
/* Global styles here */
</style>
