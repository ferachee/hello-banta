<script setup>
import AppHeader from '@/components/AppHeader.vue';
</script>
<template>
    <div class="uk-height-1-1">
        <AppHeader></AppHeader>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="sass">
.content
    height: 93vh
</style>
