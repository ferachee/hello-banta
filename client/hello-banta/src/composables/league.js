import { ref, toRefs,  reactive, onMounted, unref, watch } from 'vue';
import { fetchLeagues, fetchLeague, fetchLeagueTeams, fetchLeagueGames } from '../api/league';

const useLeagues = () => {
    const leagues = ref([]);
    const error = ref(null);
    const state = reactive({
        isLoading : true, 
        hasLoadingError: null,
    });

    const loadLeagues = async() => {
        [leagues.value, error.value] = await fetchLeagues();
        setTimeout(() => {
            state.isLoading = false;
            state.hasLoadingError = !!error.value;
        }, 1000);
    };

    onMounted(loadLeagues);

    return {
        leagues, 
        error,
        ...toRefs(state)
    }
}

const useLeague = (leagueSlug) => {

    const league = ref(null);
    const teams = ref([]);
    const games = ref([]);
    const error = reactive({
        leagueError: null,
        teamsError: null,
        gamesError: null,
    });
    const state = reactive({
        isLoading : true, 
        hasLoadingError: null,
    });

    const getLeague = async() => {
        await Promise.all([
            fetchLeague(unref(leagueSlug)),
            fetchLeagueTeams(unref(leagueSlug)), 
            fetchLeagueGames(unref(leagueSlug)), 
        ]).then(([leagueObj, teamsObj, gamesObj]) => {
            [league.value, error.leagueError] = leagueObj;
            [teams.value, error.teamsError] = teamsObj;
            [games.value, error.gamesError] = gamesObj;
        })
        state.isLoading = false;
        state.hasLoadingError = (( error.teamsError || error.leagueError ) || error.gamesError) || false;
    };
    getLeague()
    watch(leagueSlug, getLeague);

    return {
        league,
        teams,
        games,
        error,
        ...toRefs(state),
    }
}

export {
    useLeagues,
    useLeague
};