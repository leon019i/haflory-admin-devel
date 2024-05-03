<template>
  <div class="pa-sm-4 pa-md-10 pa-lg-12">
    <AddSellerButton
      :action="showDrawer"
      :alignButton="'right'"
      :text="$t('user.seller.newDriver')"
    />
    <SellerTable />
    <SideDrawer v-show="is_drawer == 'AddSeller'">
      <AddSeller />
    </SideDrawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    SellerTable: () => import("@/user/components/SellerDataTable.vue"),
    AddSellerButton: () => import("@/user/components/AddButton.vue"),
    SideDrawer: () => import("@/core/components/SideDrawer"),
    AddSeller: () => import("@/user/components/RightSideDrawer/AddSeller.vue"),
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
      this.showSideDrawer("AddSeller");
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>