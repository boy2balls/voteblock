<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Thông tin ví</h4>
          </md-card-header>
          <md-card-content>
            <payment-table table-header-color="green"></payment-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { PaymentTable } from "@/components";

export default {
  components: {
    PaymentTable
  }
};
</script>
