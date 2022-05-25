import { defineStore } from "pinia";

export const useViewStore = defineStore({
    id: "view",
    state: () => ({
        view: {},
        views:[],
    }),
    getters: {
        getView: (state) => state.view,
    },
    actions: {
        updateView() {
            this.view = null;
        },
    },
});