<template>
  <div>
    <div class="pa-3">
      <v-card elevation="0" class="pa-12">
        <h2 class="primary--text mb-5">{{$t('pricing.variables')}}</h2>
        <v-row align="center">
          <v-col cols="12" class="my-0 py-0">
            <p class="secondary--text font-weight-bold">
              1.
              {{$t('pricing.serviceBasePrice') }}
            </p>
          </v-col>
          <v-col cols="12" class="my-0 py-0">
            <p class="secondary--text font-weight-bold">
              2.
              {{$t('pricing.subService') }}
            </p>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <v-row class="my-0 py-0">
              <v-col cols="12" sm="12" md="6" lg="4">
                <p
                  class="secondary--text font-weight-bold"
                >3. {{$t('pricing.additionalFloorPrice')}}</p>
              </v-col>
              <v-col cols="12" sm="6" md="3" lg="2" class="my-0 py-0">
                <v-text-field
                  color="primary"
                  type="number"
                  :min="0"
                  v-model="variablesInput.floorPrice"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <v-row class="my-0 py-0">
              <v-col cols="12" sm="12" md="6" lg="4">
                <p class="secondary--text font-weight-bold">4. {{$t('pricing.floorNumberLimit')}}</p>
              </v-col>
              <v-col cols="12" sm="6" md="3" lg="2" class="my-0 py-0">
                <v-text-field
                  color="primary"
                  type="number"
                  :min="0"
                  v-model="variablesInput.floorLimit"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="12" md="2">
                <v-btn
                  v-if="showSaveButton"
                  @click="updateSettings"
                  class="primary text-none"
                  depressed
                  :loading="isLoading"
                >{{$t('payment.save')}}</v-btn>
              </v-col>
              <v-col cols="12" md="6" class="mt-n4">
                <div class="pa-5" v-if="isUpdated">
                  <span class="success--text font-weight-normal">{{$t('pricing.variablesUpdated')}}</span>
                  <v-icon color="success" class="pa-2" small>mdi-check</v-icon>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import { updateVariables } from "@/pricing/methods/update_variables.js";

export default {
  data() {
    return {
      variablesInput: {
        floorLimit: 0,
        floorPrice: null,
      },
      isUpdated: false,
      showSaveButton: false,
      isLoading: false,
    };
  },

  watch: {
    variablesInput: {
      handler(newVal) {
        this.showSaveButton = true;
      },
      deep: true,
    },
  },

  apollo: {
    getPriceVariable() {
      return {
        query: require("@/pricing/api/queries/variables_query.graphql"),

        result({ data, loading, networkStatus, refetch }) {
          if (!!data) {
            if (!!data.getPriceVariable) {
              this.variablesInput.floorLimit = data.getPriceVariable.floorLimit;
              this.variablesInput.floorPrice = data.getPriceVariable.floorPrice;
              this.showSaveButton = false;
            }
          }
        },
      };
    },
  },
  methods: {
    updateSettings() {
      this.isLoading = true;
      updateVariables(this.variablesInput).then((data) => {
        this.isUpdated = true;
        var self = this;
        setInterval(function () {
          self.isUpdated = false;
          self.isLoading = false;
          self.showSaveButton = false;
        }, 3000);
      });
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>