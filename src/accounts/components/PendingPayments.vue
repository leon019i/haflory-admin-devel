  <template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">
          {{ $t("accounts.pendingPayment") }} ({{ totalProducts }})
          <v-spacer></v-spacer>
          <v-text-field
            :label="$t('product.category.search')"
            single-line
            clearable
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allPayments"
          :loading="loading"
          :search="search"
        >
          <template v-slot:item._id="{ item }">
            <p>
              {{
                allPayments
                  .map(function (x) {
                    return x._id;
                  })
                  .indexOf(item._id) + 1
              }}
            </p>
          </template>
          <template v-slot:item.user.nameEn="{ item }">
            <h4 v-if="item.user" class="grey1--text font-weight-bold my-0 py-0">
              {{
                !$store.getters.rtl
                  ? !!item.user.nameEn
                    ? item.user.nameEn
                    : "-"
                  : !!item.user.nameAr
                  ? item.user.nameAr
                  : "-"
              }}
            </h4>
            <h4 v-else class="grey1--text font-weight-bold my-0 py-0">-</h4>
          </template>

          <template v-slot:item.totalAmount="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ item.totalAmount }}
            </h4>
          </template>
          <template v-slot:item.totalCommission="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ item.totalCommission }}
            </h4>
          </template>

          <template v-slot:item.paidAmount="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ item.paidAmount }}
            </h4>
          </template>

          <template v-slot:item.balance="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ item.totalAmount - item.totalCommission - item.paidAmount }}
            </h4>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn
              small
              class="primary text-none"
              depressed
              @click="clearAccounts(item)"
            >
              <v-icon size="20" left>mdi-check</v-icon>
              {{ $t("accounts.clear") }}
            </v-btn>
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
import { clearPayment } from "@/accounts/methods/clear_payment.js";

import avatar from "vue-avatar";

export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    ViewOrEditCategory: () =>
      import("@/products/components/RightSideDrawer/ViewOrEditCategory.vue"),
    DeleteModal: () =>
      import("@/core/components/Modal/ClearConfirmationModal.vue"),
    avatar,
  },
  data() {
    return {
      search: "",
      options: {
        itemsPerPage: 10,
        page: 1,
      },
      loading: true,
      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        { text: this.$t("accounts.designerName"), value: "user.nameEn" },
        { text: this.$t("accounts.totalAmount"), value: "totalAmount" },
        { text: this.$t("accounts.totalCommision"), value: "totalCommission" },
        { text: this.$t("accounts.payedAmount"), value: "paidAmount" },
        { text: this.$t("accounts.balanceAmount"), value: "balance" },
        { text: "", value: "action" },
      ],

      currentCategory: {},
      allPayments: [],
      totalProducts: 10,
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },

  apollo: {
    accounts() {
      return {
        query: require("@/accounts/api/queries/payment_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          if (!!data.accounts) {
            if (!!data.accounts) {
              this.allPayments = [];
              data.accounts.forEach((account) => {
                if (account.user != null) {
                  this.allPayments.push(account);
                }
              });

              this.totalProducts = data.accounts.length;
            }
          }

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
        clearPayment(this.currentCategory.user._id);
      }
    },

    clearAccounts(item) {
      this.currentCategory = item;
      this.$refs.form.show();
    },
  },
};
</script>
<style scoped>
>>> tbody tr:nth-of-type(odd) {
  background: #f2f2f2;
}
</style>