<template>
    <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      <!-- Ripple background -->
      <RippleBackground />
      
      <!-- Wave animation -->
      <WaveBackground />
      
      <!-- Main card -->
      <div class="bg-white/90 backdrop-blur-sm p-12 rounded-xl shadow-2xl w-[480px] relative z-10">
        <!-- Brand logo circle -->
        <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <div class="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center">
            <el-icon class="text-4xl text-white"><component :is="icon" /></el-icon>
          </div>
        </div>
        
        <h2 class="text-3xl font-bold text-center mb-10 mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {{ title }}
        </h2>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import WaveBackground from './WaveBackground.vue'
  import RippleBackground from './RippleBackground.vue'
  
  defineProps<{
    title: string
    icon: string
  }>()
  </script>