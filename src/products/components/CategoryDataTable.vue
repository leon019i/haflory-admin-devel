<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">
          {{ $t('product.category.categories')}}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            :label=" $t('product.category.search')"
            single-line
            hide-details
            clearable
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="categories" :loading="loading" :search="search">
          <template v-slot:item._id="{ item }">
            <p>{{categories.map(function(x) {return x._id; }).indexOf(item._id) + 1}}</p>
          </template>
          <template v-slot:item.nameEn="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">{{ item.nameEn}}</h4>
          </template>

          <template v-slot:item.nameAr="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">{{ item.nameAr}}</h4>
          </template>
          <template v-slot:item.avatar="{ item }">
            <avatar
              v-if="item.avatar != null"
              :size="50"
              :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +item.avatar"
            />
            <avatar v-else :username="item.nameEn" :size="50" />
          </template>
          <template v-slot:item.active="{ item }">
            <v-switch
              class="pa-0"
              value
              v-model="item.active"
              @change="updateCategoryStatus(item)"
              color="secondary"
            ></v-switch>
          </template>
          <template v-slot:item.order="{ item }">
            <v-text-field
              rounded
              @change="updateCategoryStatus(item)"
              color="primary"
              v-model="item.order"
              text
              flat
              type="number"
              :min="1"
              solo
            ></v-text-field>
          </template>

          <template v-slot:item.action="{ item }">
            <v-row class="mx-0">
              <v-icon color="secondary" @click="showDrawer('view',item)">mdi-eye</v-icon>
              <v-icon color="primary" @click="showDrawer('edit',item)">mdi-pencil</v-icon>
              <v-icon color="red" @click="showDrawer('delete',item)">mdi-delete</v-icon>
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <SideDrawer>
      <ViewOrEditCategory
        v-if="is_drawer == 'ViewCategory' || is_drawer == 'EditCategory'"
        :isEditCategory="is_drawer == 'EditCategory'"
        :currentCategory="currentCategory"
      />
    </SideDrawer>
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteCategory } from "@/products/methods/delete_category.js";
import { updateCategory } from "@/products/methods/update_category.js";
import avatar from "vue-avatar";

export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    ViewOrEditCategory: () =>
      import("@/products/components/RightSideDrawer/ViewOrEditCategory.vue"),
    DeleteModal: () =>
      import("@/core/components/Modal/DeleteConfirmationModal.vue"),
    avatar,
  },
  data() {
    return {
      search: "",

      options: {},
      loading: true,
      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        { text: this.$t("product.category.categoryNameEn"), value: "nameEn" },
        { text: this.$t("product.category.categoryNameAr"), value: "nameAr" },
        { text: this.$t("product.product.image"), value: "avatar" },
        { text: this.$t("product.category.isActive"), value: "active" },
        { text: this.$t("product.category.order"), value: "order", width: 145 },
        { text: "", value: "action" },
      ],
      variables: {
        limit: 0,
        skip: 0,
      },
      currentCategory: {},
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },

  apollo: {
    categories() {
      return {
        query: require("@/products/api/queries/categories_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          // console.log(data);
          this.loading = false;
        },
      };
    },
  },
  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function (action, category) {
      this.currentCategory = category;
      if (action == "view") {
        this.showSideDrawer("ViewCategory");
      } else if (action == "edit") {
        this.showSideDrawer("EditCategory");
      } else {
        this.$refs.form.show();
      }
    },
    deleteThisItem(val) {
      if (val == true) {
        deleteCategory(this.currentCategory);
      }
    },
    updateCategoryStatus(item) {
      let categoryInput = {
        id: item._id,
        nameEn: item.nameEn,
        nameAr: item.nameAr,
        order: item.order,
        active: item.active,
        avatar: item.avatar,
        subCategory: item.subCategories,
      };
      // console.log(categoryInput);
      updateCategory(categoryInput);
    },
  },
};
</script>
<style scoped>
>>> tbody tr:nth-of-type(odd) {
  background: #f2f2f2;
}
>>> .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: transparent;
}
</style>