<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="450">
      <v-card>
        <v-card-title class="primary--text font-weight-bold">{{
          $t("modal.delete")
        }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            class="font-weight-bold"
            text
            @click="cancel()"
            >{{ $t("modal.no") }}</v-btn
          >
          <v-btn
            color="secondary"
            class="font-weight-bold"
            text
            @click="deleteItem()"
            >{{ $t("modal.yesDelete") }}</v-btn
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
  methods: {
    show() {
      this.dialog = true;
    },
    deleteItem() {
      this.$emit("deleteThisItem", true);
      this.dialog = false;
    },
    cancel() {
      this.$emit("deleteThisItem", false);
      this.dialog = false;
    },
  },
};
</script>