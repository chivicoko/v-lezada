<script setup lang="ts">
import { ref } from "vue";
import DownloadIcon from "@/components/icons/DownloadIcon.vue"

const tableHead = ref(['Product', 'Date', 'Expire', 'Action']);

const tableData = ref([
    {
      product: 'Haven - Free Real Estate PSD Template',
      date: 'Aug 22, 2020',
      expire: 'Yes',
    },
    {
      product: 'HasTech - Portfolio Business Template',
      date: 'Sept 12, 2020',
      expire: 'Never',
    },
]);


</script>

<template>
  <div class="flex items-center justify-between gap-6 pt-7 pb-2 border-b border-dashed border-neutral-300">
    <p class="text-lg capitalize font-semibold">Download</p>
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
            v-for="(item, index) in tableData"
            :key="index"
            class="my-2 divide-x divide-neutral-300"
          >
            <td class="relative py-2 text-[15px] text-center whitespace-nowrap w-2">{{ item.product }}</td>
            <td class="relative py-2 text-[15px] text-center whitespace-nowrap w-2">{{ item.date }}</td>
            <td class="relative py-2 text-[15px] text-center whitespace-nowrap w-2">{{ item.expire }}</td>
            <td class="relative py-2 text-[15px] text-center whitespace-nowrap w-2">
              <RouterLink to="/" class="flex items-center justify-center gap-2">
                <DownloadIcon />
                <span>Download File</span>
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
          
</template>