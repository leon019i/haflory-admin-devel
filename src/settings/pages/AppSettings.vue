<template>
  <div class="pa-sm-4 pa-md-10 pa-lg-12">
    <ApiKey />
    <DriverAppSetting />
    <CustomerAppSetting />
    <AdminContactSettings />
  </div>
</template>
<script>
import { isAdmin, isSeller } from "@/user/utlis/helper.js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    AdminContactSettings: () =>
      import("@/settings/components/AdminContactSettings.vue"),
    DriverAppSetting: () =>
      import("@/settings/components/DriverAppSetting.vue"),
    CustomerAppSetting: () =>
      import("@/settings/components/CustomerAppSetting.vue"),
    PromotionsDataTable: () =>
      import("@/settings/components/PromotionsDataTable.vue"),
    AddPromotion: () => import("@/settings/components/AddButton.vue"),
    SideDrawer: () => import("@/core/components/SideDrawer"),
    AddCategory: () =>
      import("@/settings/components/RightSideDrawer/AddPromotion.vue"),
    ApiKey: () => import("@/payment/components/ApiKey.vue"),
  },
  methods: {
    isAdmin,
  },
  computed: {
    ...mapGetters(["show_drawer", "is_drawer"]),
  },
  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function () {
      this.showSideDrawer("AddCategory");
    },
  },
};
</script>
