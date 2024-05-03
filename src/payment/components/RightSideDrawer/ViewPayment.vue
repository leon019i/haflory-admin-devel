<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">{{ $t("payment.viewPayment")}}</h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  readonly
                  dense
                  :label="$t('payment.personName')"
                  v-model="sellerInput.nameEn"
                  color="secondary"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  readonly
                  dense
                  :label="$t('payment.personName')"
                  v-model="sellerInput.nameAr"
                  color="secondary"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required|email">
                <v-text-field
                  outlined
                  readonly
                  dense
                  :error-messages="errorFromApi ? errorFromApi : errors"
                  :label="$t('payment.email')"
                  color="secondary"
                  v-model="sellerInput.email"
                  @click="errorFromApi = ''"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  readonly
                  dense
                  :label="$t('payment.phone')"
                  color="secondary"
                  :error-messages="errors"
                  type="number"
                  :min="0"
                  v-model="sellerInput.phone"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  readonly
                  dense
                  :error-messages="errors"
                  :label="$t('payment.transactionId')"
                  color="secondary"
                  v-model="sellerInput.id"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  readonly
                  dense
                  :error-messages="errors"
                  :label="$t('payment.price')"
                  color="secondary"
                  v-model="sellerInput.invoiceAmount"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  readonly
                  dense
                  :error-messages="errors"
                  :label="$t('payment.dateAndTime')"
                  color="secondary"
                  v-model="sellerInput.createdDate"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  dense
                  readonly
                  :label="$t('payment.status')"
                  :error-messages="errors"
                  color="secondary"
                  v-model="sellerInput.status"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { updateSeller } from "@/user/methods/update_seller.js";
import "@/core/methods/validation_rules";

export default {
  data() {
    return {
      sellerInput: {
        id: this.currentPayment._id,
        nameEn: this.currentPayment.createdBy.nameEn,
        nameAr: this.currentPayment.createdBy.nameAr,
        email: this.currentPayment.createdBy.email,
        phone: this.currentPayment.createdBy.phone,
        invoiceAmount: this.currentPayment.invoiceAmount,
        createdDate: new Date(this.currentPayment.createdDate).toLocaleString(),
        status: this.currentPayment.status,
      },
      errorFromApi: "",
    };
  },
  components: {
    EditThisSellerButton: () => import("@/user/components/AddButton.vue"),
  },
  props: {
    currentPayment: {
      required: true,
    },
  },
};
</script>