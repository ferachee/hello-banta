<script setup>
import ImgThumb from "@/components/ImgThumb.vue";
</script>
<template>
    <div id="home"  class="uk-container uk-flex uk-flex-center">
        <div class="uk-flex uk-flex-column uk-flex-center uk-height-1-1 uk-width-1-1">
            <div class="uk-text-center">
                <h2 class="handwritten uk-text-primary">
                    Choose a league
                </h2>
            </div>
            <div class="uk-flex uk-flex-around">
                <div v-for="n in 4" :key="n">
                    <ImgThumb :title="n"></ImgThumb>
                </div>
            </div>
            <div class="uk-text-center">
                <h4 class="handwritten uk-text-secondary">
                    Never banta without facts
                </h4>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
#home
    height: 70%

</style>