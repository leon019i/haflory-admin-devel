<template>
  <v-app>
    <!-- <main-app-bar v-if="isAuthenticated()" /> -->

    <main-drawer v-if="isAuthenticated()" />
    <side-drawer v-if="isAuthenticated()" />
    <v-main class="light">
      <div>
        <router-view />
        <notifications
          group="foo"
          position="bottom right"
          :closeOnClick="true"
          :duration="-2"
        />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { initializeFirebase } from "../methods/push_notifications";

export default {
  name: "App",
  components: {
    MainAppBar: () => import("@/core/components/AppBar"),
    MainDrawer: () => import("@/core/components/Drawer"),
    SideDrawer: () => import("@/core/components/SideDrawer"),
  },
  created() {
    initializeFirebase();
  },
  methods: {
    isAuthenticated() {
      return localStorage.getItem("apollo-token-haflory") != null;
    },
  },
};
</script>
<style>
#app {
  font-family: "Nunito";
}
.heading-font-custom {
  font-family: "Roboto";
  font-size: 64px;
  line-height: 44px;
}
.roboto-font {
  font-family: "Roboto";
}
</style>
