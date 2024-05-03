<template>
  <!-- <div class="pa-sm-4 pa-md-10 pa-lg-12"> -->
  <Chat />
  <!-- </div> -->
</template>
<script>
import { isAdmin, isSeller } from "@/user/utlis/helper.js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Chat: () => import("@/chat/components/chat.vue"),
  },
  methods: {
    isAdmin,
  },
};
</script>
