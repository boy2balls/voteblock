<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row">
          <md-table-head>Nội dung</md-table-head>
          <md-table-head>Ngày bắt đầu</md-table-head>
          <md-table-head>Ngày kết thúc</md-table-head>
          <md-table-head>Mô tả</md-table-head>
      </md-table-row>
      <md-table-row slot="md-table-row" v-for="election in elections" :key="election.contentId">
        <md-table-cell>{{ election.content }}</md-table-cell>
        <md-table-cell>{{ election.startDate }}</md-table-cell>
        <md-table-cell>{{ election.endDate }}</md-table-cell>
        <md-table-cell>{{ election.description }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "election-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
  },
  computed: {
    ...mapGetters({
      elections: 'election/elections'
    })
  },
  methods: {
    ...mapActions({
      getElections: 'election/getElections'
    })
  },
  created() {
    this.getElections();
  }
};
</script>
