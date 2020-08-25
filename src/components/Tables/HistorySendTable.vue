<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row">
          <md-table-head>Họ tên</md-table-head>
          <md-table-head>Số tài khoản</md-table-head>
          <md-table-head>Ngày</md-table-head>
          <md-table-head>Số tiền</md-table-head>
      </md-table-row>
      <md-table-row slot="md-table-row" v-for="transaction in transactions" :key="transaction.transId">
        <md-table-cell>{{ transaction.cardName }}</md-table-cell>
        <md-table-cell>{{ transaction.cardNumber }}</md-table-cell>
        <md-table-cell>{{ transaction.createDate }}</md-table-cell>
        <md-table-cell>{{ transaction.amount }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "history-send-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
  },
  computed: {
    ...mapGetters({
      transactions: 'transaction/getSendTransactions'
    })
  },
  methods: {
    ...mapActions({
      getTransactions: 'transaction/getTransactions'
    })
  },
  created() {
    this.getTransactions('send');
  }
};
</script>
