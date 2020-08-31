<template>
  <div class="content">
    <div class="md-layout md-alignment-center">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
              <h4 class="title">Danh sách cuộc bầu cử</h4>
          </md-card-header>
          <md-card-content>
              <election-table table-header-color="green"></election-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66"
      >
        <election-form data-background-color="blue"></election-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ElectionForm, ElectionTable } from '@/components'

export default {
  components: {
    ElectionForm,
    ElectionTable,
  }
};
</script>
