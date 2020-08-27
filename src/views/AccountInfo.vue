<template>
  <div class="content">
    <div class="md-layout md-alignment-center">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
      >
        <user-card> </user-card>
      </div>
    </div>
  </div>
</template>

<script>
import { UserCard } from "@/components";

export default {
  components: {
    UserCard,
  }
};
</script>
