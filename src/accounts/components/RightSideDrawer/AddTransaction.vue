<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">{{$t("accounts.addTransaction")}}</h1>

      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row align="center">
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-autocomplete
                  v-model="transitionInput.user"
                  outlined
                  :error-messages="errors"
                  dense
                  color="secondary"
                  :items="allSellers"
                  item-text="user.nameEn"
                  item-value="user._id"
                  :label="$t('product.product.sellers')"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  :error-messages="errors"
                  dense
                  type="number"
                  :min="0"
                  :label="$t('product.product.price')"
                  color="secondary"
                  v-model="transitionInput.amount"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-textarea
                  v-model="transitionInput.note"
                  outlined
                  color="secondary"
                  :label="$t('product.product.descriptionAr')"
                ></v-textarea>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <AddThisProductButton
                :action="addThisTransaction"
                :disabled="!invalid"
                :isLoading="btn_loading"
                :isIcon="false"
                :text="$t('accounts.addThisTransaction')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { addPayment } from "@/accounts/methods/create_transaction.js";
import "@/core/methods/validation_rules";
import { b64toBlob } from "@/core/methods/base64_to_blob.js";

export default {
  components: {
    AddThisProductButton: () => import("@/accounts/components/AddButton.vue"),
  },
  data() {
    return {
      transitionInput: {
        user: 0,
        amount: 0,
        note: null,
      },
      allSellers: [],
      sellersVariables: {
        limit: 0,
        skip: 0,
      },
      btn_loading: false,
    };
  },

  methods: {
    addThisTransaction() {
      this.btn_loading = true;

      addPayment(this.transitionInput).then((data) => {
        if (!!data.data) {
          this.btn_loading = false;
          this.$store.commit("SHOW_DRAWER");
        } else {
          this.btn_loading = false;
        }
      });
    },
  },
  apollo: {
    sellers() {
      return {
        query: require("@/user/api/queries/sellers_query.graphql"),
        variables: this.sellersVariables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log("sellers", data);
          this.allSellers = data.sellers.sellers;
        },
      };
    },
  },
};
</script>
