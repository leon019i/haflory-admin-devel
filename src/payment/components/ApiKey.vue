<template>
  <div>
    <div class="pa-3">
      <v-card class="pa-12" elevation="0">
        <h2 class="primary--text">{{ $t("payment.paymentSettings") }}</h2>
        <v-row class="mt-6">
          <v-col cols="12" sm="12">
            <v-radio-group v-model="apiKey.paymentConfigType">
              <v-radio
                :label="$t('payment.tapPayment')"
                value="TAP_PAYMENT"
              ></v-radio>
              <!-- <v-radio
                :label="$t('payment.myFatoorah')"
                value="MY_FATOORAH"
              ></v-radio> -->
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              outlined
              dense
              color="primary"
              :label="$t('payment.apiCred')"
              v-model="apiKey.paymentKey"
              prepend-inner-icon="mdi-key-variant"
              :append-icon="apiKey1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (apiKey1 = !apiKey1)"
              :type="apiKey1 ? 'password' : 'text'"
              :apiKey1="apiKey.paymentKey"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-checkbox
              v-model="apiKey.cod"
              :label="$t('payment.cod')"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2">
            <v-btn
              v-if="showSaveButton"
              @click="updateApiKey"
              class="primary text-none"
              depressed
              :loading="isLoading"
              >{{ $t("payment.save") }}</v-btn
            >
          </v-col>
          <v-col cols="12" md="6" class="mt-n4">
            <div class="pa-5" v-if="isUpdated">
              <span class="success--text font-weight-normal">{{
                $t("payment.updated")
              }}</span>
              <v-icon color="success" class="pa-2" small>mdi-check</v-icon>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import { updatePaymentKey } from "@/payment/methods/update_key.js";
export default {
  data() {
    return {
      apiKey: {
        _id: 0,
        paymentKey: null,
        paymentConfigType: null,
        cod: null,
      },
      apiKey1: String,
      apiKey2: String,
      isUpdated: false,
      showSaveButton: true,
      isLoading: false,
    };
  },

  // watch: {
  //   apiKey: {
  //     handler(val) {
  //       this.showSaveButton = true;
  //     },
  //     deep: true,
  //   },
  // },
  apollo: {
    paymentSetting() {
      return {
        query: require("@/payment/api/queries/payments_setting.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          if (!!data) {
            if (!!data.paymentSetting) {
              if (!!data.paymentSetting[0]) {
                this.apiKey.paymentKey = data.paymentSetting[0].paymentKey;
                this.apiKey._id = data.paymentSetting[0]._id;
                this.apiKey.paymentConfigType =
                  data.paymentSetting[0].paymentConfigType;
                this.apiKey.cod = data.paymentSetting[0].cod;
                // this.showSaveButton = false;
              }
            }
          }
        },
      };
    },
  },
  methods: {
    updateApiKey() {
      this.isLoading = true;
      // console.log(this.apiKey);
      updatePaymentKey(this.apiKey).then((data) => {
        // console.log(data);
        this.isUpdated = true;
        var self = this;
        setInterval(function () {
          self.isUpdated = false;
          self.isLoading = false;
        }, 3000);
      });
    },

    copyTextLive() {
      let textToCopyLive = this.$refs.textToCopyLive.$el.querySelector("input");
      textToCopyLive.select();
      document.execCommand("copy");
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>