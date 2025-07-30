<template>
  <table class="w-full table-auto border-collapse">
    <thead class="bg-gray-100">
      <tr class="bg-gray-100">
        <th class="px-4 py-2">ID</th>
        <th class="px-4 py-2 cursor-pointer" @click="sortByName">Name</th>
        <th class="px-4 py-2">Location</th>
        <th class="px-4 py-2">Last Value</th>
        <th class="px-4 py-2">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="sensor in sortedSensors" :key="sensor.id" class="hover:bg-gray-50 cursor-pointer" @click="$emit('select', sensor.id)">
        <td class="border px-4 py-2">{{ sensor.name }}</td>
        <td class="border px-4 py-2"> {{ sensor.location }}</td>
        <td class="border px-4 py-2"> {{ sensor.lastValue }}</td>
        <td class="border px-4 py-2">
          <span :class="sensor.lastValue > sensor.threshold ? 'text-red-600' : 'text-green-600'">
            {{ sensor.lastValue > sensor.threshold ? 'Alarm' : 'OK' }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { fetchSensorsWithLastValue, sortSensorsByName } from './table.js';

  const sensors = ref([]);
  const sortedSensors = ref([]);

  async function load() {
    sensors.value = await fetchSensorsWithLastValue();
    sortedSensors.value = [...sensors.value];
  }

  function sortByName() {
    sortedSensors.value = sortSensorsByName(sortedSensors.value);
  }

  onMounted(load);

</script>