<template>
  <div class="overflow-x-auto">
    <table class="w-full table-auto mt-4 border">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 cursor-pointer" @click="sortBy('id')">ID</th>
          <th class="px-4 py-2 cursor-pointer" @click="sortBy('name')">Name</th>
          <th class="px-4 py-2 cursor-pointer" @click="sortBy('location')">Location</th>
          <th class="px-4 py-2 cursor-pointer" @click="sortBy('lastValue')">Last Value</th>
          <th class="px-4 py-2 cursor-pointer">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sensor in sortedSensors" :key="sensor.id" class="hover:bg-gray-50 cursor-pointer" @click="$emit('select', sensor.id)">
          <td class="border px-4 py-2">{{ sensor.id }}</td>
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
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { fetchSensorsWithLastValue, sortSensorsBy } from './table.js';

  const sensors = ref([]);
  const sortedSensors = ref([]);

  async function load() {
    sensors.value = await fetchSensorsWithLastValue();
    sortedSensors.value = [...sensors.value];
  }

  function sortBy(field) {
    sortedSensors.value = sortSensorsBy(sortedSensors.value, field);
  }

  onMounted(load);

</script>