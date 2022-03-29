<template>
    <div class="pl-4 hover:text-green-400">
    <router-link :to="route"> {{buttonText}} </router-link>
    </div>
</template>

<script setup>
defineProps({
    buttonText: String,
    route: String,
});

</script>

<style>

</style>