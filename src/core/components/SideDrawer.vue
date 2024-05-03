<template>
  <v-navigation-drawer
    :right="!$store.getters.rtl"
    app
    v-model="show_drawer"
    stateless
    width="800"
    temporary
  >
    <div align="right" class="py-2">
      <v-btn text @click="showDrawer" :ripple="false">
        <v-icon left>mdi-close</v-icon>
      </v-btn>
    </div>

    <slot>
      <ViewParentAndKids v-if="isDrawer == 'EditUser'" />

      <ViewOrEditGovernate
        v-if="isDrawer == 'ViewGovernateRule' || isDrawer == 'EditGovernate'"
        :isEditPlace="isDrawer == 'EditGovernate'"
        :currentPlace="currentPlace"
      />
      <ViewOrEditGovernateArea
        v-if="isDrawer == 'ViewGovtAreaRule' || isDrawer == 'EditGovtAreaRule'"
        :isEditPlace="isDrawer == 'EditGovtAreaRule'"
        :currentPlace="currentPlace"
      />
    </slot>
  </v-navigation-drawer>
</template>
   

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home" },
        { title: "About", icon: "mdi-star" },
      ],
    };
  },
  components: {
    ViewParentAndKids: () =>
      import("@/user/components/RightSideDrawer/ViewOrEditProfile.vue"),
    ViewOrEditGovernate: () =>
      import("@/pricing/components/RightSideDrawer/ViewOrEditRuleGovt.vue"),
    ViewOrEditGovernateArea: () =>
      import("@/pricing/components/RightSideDrawer/ViewOrEditRuleGovtArea.vue"),
  },

  computed: {
    // ...mapGetters(["show_drawer", "is_drawer"]),

    ...mapGetters({
      showRightDrawer: "show_drawer",
      isDrawer: "is_drawer",
      currentPlace: "current_object",
    }),
    show_drawer: {
      get() {
        return this.showRightDrawer;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function () {
      this.showSideDrawer("null");
    },
  },
};
</script>