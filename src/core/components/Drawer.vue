<template>
  <div>
    <v-sheet color="light">
      <v-toolbar max-height="70" elevation="0" color="light">
        <v-btn class="ma-2" @click.stop="drawer = !drawer" text icon>
          <v-icon btn>mdi-menu</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        <UserDropDown class="mr-5"></UserDropDown>
      </v-toolbar>
      <v-navigation-drawer
        v-model="drawer"
        app
        :permanent="!$vuetify.breakpoint.smAndDown"
        class="secondary"
        :right="$store.getters.rtl"
      >
        <v-list-item-content align="center" class="py-6">
          <v-list-item-title align="center">
            <!-- <h1 class="roboto-font primary--text mb-2">{{$t('general.appName')}}</h1> -->
            <v-img
              :src="require('@/core/assets/images/logo-drawer.png')"
              height="80"
              width="150"
              contain
            ></v-img>
          </v-list-item-title>
        </v-list-item-content>

        <v-list shaped class="pb-12">
          <template v-for="(item, index) in items">
            <v-list-item
              exact
              v-if="item.name"
              :key="item.name"
              :to="`/${$i18n.locale}/${item.to}`"
              link
              @click="showDrawer"
            >
              <v-list-item-icon>
                <v-icon class="white--text">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <h4 class="white--text font-weight-bold roboto-font">
                  {{ $store.getters.rtl ? item.name_ar : item.name }}
                </h4>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              class="grey3 mx-5 my-5"
              v-else-if="item.divider"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script>
import DrawerItems from "./DrawerItems.json";
import DrawerItemsSellers from "./DrawerItemsSellers.json";
import i18n from "@/plugins/i18n";
import { isAdmin, isSeller } from "@/user/utlis/helper.js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    UserDropDown: () => import("@/user/components/UserDropDown"),
  },
  data() {
    return {
      drawer: true,
      items: isAdmin() ? DrawerItems : DrawerItemsSellers,
      role: "",
    };
  },
  computed: {
    ...mapGetters({
      showLeftAppDrawer: "show_app_drawer",
    }),
    show_app_drawer: {
      get() {
        return this.showLeftAppDrawer;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    isAdmin,
    ...mapActions(["showAppDrawer"]),
    showDrawer: function (action, product) {
      // this.showSideDrawer("ViewProduct");
      if (
        this.$vuetify.breakpoint.name == "xs" ||
        this.$vuetify.breakpoint.name == "sm"
      ) {
        this.showAppDrawer();
      }
    },
  },
  created() {
    //update languange
    if (this.$route.params.lang == "ar") {
      i18n.locale = "ar";
      this.$vuetify.rtl = true;
      this.$store.commit("UPDATE_RTL", true);
    } else {
      i18n.locale = "en";
      this.$vuetify.rtl = false;
      this.$store.commit("UPDATE_RTL", false);
    }
  },
};
</script>

<style scoped>
.v-list-item--active {
  background: #e74a3b;
}
</style>
