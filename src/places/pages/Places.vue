<template>
  <div class="pa-sm-4 pa-md-10 pa-lg-12">
    <AddProductButton
      :action="showDrawer"
      :alignButton="'right'"
      :text="$t('places.newGovernorate')"
    />
    <ProductsTable />
    <SideDrawer v-show="is_drawer == 'AddProduct'">
      <AddProduct />
    </SideDrawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ProductsTable: () => import("@/places/components/PlacesDataTable.vue"),
    AddProductButton: () => import("@/places/components/AddButton.vue"),
    SideDrawer: () => import("@/core/components/SideDrawer"),
    AddProduct: () =>
      import("@/places/components/RightSideDrawer/AddPlace.vue"),
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
      this.showSideDrawer("AddProduct");
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>