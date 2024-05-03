<template>
  <div>
    <ApiKey v-if="isAdmin()" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { isAdmin, isSeller } from "@/user/utlis/helper.js";

export default {
  components: {
    ApiKey: () => import("@/payment/components/ApiKey.vue"),
  },
  methods: {
    isAdmin,
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>