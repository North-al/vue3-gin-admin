<template>
    <div class="pattern-container">
      <div class="pattern-grid"></div>
    </div>
  </template>
  
  <style scoped>
  .pattern-container {
    @apply absolute inset-0 overflow-hidden;
  }
  
  .pattern-grid {
    @apply absolute inset-0;
    background-image: linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
      linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
    background-size: 36px 36px;
    animation: bgColorChange 10s infinite;
  }
  
  @keyframes bgColorChange {
    0% {
      background-image: linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
        linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
    }
    33% {
      background-image: linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
        linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px);
    }
    66% {
      background-image: linear-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px),
        linear-gradient(to right, rgba(139, 92, 246, 0.08) 1px, transparent 1px);
    }
    100% {
      background-image: linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
        linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
    }
  }
  </style>