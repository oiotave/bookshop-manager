<script setup lang="ts"></script>

<template>
  <div class="main-container">
    <router-view />
  </div>
</template>

<style scoped>
  .main-container {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
</style>
