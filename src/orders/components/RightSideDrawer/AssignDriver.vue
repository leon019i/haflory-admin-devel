<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">
        {{ $t("orders.assignDriver") }}
      </h1>

      <ValidationObserver ref="observer" v-slot="{ validate, reset, invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-autocomplete
                  v-model="input.driver"
                  outlined
                  :error-messages="errors"
                  dense
                  color="secondary"
                  :items="allDrivers"
                  item-text="nameEn"
                  item-value="_id"
                  :label="$t('user.seller.allDrivers')"
                >
                  <template v-slot:item="{ item }">
                    <v-row class="pa-5" align="center">
                      <avatar
                        class="mx-3"
                        :size="50"
                        :username="item.nameEn"
                        :src="
                          'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +
                          item.avatar
                        "
                      />
                      <p class="primary--text mx-3">
                        {{ $store.getters.rtl ? item.nameAr : item.nameEn }}
                      </p>
                    </v-row>
                  </template>
                </v-autocomplete>
              </ValidationProvider>
              <v-col cols="12" sm="12" md="12">
                <div>
                  <AddThisCategoryButton
                    :action="assignTheDriver"
                    :isLoading="btn_loading"
                    :alignButton="'center'"
                    :isIcon="false"
                    :disabled="!!input.driver && !!input.order"
                    :text="$t('orders.assignDriver')"
                  />
                </div>
              </v-col>
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import "@/core/methods/validation_rules";
import Avatar from "vue-avatar";
import { assignDriverToOrder } from "@/orders/methods/assign_driver.js";
export default {
  components: {
    AddThisCategoryButton: () => import("@/products/components/AddButton.vue"),
    Avatar,
  },
  data() {
    return {
      allDrivers: [],
      input: {
        order: this.currentOrder._id,
        driver: null,
      },
      errorFromApi: "",
      btn_loading: false,
    };
  },
  props: {
    currentOrder: {
      required: true,
    },
  },
  apollo: {
    drivers() {
      return {
        query: require("@/user/api/queries/sellers_query.graphql"),
        variables: {
          skip: 0,
          limit: 0,
        },
        result({ data, loading, networkStatus, refetch }) {
          // console.log(data.drivers);
          this.allDrivers = data.drivers.user;
        },
      };
    },
  },

  methods: {
    assignTheDriver() {
      this.btn_loading = true;
      assignDriverToOrder(this.input).then((data) => {
        // console.log("success", data);
        if (!!data.data) {
          this.btn_loading = false;
          this.$store.commit("SHOW_DRAWER");
        } else {
          this.btn_loading = false;
        }
      });
    },
  },
};
</script>