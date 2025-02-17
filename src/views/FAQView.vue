<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { ref } from "vue";
import { faqs } from '@/utils/data';
import ArrowDown from "@/components/icons/ArrowDown.vue"

const activeIndex = ref(0);

const handleToggle = (index: number) => {
    if (activeIndex.value === index) {
        return;
    } else {
        activeIndex.value = index
    }
};

</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="py-16 px-42">
        <div v-for="faq in faqs" :key="faq.id" class="py-12">
            <h2 class="text-4xl font-semibold text-neutral-800 pb-3">{{faq.category}}</h2>       

            <div v-for="(qna, index) in faq.questions" :key="qna.id" class="px-6">
                <button
                    @click="() => handleToggle(index)"
                    className="flex justify-between items-center w-full py-4 text-left cursor-pointer text-neutral-800"
                >
                    <h2 className="text-3xl">{{qna.question}}</h2>
                    <span :class="`${activeIndex === index ? 'rotate-180' : ''} transform pt-1 text-lg`"><ArrowDown/></span>
                </button>

                <p v-if="activeIndex === index" class="text-neutral-500 pb-6">{{qna.answer}}</p>
            </div>
        </div>
        
      </div>
    </Section>
  </AppLayout>
</template>