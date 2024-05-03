<template>
  <v-container>
    <div :align="alignButton">
      <v-btn
        class="primary text-none"
        depressed
        @click="action"
        :disabled="!disabled"
        :loading="isLoading"
      >
        <v-icon v-show="isIcon" size="20" left>{{icon}}</v-icon>
        {{text}}
      </v-btn>
    </div>
  </v-container>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: "mdi-plus",
    },
    text: String,
    action: Function,
    alignButton: {
      type: String,
      default: "left",
    },
    isIcon: {
      default: true,
    },
    isLoading: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>