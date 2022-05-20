import { defineStore } from "pinia";
import { useCssModule } from 'vue';

export const useThemeStore = defineStore({
    id: "counter",
    state: () => ({
        theme: 'light',
    }),
    getters: {
        themer: (state) => useCssModule(state.theme),
    },
    actions: {
        toggle() {
            this.theme = this.theme == 'light' ? 'dark' :'light';
        },
    },
});
