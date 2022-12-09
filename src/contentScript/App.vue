<template>
  <div class="content-script" @click="handeClick">TEMPLATE-CRX</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
let text = ''
const handeClick = () => {
  count.value++
  alert(`\n您才点击了${count.value}次，给朕继续` + text)
  text += '！'
}
</script>
<style scoped lang="scss">
.content-script {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999;
  padding: 10px 20px;
  color: white;
  background: salmon;
  border-radius: 10px;
  box-shadow: 0 0 0 2px white, 0 0 0 4px skyblue;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: pink;
    box-shadow: 0 0 0 2px white, 0 0 0 4px gold;
    transition: all 0.3s ease;
  }
}
</style>
