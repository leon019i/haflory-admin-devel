<template>
  <div class="pa-sm-4 pa-md-10 pa-lg-12">
    <Formula />
    <Variables />

    <!-- Govt start  -->
    <AddRuleGovtButton
      :action="showDrawer"
      :alignButton="'right'"
      :text="$t('pricing.newRule')"
    />
    <GovernatePriceTable />

    <!-- Govt to Area Start   -->

    <AddRuleAreaButton
      :action="showDrawerGovtArea"
      :alignButton="'right'"
      :text="$t('pricing.newRule')"
    />
    <GovtToAreaPriceTable />

    <!-- Area Start  -->

    <AddRuleGovtToAreaButton
      :action="showDrawerArea"
      :alignButton="'right'"
      :text="$t('pricing.newRule')"
    />
    <AreaPriceTable />

    <!-- Area End  -->
    <SideDrawer
      v-if="
        is_drawer == 'AddGovt' ||
        is_drawer == 'AddArea' ||
        is_drawer == 'AddGovtArea'
      "
    >
      <AddRuleGovt v-if="is_drawer == 'AddGovt'" />
      <AddRuleArea v-if="is_drawer == 'AddArea'" />
      <AddRuleGovtArea v-if="is_drawer == 'AddGovtArea'" />
    </SideDrawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    GovernatePriceTable: () =>
      import("@/pricing/components/GovernateToGovernateDataTable.vue"),
    AddRuleGovtButton: () => import("@/places/components/AddButton.vue"),
    AddRuleGovtToAreaButton: () => import("@/places/components/AddButton.vue"),
    SideDrawer: () => import("@/core/components/SideDrawer"),
    AddRuleGovt: () =>
      import("@/pricing/components/RightSideDrawer/AddRuleGovt.vue"),
    AddRuleGovtArea: () =>
      import("@/pricing/components/RightSideDrawer/AddRuleGovtArea.vue"),
    Formula: () => import("@/pricing/components/Formula.vue"),
    Variables: () => import("@/pricing/components/Variables.vue"),

    AreaPriceTable: () =>
      import("@/pricing/components/AreaToAreaDataTable.vue"),

    GovtToAreaPriceTable: () =>
      import("@/pricing/components/GovernorateToAreaDataTable.vue"),

    AddRuleAreaButton: () => import("@/places/components/AddButton.vue"),

    AddRuleArea: () =>
      import("@/pricing/components/RightSideDrawer/AddRuleArea.vue"),
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["show_drawer", "is_drawer"]),
  },
  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function () {
      this.showSideDrawer("AddGovt");
    },
    showDrawerArea: function () {
      this.showSideDrawer("AddArea");
    },
    showDrawerGovtArea: function () {
      this.showSideDrawer("AddGovtArea");
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>