<template>
  <form @submit.prevent="submit">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Người nhận</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Cuộc bầu cử</label>
              <md-select v-model="form.contentId" @md-selected="parseElectors()">
                <md-option v-for="election in elections" v-bind:key="election.contentId" :value="election.contentId">
                  {{ election.content }}
                </md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Địa chỉ ví</label>
              <md-select v-model="form.address">
                <md-option v-for="elector in electors" v-bind:key="elector.contentId" :value="elector.walletId">
                  {{ elector.walletId }}
                </md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="validDescription">
              <label>Mô tả</label>
              <md-input v-model="form.description" type="text" required></md-input>
              <span class="md-error">Tối thiểu 2 ký tự</span>
            </md-field>
          </div>
          <md-progress-bar md-mode="indeterminate" />
          <div class="md-layout-item md-size-100 text-right">
            <md-button type="submit" class="md-raised md-success">Gửi</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "voting-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters({
      elections: 'election/elections',
      electors: 'election/electors',
    }),
    validAddress() {
     return this.form.address == "" ? "" : this.form.address.length > 1 ? "" : "md-invalid"
    },
    validDescription() {
      return this.form.description == "" ? "" : this.form.description.length > 1 ? "" : "md-invalid"
    },
  },
  data() {
    return {
      form: {
        address: "",
        description: "",
        contentId: "",
      },
    };
  },
  methods: {
    ...mapActions({
      getElections: 'election/getElections',
      voting: 'election/voting',
      notification: 'addNotification',
      getElectors: 'election/getElectors'
    }),
    submit() {
      this.voting(this.form).then(() => {
        this.notification({
          type: 'success',
          message: 'Thành công.'
        });
        this.clearParams();
      }).catch(() => {
        this.notification({
          type: 'danger',
          message: 'Bỏ phiếu thất bại (hết lượt).'
        });
      })
    },
    clearParams() {
      this.form.address = '';
      this.form.description = '';
      this.form.contentId = '';
    },
    parseElectors() {
      this.getElectors(this.form.contentId);
    }
  },
  created() {
    this.getElections();
  }
};
</script>
<style></style>
