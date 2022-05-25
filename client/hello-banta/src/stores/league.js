import { defineStore } from "pinia";

export const useLeagueStore = defineStore({
    id: "league",
    state: () => ({
        league: {},
        teams:[],
        games:[],
    }),
    getters: {
        getLeague: (state) => state.league,
        getTeams: (state) => state.teams,
        getGames: (state) => state.games,
    },
    actions: {
        updateView() {
            this.team = null;
        },
    },
});