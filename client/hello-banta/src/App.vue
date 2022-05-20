<script setup>
import { RouterView } from "vue-router";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { useThemeStore } from '@/stores/theme';

// loads the Icon plugin
UIkit.use(Icons);
const store = useThemeStore();

</script>

<template>
    <div :class="store.themer.main">
        <RouterView></RouterView>
    </div>
</template>

<style lang="sass">
    @import "@/styles/main.sass"
</style>

<style lang="sass" module="dark">
@import "@/styles/dark.sass"
.main
    \:global
        @import "./styles/site.sass"
        @import "@/styles/hba.sass"
</style>

<style lang="sass" module="light">
@import "@/styles/light.sass"
.main
    \:global
        @import "./styles/site.sass"
        @import "@/styles/hba.sass"
</style>