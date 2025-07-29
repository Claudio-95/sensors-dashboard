<script setup lang="ts">
import SensorTable from './components/SensorTable.vue'
import SensorChart from './components/SensorChart.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <SensorTable msg="You did it!" />
    </div>
  </header>

  <main>
    <div class="p-4 space-y-8">
      <h1 class="text-2xl font-bold">
        Sensor Dashboard
      </h1>
      <SensorTable />
      <SensorChart />
    </div>
  </main>
</template>

<style scoped>

</style>
