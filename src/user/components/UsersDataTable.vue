<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">
          {{ $t('user.users')}} ({{totalCustomers}})
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allOrders"
          :loading="loading"
          disable-sort
          :options.sync="options"
          :server-items-length="totalCustomers"
        >
          <template v-slot:item._id="{ item }">
            <p>{{allOrders.map(function(x) {return x._id; }).indexOf(item._id) + 1}}</p>
          </template>
          <template v-slot:item.nameEn="{ item }">
            <h4
              class="grey1--text font-weight-bold my-0 py-0"
            >{{ $store.getters.rtl ? item.nameAr : item.nameEn}}</h4>
          </template>
          <template v-slot:item.email="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">{{ item.email }}</h4>
          </template>

          <template v-slot:item.phone="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">{{ item.phone}}</h4>
          </template>
          <template v-slot:item.active="{ item }">
            <v-switch
              class="pa-0"
              value
              v-model="item.active"
              @change="updateUserStatus(item)"
              color="secondary"
            ></v-switch>
          </template>
          <template v-slot:item.action="{ item }">
            <v-row class="mx-0">
              <v-icon color="secondary" @click="showDrawer('view',item)">mdi-eye</v-icon>
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <SideDrawer>
      <ViewUsers v-if="is_drawer == 'ViewUser' " :currentUser="currentUser" />
    </SideDrawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { updateUser } from "@/user/methods/update_user.js";

export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    ViewUsers: () => import("@/user/components/RightSideDrawer/ViewUser.vue"),
  },
  data() {
    return {
      loading: true,

      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        {
          text: this.$t("user.name"),
          value: "nameEn",
        },
        {
          text: this.$t("user.email"),
          value: "email",
        },

        { text: this.$t("user.phone"), value: "phone" },
        { text: this.$t("user.isActive"), value: "active" },

        { text: "", value: "action" },
      ],

      variables: {
        limit: 10,
        skip: 0,
      },
      options: {
        itemsPerPage: 10,
        page: 1,
      },
      currentUser: {},
      allOrders: [],
      totalCustomers: 10,
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },
  watch: {
    options: {
      handler() {
        this.$apollo.queries.customers.refetch({
          limit:
            this.options.itemsPerPage !== -1
              ? this.options.itemsPerPage
              : this.totalCustomers,
          skip:
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage,
        });
      },
      deep: true,
    },
  },
  apollo: {
    customers() {
      return {
        query: require("@/user/api/queries/customer_query.graphql"),
        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log(data);
          this.loading = false;
          this.allOrders = data.customers.users;
          this.totalCustomers = data.customers.totalCount;
        },
      };
    },
  },
  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function (action, seller) {
      this.currentUser = seller;
      if (action == "view") {
        this.showSideDrawer("ViewUser");
      }
    },
    updateUserStatus(item) {
      let _userInput = {
        id: item._id,
        nameEn: item.nameEn,
        nameAr: item.nameAr,
        email: item.email,
        phone: item.phone,
        avatar: item.avatar,
        active: item.active,
      };
      updateUser(_userInput);
    },
  },
};
</script>
<style scoped>
>>> tbody tr:nth-of-type(odd) {
  background: #f2f2f2;
}
</style>