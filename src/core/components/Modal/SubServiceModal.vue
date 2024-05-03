<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card>
        <v-card-title
          class="primary--text font-weight-bold"
          v-if="order.fromAddress"
          >{{
            !!order.fromAddress.area
              ? $store.getters.rtl
                ? order.fromAddress.area.nameAr
                : order.fromAddress.area.nameEn
              : "-"
          }}
          {{ !!order.fromAddress.area.nameEn ? ">" : "-" }}
          {{
            !!order.toAddress.area
              ? $store.getters.rtl
                ? order.toAddress.area.nameAr
                : order.toAddress.area.nameEn
              : "-"
          }}
        </v-card-title>
        <v-card-title v-else>-</v-card-title>
        <div class="px-6">
          <h3 class="secondary--text font-weight-bold">
            {{
              !!order.service
                ? $store.getters.rtl
                  ? order.service.nameAr
                  : order.service.nameEn
                : "-"
            }}
          </h3>

          <v-row
            v-for="(sub, index) in order.subServices"
            :key="index"
            class="px-4"
          >
            <v-col class="py-0 my-1">
              <v-row class="justify-space-around my-0 py-0">
                <p class="my-0" style="width: 150px">
                  <span class="pe-3 my-0 py-0 mb-0"
                    ><v-icon x-small color="primary"
                      >mdi-truck-fast</v-icon
                    ></span
                  >
                  {{
                    !!sub ? ($store.getters.rtl ? sub.nameAr : sub.nameEn) : "-"
                  }}
                </p>
                <p class="font-weight-bold my-0 py-0">X</p>
                <p class="font-weight-bold my-0 py-0">
                  {{ sub.quantity }}
                </p>
              </v-row>
            </v-col>
          </v-row>
          <v-card-title
            class="primary--text font-weight-bold"
            v-if="order.fromAddress"
            >{{ $t("pricing.numberOfTransfer") }}
            {{ !!order.fromAddress.area.nameEn ? " : " : "-" }} {{ "" }}
            <span class="red--text">{{
              !!order.numberOfTransfer ? order.numberOfTransfer : "-"
            }}</span>
          </v-card-title>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            class="font-weight-bold"
            text
            @click="cancel()"
            >{{ $t("modal.close") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    order: {
      required: true,
    },
  },
  methods: {
    show() {
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
    },
  },
};
</script>