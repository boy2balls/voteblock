<template>
  <div class="content">
    <div class="md-layout md-alignment-center">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66"
      >
        <content-form data-background-color="blue"></content-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentForm } from '@/components'

export default {
  components: {
    ContentForm,
  }
};
</script>
