import { defineStore } from "pinia";
import * as d3 from 'd3';

const venue = {
    home: 'HOME',
    away: 'AWAY',
    global: 'BOTH'
}

export const useGameStore = defineStore({
    id: "game",
    state: () => ({
        gamelist:[],
        venue: venue.global,
        games: [], // selected games : filtered or not
    }),
    getters: {
        getGames: (state) => state.games,
        getWDL: (state) => {
            let mapping = null,
                key = null;
            if (state.venue === venue.global){
                key = 'result';
                mapping = {W: 'Wins', D: 'Draws', L: 'Losses'};
            } else {
                key = 'win';
                mapping = {H: 'Home', X: 'Draw', A: 'Away'};
            }

            const g = d3.group(state.games, g => g[key])
            const gsum = d3.sum(g, (k) => k[1].length);
            let t = Array.from(g, ([k,v]) => ({name:mapping[k], value:v.length, percentage:Math.trunc(1000 * (v.length/gsum))/10 }));
            t = t.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            }); 
            return t;
        },
    },
    actions: {
        updateView() {
            this.team = null;
        },
    },
});