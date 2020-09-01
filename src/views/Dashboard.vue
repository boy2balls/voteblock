<template>
    <div>
    <md-table table-header-color="green">
        <md-table-row slot="md-table-row">
            <md-table-head>Cuộc bầu cử</md-table-head>
            <md-table-head>Ngày bắt đầu</md-table-head>
            <md-table-head>Ngày kết thúc</md-table-head>
            <md-table-head></md-table-head>
        </md-table-row>
        <md-table-row slot="md-table-row" v-for="election in elections" :key="election.contentId">
            <md-table-cell>{{ election.content }}</md-table-cell>
            <md-table-cell>{{ election.startDate }}</md-table-cell>
            <md-table-cell>{{ election.endDate }}</md-table-cell>
            <md-table-cell>
            <md-button class="md-dense md-success" @click="display(election.electors)">
                Kết quả
            </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
    <md-table table-header-color="red" v-if="show">
        <md-table-row>
            <md-table-head>Địa chỉ ví</md-table-head>
            <md-table-head>Số phiếu</md-table-head>
        </md-table-row>
        <md-table-row slot="md-table-row" v-for="elector in electors" :key="elector.contentId">
            <md-table-cell>{{ elector.walletId }}</md-table-cell>
            <md-table-cell>{{ elector.voted }}</md-table-cell>
        </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
    },
    data() {
        return {
            show: false,
            electors: [],
        };
    },
    methods: {
		...mapActions({
            getElections: 'election/getElections'
        }),
        display(data) {
            this.show = true;
            this.electors = data
        },
    },
    computed: {
        ...mapGetters({
            elections: 'election/elections',
        }),
    },
    created() {
        this.getElections();
    }
};
</script>
