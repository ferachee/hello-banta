import { defineStore } from "pinia";

export const useTeamStore = defineStore({
    id: "team",
    state: () => ({
        team: {},
        teams:[],
    }),
    getters: {
        getTeam: (state) => state.team,
    },
    actions: {
        updateView() {
            this.team = null;
        },
    },
});