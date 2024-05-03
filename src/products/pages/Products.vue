<template>
  <div>
    <AddProductButton
      :action="showDrawer"
      :alignButton="'right'"
      :text="$t('product.product.addToy')"
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
    ProductsTable: () => import("@/products/components/ProductsDataTable.vue"),
    AddProductButton: () => import("@/products/components/AddButton.vue"),
    SideDrawer: () => import("@/core/components/SideDrawer"),
    AddProduct: () =>
      import("@/products/components/RightSideDrawer/AddProduct.vue"),
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