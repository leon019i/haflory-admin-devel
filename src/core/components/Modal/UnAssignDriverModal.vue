<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="primary--text font-weight-bold">{{
          $t("modal.unassign")
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
            >{{ $t("modal.yes") }}</v-btn
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
      this.$emit("unAssignThisDriver", true);
      this.dialog = false;
    },
    cancel() {
      this.$emit("unAssignThisDriver", false);
      this.dialog = false;
    },
  },
};
</script>