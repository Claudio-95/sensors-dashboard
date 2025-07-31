<template>
  <div class="mt-6">
    <div ref="chartEl" class="w-full h-96"></div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { drawChart } from "@/components/charts.js";

  const props = defineProps({
    sensorId: String
  });

  const chartEl = ref(document.getElementById("chartEl"));

  watch(() => props.sensorId, async () => {
    if (props.sensorId) {
      await drawChart(chartEl.value, props.sensorId);
    }
  });

  onMounted(() => {
    if (props.sensorId) {
      drawChart(chartEl.value, props.sensorId);
    }
  });
</script>