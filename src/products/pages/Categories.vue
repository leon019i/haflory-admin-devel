<template>
  <div>
    <AddCategoryButton
      :action="showDrawer"
      :alignButton="'right'"
      :text="$t('product.category.addCategory')"
    />
    <CategoryTable />
    <SideDrawer v-show="is_drawer == 'AddCategory'">
      <AddCategory />
    </SideDrawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    CategoryTable: () => import("@/products/components/CategoryDataTable.vue"),
    AddCategoryButton: () => import("@/products/components/AddButton.vue"),
    SideDrawer: () => import("@/core/components/SideDrawer"),
    AddCategory: () =>
      import("@/products/components/RightSideDrawer/AddCategory.vue"),
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
      this.showSideDrawer("AddCategory");
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>