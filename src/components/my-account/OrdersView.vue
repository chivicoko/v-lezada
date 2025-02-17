<script setup lang="ts">
import { ref } from "vue";

const tableHead = ref(['Order', 'Date', 'Status', 'Total', 'Action']);

const tableData = ref([
    {
        order: 1,
        date: 'Aug 22, 2018',
        status: 'Pending',
        total: '3000',
    },
    {
        order: 2,
        date: 'July 22, 2018',
        status: 'Approved',
        total: '200',
    },
    {
        order: 3,
        date: 'June 22, 2018',
        status: 'On Hold',
        total: '990',
    },
]);


</script>

<template>
  <div class="flex items-center justify-between gap-6 pt-7 pb-2 border-b border-dashed border-neutral-300">
    <p class="text-lg capitalize font-semibold">orders</p>
  </div>
  
  <div class="flex items-center justify-between gap-6 py-7">
    <div class="w-full overflow-x-scroll custom-scrollbar">
      <table class="min-w-full custom-scrollbar border border-neutral-200">
        <thead class="bg-transparent">
          <tr class="bg-neutral-100 divide-x divide-neutral-300">
            <th v-for="(item, index) in tableHead" :key="index" class="text-center py-3 capitalize text-sm font-bold tracking-wider">{{ item }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-200">
          <tr
            v-for="item in tableData"
            :key="item.order"
            class="my-2 divide-x divide-neutral-300"
          >
            <td class="relative py-2 text-[15px] text-center whitespace-nowrap w-2">{{ item.order }}</td>
            <td class="relative py-2 text-[15px] text-center whitespace-nowrap w-2">{{ item.date }}</td>
            <td class="relative py-2 text-[15px] text-center whitespace-nowrap w-2">{{ item.status }}</td>
            <td class="relative py-2 text-[15px] text-center whitespace-nowrap w-2">${{ item.total }}</td>
            <td class="relative py-2 text-[15px] text-center whitespace-nowrap w-2">
              <RouterLink to="/" class="">View</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
          
</template>