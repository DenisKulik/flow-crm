<script setup lang="ts"></script>

<template>
  <section class="h-screen p-6 bg-black">
    <div class="grid grid-cols-[1fr_6fr] h-full">
      <aside>Sidebar</aside>
      <div>
        <slot />
      </div>
    </div>
  </section>
</template>
