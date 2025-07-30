<template>
  <header>

  </header>

  <main>
    <div class="p-4 space-y-8">
      <h1 class="text-2xl font-bold">
        Sensor Dashboard
      </h1>
      <SensorTable @select="handleSensorSelect"/>
      <SensorChart v-if="selectedSensor" :sensor-id="selectedSensor"/>
    </div>
  </main>
</template>

<script>
  import SensorTable from './components/SensorTable.vue';
  import SensorChart from './components/SensorChart.vue';
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    components: { SensorTable, SensorChart },
    setup() {
      const selectedSensor = ref(null);

      const handleSensorSelect = (sensor) => {
        selectedSensor.value = sensor
      };

      return {
        selectedSensor, handleSensorSelect
      };
    }
  })
</script>