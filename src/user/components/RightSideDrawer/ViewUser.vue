<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">{{ $t("orders.viewOrder")}}</h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  readonly
                  outlined
                  dense
                  :label="$t('orders.personName')"
                  v-model="userInput.name"
                  color="secondary"
                  :error-messages="errors"
                  required
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
                  :label="$t('orders.email')"
                  color="secondary"
                  v-model="userInput.email"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  readonly
                  dense
                  :label="$t('orders.phone')"
                  color="secondary"
                  :error-messages="errors"
                  type="number"
                  :min="0"
                  v-model="userInput.phone"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="12" md="12" class="py-0 pb-12">
              <avatar
                :size="100"
                :username="userInput.name"
                :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' + currentUser.avatar"
              />
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
import avatar from "vue-avatar";

export default {
  components: {
    avatar,
  },
  data() {
    return {
      userInput: {
        name: this.currentUser.nameEn,
        nameAr: this.currentUser.nameAr,
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        active: this.currentUser.active,
        avatar: this.currentUser.avatar,
      },
      errorFromApi: "",
    };
  },

  props: {
    currentUser: {
      required: true,
    },
  },
};
</script>