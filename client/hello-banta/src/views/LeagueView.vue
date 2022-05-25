<script setup>
import { defineProps, toRef, computed,ref } from 'vue';
// import { useRouter } from 'vue-router';
import { useViewStore } from '@/stores/view';
import { useTeamStore } from '@/stores/team';
import { useLeagueStore } from '@/stores/league';
import { useGameStore } from '@/stores/game';
import { useLeague } from '../composables/league';
import Loader from "@/components/Loader.vue";
import DonutChart from "@/components/charts/Donut.vue";
import ScatterPlot from "@/components/charts/ScatterPlot.vue";
import BarChart from "@/components/charts/BarChart.vue";
const props = defineProps(['league']);
const leagueSlug = toRef(props, 'league');
const { teams, games, league, isLoading, hasLoadingError } = useLeague(leagueSlug);
const store = useViewStore();
const teamstore = useTeamStore();
const leaguestore = useLeagueStore();
const gamestore = useGameStore();
store.$patch({ view: league })
teamstore.$patch({ teams: teams })
teamstore.$patch({ teams: teams })
leaguestore.$patch({ league:league, teams: teams, games: games })
gamestore.$patch({ games: games })

// const router = useRouter();
const start = ref(0);
const end = ref(100);
let f = computed({ get() { return gamestore.getGames.slice(start.value,end.value)}, set:(val) => [start.value, end.value] = val })
const toggle = () => {
    f.value = [100,400]
}

</script>
<template>
    <div v-if="isLoading">
        <Loader></Loader>
    </div>
    <div v-else-if="hasLoadingError">
        <p>
            {{error}}
        </p>
    </div>
    <div v-else class="uk-padding-small">
        <DonutChart :data="gamestore.getWDL" :name='league.name'/>
    </div>
</template>