<template>
  <form @submit.prevent="submit">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Người nhận</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="validAddress">
              <label>Địa chỉ ví</label>
              <md-input v-model="form.address" type="text" required></md-input>
              <span class="md-error">Tối thiểu 2 ký tự</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="validDescription">
              <label>Mô tả</label>
              <md-input v-model="form.description" type="text" required></md-input>
              <span class="md-error">Tối thiểu 2 ký tự</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="validContent">
              <label>Nội dung</label>
              <md-input v-model="form.content" type="text" required></md-input>
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
import { mapActions } from "vuex";

export default {
  name: "voting-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  computed: {
    validAddress() {
     return this.form.address == "" ? "" : this.form.address.length > 1 ? "" : "md-invalid"
    },
    validDescription() {
      return this.form.description == "" ? "" : this.form.description.length > 1 ? "" : "md-invalid"
    },
    validContent() {
      return this.form.content == "" ? "" : this.form.content.length > 1 ? "" : "md-invalid"
    },
  },
  data() {
    return {
      form: {
        address: "",
        description: "",
        content: "",
      },
    };
  },
  methods: {
    ...mapActions({
    }),
    submit() {
    },
  },
};
</script>
<style></style>
