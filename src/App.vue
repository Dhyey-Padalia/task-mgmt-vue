<template>
  <div id="app">
    <!-- <LoginPage /> -->
    <HomePage />
  </div>
</template>

<script>
// Import the LoginPage component
import LoginPage from './components/LoginPage.vue';
import HomePage from './components/HomePage.vue';

export default {
  name: 'App',
  components: {
    LoginPage, // Register the LoginPage component
    HomePage
  }
};
</script>

<style>
/* Global styles can be added here */
</style>
