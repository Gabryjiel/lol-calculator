<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  hideBackdrop: () => void;
}>();
</script>

<template>
  <div
    class="modal-backdrop"
    v-if="props.isOpen"
    @click.self="props.hideBackdrop"
  >
    <slot></slot>
  </div>
</template>

<style>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
