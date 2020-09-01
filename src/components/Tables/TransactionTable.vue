<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row">
          <md-table-head>Địa chỉ gửi</md-table-head>
          <md-table-head>Địa chỉ nhận</md-table-head>
          <md-table-head>Mô tả</md-table-head>
          <md-table-head></md-table-head>
      </md-table-row>
      <md-table-row slot="md-table-row" v-for="transaction in transactions" :key="transaction.id">
        <md-table-cell>{{ transaction.from }}</md-table-cell>
        <md-table-cell>{{ transaction.to }}</md-table-cell>
        <md-table-cell>{{ transaction.description }}</md-table-cell>
        <md-table-cell v-if="!transaction.isMined && transaction.canMine">
          <md-button class="md-dense md-success" @click="mining(transaction)">
            Duyệt
          </md-button>
        </md-table-cell>
        <md-table-cell v-else>
          <md-button class="md-dense md-danger" disabled>
            Đã duyệt
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-content class="md-elevation-3">
    <div class="loading-overlay" v-if="loading">
      <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
    </div>
    </md-content>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "transaction-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      transactions: 'transaction/transactions'
    })
  },
  methods: {
    ...mapActions({
      getTransactions: 'transaction/getTransactions',
      miningTransaction: 'transaction/miningTransaction',
      notification: 'addNotification',
    }),
    mining(data) {
      this.loading = true;
      this.miningTransaction(data).then(() => {
        this.loading = false;
        this.getTransactions();
      }).catch(() => {
        this.notification({
          type: 'danger',
          message: 'Duyệt không hợp lệ.'
        });
      })
    }
  },
  created() {
    this.getTransactions();
  }
};
</script>
<style lang="css">
.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>