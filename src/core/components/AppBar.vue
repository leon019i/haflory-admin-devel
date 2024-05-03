<template>
  <v-toolbar max-height="70" elevation="0" color="light">
    <v-btn class="ma-2" @click="showAppDrawer" text icon>
      <v-icon btn>mdi-menu</v-icon>
    </v-btn>

    <v-spacer></v-spacer>
    <UserDropDown class="mr-5"></UserDropDown>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    UserDropDown: () => import("@/user/components/UserDropDown"),
  },
  computed: {
    ...mapGetters(["show_app_drawer"]),
  },
  methods: {
    ...mapActions(["showAppDrawer"]),
  },
};
</script>