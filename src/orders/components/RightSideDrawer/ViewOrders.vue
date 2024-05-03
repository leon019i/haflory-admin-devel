<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">{{ $t("orders.editOrder")}}</h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-menu
                  ref="menu"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="orderInput.time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="orderInput.time"
                      readonly
                      outlined
                      :error-messages="errors"
                      label="Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      color="primary"
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    ampm-in-title
                    v-if="menu1"
                    v-model="orderInput.time"
                    full-width
                    @click:minute="$refs.menu.save(orderInput.time)"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(orderInput.time)">OK</v-btn>
                  </v-time-picker>
                </v-menu>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="orderInput.date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="orderInput.date"
                      label="Date"
                      prepend-icon="mdi-calendar-month"
                      readonly
                      outlined
                      :error-messages="errors"
                      color="primary"
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="orderInput.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu2.save(orderInput.date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <AddThisCategoryButton
                :action="updateOrder"
                :isLoading="btn_loading"
                :isIcon="false"
                :disabled="!!orderInput.date && !!orderInput.time"
                :text="$t('orders.updateOrder')"
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
import { updateOrderDateAndTime } from "@/orders/methods/update_order_date_time.js";

export default {
  components: {
    AddThisCategoryButton: () => import("@/products/components/AddButton.vue"),
    avatar,
  },
  data() {
    return {
      menu1: false,
      menu2: false,
      orderInput: {
        id: this.currentOrder._id,
        date: null,
        time: null,
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
  methods: {
    updateOrder() {
      this.btn_loading = true;

      updateOrderDateAndTime(
        this.orderInput.id,
        this.orderInput.date,
        this.orderInput.time
      ).then((data) => {
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