<template>
    <div class="flex flex-col gap-16">
        
        <nav class="w-full py-[27px] px-[49.5px] bg-white flex items-center justify-between">
            <RouterLink to="/" class="">
                <img src="/images/logo.png" alt="logo" class="">
            </RouterLink>
        </nav>

        <div class="w-full px-42 min-h-[75vh] flex flex-col items-start justify-center">
            <p class="text-2xl text-neutral-500">784 Kris Estate Suite 112</p>
            <h3 class="text-8xl text-neutral-700 py-6">Website coming soon</h3>
            <form class="border-b-2 w-[50vw] flex items-end justify-between gap-3 pt-12">
                <input type="text" placeholder="Your email address" class="focus:outline-0 flex-1 py-2 px-3" />
                <button class="uppercase w-fit py-2 px-4 cursor-pointer">subscribe</button>
            </form>
        </div>
    </div>
</template>