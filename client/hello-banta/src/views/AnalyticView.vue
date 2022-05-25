<script setup>
import { storeToRefs } from 'pinia';
import { useViewStore } from '@/stores/view';
import { useTeamStore } from '@/stores/team';
// import Loader from "@/components/Loader.vue";
import ImgThumb from "@/components/ImgThumb.vue";
import TeamSwap from "@/components/TeamSwap.vue";
const store = useViewStore();
const teamStore = useTeamStore();
const { view } = storeToRefs(store);
const { teams } = storeToRefs(teamStore);

</script>
<template>
    <!-- <div v-if="isLoading">
        <Loader></Loader>
    </div>
    <div v-else-if="hasLoadingError">
        {{error}}
    </div> -->
    <div class="uk-height-1-1">
        <div id="analytic" class="uk-height-1-1 uk-flex uk-flex-column">
            <div class="uk-flex uk-flex-1 data-area">
                <div>
                    <div id="side-bar" class="uk-margin-large-top">
                        <TeamSwap :teams="teams"></TeamSwap>
                    </div>
                </div>
                <div id="content-area" class="uk-height- uk-width-1-1">
                    <router-view></router-view>
                </div>
            </div>
            <div id="status-bar" class="uk-flex uk-flex-between uk-flex-middle inverted-background" v-if="view">
                <ImgThumb class="uk-margin-remove" :clickable="false" :imagePath="view.logo" :name="view.name" >
                </ImgThumb>
                <div class="uk-flex">
                    <input type="text" class="uk-search-input" placeholder="search for a team"/>
                    <button class="uk-button uk-button-small uk-button-secondary">go</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
#analytic
    #content-area
        overflow-y: auto
        height: 83vh
    #side-bar
        width: 60px
        border: 1px solid #ccc
        padding: 5px
    #status-bar
        height: 10vh
        padding: 0px 10px

</style>