<script setup>
import ImgThumb from "@/components/ImgThumb.vue";
import Loader from "@/components/Loader.vue";
import { useRouter } from "vue-router";
import { useViewStore } from '@/stores/view';
import { useLeagues } from '../composables/league';

const { leagues, error, isLoading, hasLoadingError } = useLeagues();
const router = useRouter();
const store = useViewStore();
const viewLeague = (league) => {
    router.push({name: 'league', params:{league}});
}
store.$patch({views: leagues})

</script>
<template>
    <div v-if="isLoading" class="uk-height-1-1">
        <Loader>
        </Loader>
    </div>
    <div v-else-if="hasLoadingError">
        {{error}}
    </div>
    <div v-else id="home"  class="uk-container uk-flex uk-flex-center" >
        <div class="uk-flex uk-flex-column uk-flex-center uk-height-1-1 uk-width-1-1">
            <div class="uk-text-center">
                <h2 class="handwritten uk-text-primary">
                    Choose a league
                </h2>
            </div>
            <div class="uk-flex uk-flex-around">
                <div v-for="league in leagues" :key="league['slug']">
                    <ImgThumb :imagePath="league['logo']" @click="viewLeague(league['slug'])">
                    </ImgThumb>
                </div>
            </div>
            <div class="uk-text-center uk-margin-top">
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