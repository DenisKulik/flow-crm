<script setup lang="ts"></script>

<template>
  <section class="h-screen p-6 bg-black">
    <div class="grid grid-cols-[100px_1fr] h-full bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/50 rounded-3xl">
      <div>Sibebar</div>
      <div>
        <slot />
      </div>
    </div>
  </section>
</template>
