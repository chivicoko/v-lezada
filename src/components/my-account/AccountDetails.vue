<script setup lang="ts">
</script>

<template>
  <div class="flex items-center justify-between gap-6 pt-7 pb-2 border-b border-dashed border-neutral-300">
    <p class="text-lg capitalize font-semibold">account details</p>
  </div>
  
  <div class="flex items-center justify-between gap-6 py-7">
    <form class="w-full flex flex-col gap-6">
      <div class="w-full flex items-end gap-6">
          <div class="flex-1 flex flex-col gap-1">
              <label for="firstName" class="capitalize text-sm text-neutral-400">first name</label>
              <input type="text" id="firstName" placeholder="" class="p-2 outline-0 border border-neutral-300" />
          </div>
          <div class="flex-1 flex flex-col gap-1">
              <label for="lastName" class="capitalize text-sm text-neutral-400">last name</label>
              <input type="text" id="lastName" placeholder="" class="p-2 outline-0 border border-neutral-300" />
          </div>
      </div>
      <div class="w-full flex items-end gap-6">
          <div class="flex-1 flex flex-col gap-1">
              <label for="displayName" class="capitalize text-sm text-neutral-400">display name</label>
              <input type="text" id="displayName" placeholder="" class="p-2 outline-0 border border-neutral-300" />
          </div>
      </div>
      <div class="w-full flex items-end gap-6">
          <div class="flex-1 flex flex-col gap-1">
              <label for="emailAddress" class="capitalize text-sm text-neutral-400">email address</label>
              <input type="text" id="emailAddress" placeholder="" class="p-2 outline-0 border border-neutral-300" />
          </div>
      </div>

      <div class="w-full border-b border-neutral-300">
        <p class="text-neutral-500 text-lg">Password change</p>
      </div>

      <div class="w-full flex items-end gap-6">
          <div class="flex-1 flex flex-col gap-1">
              <label for="currentPassword" class="capitalize text-sm text-neutral-400">current password</label>
              <input type="text" id="currentPassword" placeholder="" class="p-2 outline-0 border border-neutral-300" />
          </div>
      </div>
      <div class="w-full flex items-end gap-6">
          <div class="flex-1 flex flex-col gap-1">
              <label for="newPassword" class="capitalize text-sm text-neutral-400">New password</label>
              <input type="text" id="newPassword" placeholder="" class="p-2 outline-0 border border-neutral-300" />
          </div>
          <div class="flex-1 flex flex-col gap-1">
              <label for="confirmPassword" class="capitalize text-sm text-neutral-400">comfirm password</label>
              <input type="text" id="confirmPassword" placeholder="" class="p-2 outline-0 border border-neutral-300" />
          </div>
      </div>
      
      <div class="flex items-center justify-start">  
        <button class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">save changes</button>
      </div>
    </form>
  </div>
          
</template>