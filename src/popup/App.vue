<template>
  <h1>test crx</h1>
  <button @click="addCount">ADD</button>
  <div class="count">count = {{ count }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const addCount = () => {
  count.value += 1
}
</script>

<style>
.count {
  margin-top: 15px;
}
</style>
