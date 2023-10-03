<template>
  <div>Nome do Remédio: {{ idParams }}</div>
</template>

<script setup>
    definePageMeta({
        layout: 'details'
    })
    const route = useRoute()
    const idParams = computed(()=> route.params.id) 
</script>

<style>

</style>