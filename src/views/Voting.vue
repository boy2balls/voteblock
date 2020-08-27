<template>
  <div class="content">
    <div class="md-layout md-alignment-center">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66"
      >
        <voting-form data-background-color="blue"></voting-form>
      </div>
    </div>
  </div>
</template>

<script>
import { VotingForm } from '@/components'

export default {
  components: {
    VotingForm,
  }
};
</script>
