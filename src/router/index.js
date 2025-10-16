import { createRouter, createWebHistory } from "vue-router";

// Layout padrão
import DefaultLayout from "@/layouts/DefaultLayout.vue";

// Páginas
import Home from "@/pages/Home.vue";
import PlayList from "@/pages/LibraryView.vue";
import Navegar from "@/pages/Navegar.vue";
import NovaPlaylist from "@/pages/NovaPlaylist.vue";
import CreatedPlaylist from "@/pages/CreatedPlaylist.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: DefaultLayout,
            children: [
                {
                    path: "",
                    name: "Home",
                    component: Home
                },
                {
                    path: "playlist/:id",
                    name: "created-playlist",
                    component: CreatedPlaylist,
                },
                {
                    path: "playlist",
                    name: "Playlist",
                    component: PlayList
                },
                {
                    path: "playlist/add",
                    name: "nova-playlist",
                    component: NovaPlaylist,
                },
                {
                    path: "navegar",
                    name: "Navegar",
                    component: Navegar
                }
            ],
        },
    ]
});

export default router;