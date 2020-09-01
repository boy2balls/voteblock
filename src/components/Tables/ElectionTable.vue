<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row">
          <md-table-head>Nội dung</md-table-head>
          <md-table-head>Ngày bắt đầu</md-table-head>
          <md-table-head>Ngày kết thúc</md-table-head>
          <md-table-head>Mô tả</md-table-head>
          <md-table-head></md-table-head>
      </md-table-row>
      <md-table-row slot="md-table-row" v-for="election in elections" :key="election.contentId">
        <md-table-cell>{{ election.content }}</md-table-cell>
        <md-table-cell>{{ election.startDate }}</md-table-cell>
        <md-table-cell>{{ election.endDate }}</md-table-cell>
        <md-table-cell>{{ election.description }}</md-table-cell>
        <md-table-cell v-if="!election.register">
          <md-button class="md-dense md-success" @click="register(election.contentId)">
            Đăng ký
          </md-button>
        </md-table-cell>
        <md-table-cell v-if="election.register">
          <md-button class="md-dense md-danger" disabled>
            Đã đăng ký
          </md-button>
        </md-table-cell>
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
      getElections: 'election/getElections',
      registerElector: 'election/registerElector',
      notification: 'addNotification',
    }),
    register(data) {
      this.registerElector(data).then(() => {
        this.notification({
          type: 'success',
          message: 'Đăng ký thành công.'
        });
        this.getElections();
      }).catch(() => {
        this.notification({
          type: 'danger',
          message: 'Lỗi hệ thống.'
        });
      })
    }
  },
  created() {
    this.getElections();
  }
};
</script>
