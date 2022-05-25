import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import HomeView from "../views/HomeView.vue";
import AnalyticView from "../views/AnalyticView.vue";
import LeagueView from "../views/LeagueView.vue";
import TeamView from "../views/TeamView.vue";
import TeamAnalyticView from "../views/TeamAnalyticView.vue";
import LeagueAnalyticView from "../views/LeagueAnalyticView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            component: IndexView,
            children: [
                {
                    path: "",
                    name: "index",
                    component:HomeView,
                },
                {
                    path: ':league',
                    component:AnalyticView,
                    props: true,
                    children: [
                        {
                            path: '',
                            name: 'league',
                            component: LeagueView,
                            props: true,
                        },
                        {
                            path: 'analytics',
                            name: 'leagueAnalytics',
                            component: LeagueAnalyticView,
                        },
                        {
                            path: ':team',
                            name: 'team',
                            component: TeamView,
                            props: true,
                        },
                        {
                            path: ':team/analytics',
                            name: 'teamAnalytics',
                            component: TeamAnalyticView,
                        }
                    ]
                }
            ]
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/AboutView.vue"),
        },
    ],
});

export default router;
