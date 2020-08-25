<template>
  <div class="content">
    <div class="md-layout md-alignment-center">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66"
      >
        <change-password-form data-background-color="blue"></change-password-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ChangePasswordForm } from "@/components";

export default {
  components: {
    ChangePasswordForm,
  }
};
</script>
