<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row">
            <md-table-head>Họ tên</md-table-head>
            <md-table-head>Số tài khoản</md-table-head>
            <md-table-head>Số dư</md-table-head>
        </md-table-row>
        <md-table-row slot="md-table-row">
            <md-table-cell md-label="Họ tên">{{ accountPayment.cardName }}</md-table-cell>
            <md-table-cell md-label="Số tài khoản">{{ accountPayment.cardNumber }}</md-table-cell>
            <md-table-cell md-label="Số dư">{{ accountPayment.balance }}</md-table-cell>
        </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "payment-table",
    props: {
        tableHeaderColor: {
            type: String,
            default: ""
        }
    },
    methods: {
		...mapActions({
            getAccountPayment: 'account/getAccountPayment',
        }),
    },
    computed: {
        ...mapGetters({
            accountPayment: 'account/accountPayment'
        })
    },
    created() {
        this.getAccountPayment();
    }
};
</script>
