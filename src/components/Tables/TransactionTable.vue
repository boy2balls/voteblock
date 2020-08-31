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
        <md-table-cell v-if="!transaction.isMine">
          <md-button class="md-dense md-success" @click="mining(transaction.transId)">
            Duyệt
          </md-button>
        </md-table-cell>
        <md-table-cell v-if="transaction.isMine">
          <md-button class="md-dense md-danger" disabled>
            Đã duyệt
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
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
  computed: {
    ...mapGetters({
      transactions: 'transaction/transactions'
    })
  },
  methods: {
    ...mapActions({
      getTransactions: 'transaction/getTransactions',
    }),
    mining(data) {
      console.log(data)
    }
  },
  created() {
    this.getTransactions();
  }
};
</script>
