<template>
    <router-link :to="route">{{buttonText}}</router-link>
</template>

<script setup>
defineProps({
    buttonText: String,
    route:String,
})
</script>

<style>

</style>