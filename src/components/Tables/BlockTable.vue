<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row">
          <md-table-head>PreHash</md-table-head>
          <md-table-head>Hash</md-table-head>
          <md-table-head>BlockId</md-table-head>
          <md-table-head>Miner</md-table-head>
      </md-table-row>
      <md-table-row slot="md-table-row" v-for="block in blocks" :key="block.id">
        <md-table-cell>{{ block.prevHash }}</md-table-cell>
        <md-table-cell>{{ block.hash }}</md-table-cell>
        <md-table-cell>{{ block.blockId }}</md-table-cell>
        <md-table-cell>{{ block.miner }}</md-table-cell>
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
      blocks: 'block/blocks'
    })
  },
  methods: {
    ...mapActions({
      getBlocks: 'block/getBlocks'
    })
  },
  created() {
    this.getBlocks();
  }
};
</script>
