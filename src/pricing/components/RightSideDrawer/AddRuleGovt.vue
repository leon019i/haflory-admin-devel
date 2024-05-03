<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">
        {{ $t("pricing.newRule") }}
      </h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset, invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-autocomplete
                  v-model="govtInput.from"
                  outlined
                  dense
                  :error-messages="errors"
                  color="secondary"
                  :items="allPlaces"
                  :item-text="$store.getters.rtl ? 'nameAr' : 'nameEn'"
                  item-value="_id"
                  :label="$t('pricing.fromGovernate')"
                >
                  <template v-slot:item="{ item }">
                    <p class="primary--text mt-3">
                      {{ $store.getters.rtl ? item.nameAr : item.nameEn }}
                    </p>
                  </template>
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-autocomplete
                  v-model="govtInput.to"
                  outlined
                  dense
                  :error-messages="errors"
                  color="secondary"
                  :items="allPlaces"
                  :item-text="$store.getters.rtl ? 'nameAr' : 'nameEn'"
                  item-value="_id"
                  :label="$t('pricing.toGovernate')"
                >
                  <template v-slot:item="{ item }">
                    <p class="primary--text mt-3">
                      {{ $store.getters.rtl ? item.nameAr : item.nameEn }}
                    </p>
                  </template>
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  :error-messages="errors"
                  dense
                  type="number"
                  :min="0"
                  :label="$t('pricing.price')"
                  color="secondary"
                  v-model="govtInput.price"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :error-messages="errors"
                  :label="$t('pricing.commission')"
                  color="secondary"
                  type="number"
                  :min="0"
                  v-model="govtInput.commission"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <AddThisPlaceButton
                :action="addThisProduct"
                :isLoading="btn_loading"
                :disabled="!invalid"
                :isIcon="false"
                :text="$t('pricing.addThisRule')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { createGovernorateTransferPrice } from "@/pricing/methods/create_govt_to_govt.js";
import "@/core/methods/validation_rules";
import { isAdmin, isSeller, getCurrentUser } from "@/user/utlis/helper.js";

export default {
  data: () => ({
    govtInput: {
      from: null,
      to: null,
      price: 0,
      commission: 0,
    },
    errorFromApi: "",
    errorFromApiAr: "",
    sellersVariables: {
      limit: 0,
      skip: 0,
    },
    allPlaces: [],

    btn_loading: false,
  }),
  components: {
    AddThisPlaceButton: () => import("@/pricing/components/AddButton.vue"),
  },
  apollo: {
    governorates() {
      return {
        query: require("@/places/api/queries/places_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          this.allPlaces = data.governorates;
        },
      };
    },
  },
  methods: {
    isAdmin,
    addThisProduct() {
      this.btn_loading = true;

      createGovernorateTransferPrice(this.govtInput).then((data) => {
        if (!!data.data) {
          this.btn_loading = false;
          this.$store.commit("SHOW_DRAWER");
        } else {
          this.btn_loading = false;
          // console.log(data);
          if (data.includes("nameEn_1 dup")) {
            this.btn_loading = false;
            this.errorFromApi = this.$t("inputRules.nameAlreadyExist");
          } else if (data.includes("nameAr_1 dup")) {
            this.btn_loading = false;
            this.errorFromApiAr = this.$t("inputRules.nameAlreadyExist");
          }
        }
      });
    },

    addVarient() {
      let varient = addSubAreasToArray();
      this.placesInput.areas.push(varient);
    },
    deleteVarient(index) {
      // console.log(index);
      this.placesInput.areas.splice(index, 1);
    },
  },
};
</script>

