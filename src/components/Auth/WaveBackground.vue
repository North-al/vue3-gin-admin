<template>
    <div class="wave-container">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="wave-parallax">
          <use href="#wave" x="48" y="0" class="wave1" />
          <use href="#wave" x="48" y="3" class="wave2" />
          <use href="#wave" x="48" y="5" class="wave3" />
          <use href="#wave" x="48" y="7" class="wave4" />
        </g>
      </svg>
    </div>
  </template>
  
  <style scoped>
  .wave-container {
    @apply absolute inset-0 overflow-hidden pointer-events-none;
  }
  
  .waves {
    @apply absolute bottom-0 w-full h-[35vh] min-h-[100px] max-h-[300px];
  }
  
  .wave-parallax > use {
    @apply opacity-30;
    animation: wave-move 25s cubic-bezier(.55,.5,.45,.5) infinite;
  }
  
  .wave1 {
    @apply fill-blue-400;
    animation-delay: -2s;
  }
  
  .wave2 {
    @apply fill-indigo-400;
    animation-delay: -4s;
    animation-duration: 20s;
  }
  
  .wave3 {
    @apply fill-purple-400;
    animation-delay: -3s;
    animation-duration: 17s;
  }
  
  .wave4 {
    @apply fill-blue-300;
    animation-delay: -5s;
    animation-duration: 22s;
  }
  
  @keyframes wave-move {
    0% {
      transform: translate3d(-90px, 0, 0);
    }
    50% {
      transform: translate3d(85px, 0, 0);
    }
    100% {
      transform: translate3d(-90px, 0, 0);
    }
  }
  </style>