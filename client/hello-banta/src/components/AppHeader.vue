<script setup>
import { useThemeStore } from '@/stores/theme';
const store = useThemeStore();
</script>

<template>
    <nav id="app-header" class="uk-flex uk-flex-between uk-flex-middle">
        <header>
            <h4 class="uk-margin-remove logo-font">okbanta</h4>
        </header>
        <div>
            <button class="uk-button uk-margin-right" @click="store.toggle">{{store.theme}}</button> 
            <a uk-icon="icon: menu"></a>
        </div>
    </nav>
</template>

<style lang="sass">
#app-header
    height: 7vh
    padding: 0 10px

</style>
