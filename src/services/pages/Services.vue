<template>
  <div class="pa-sm-4 pa-md-10 pa-lg-12">
    <AddServiceButton
      :action="showDrawer"
      :alignButton="'right'"
      :text="$t('services.newService')"
    />
    <ServiceTable />
    <SideDrawer v-show="is_drawer == 'AddService'">
      <AddService />
    </SideDrawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ServiceTable: () => import("@/services/components/ServicesDataTable.vue"),
    AddServiceButton: () => import("@/services/components/AddButton.vue"),
    SideDrawer: () => import("@/core/components/SideDrawer"),
    AddService: () =>
      import("@/services/components/RightSideDrawer/AddService.vue"),
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
      this.showSideDrawer("AddService");
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>