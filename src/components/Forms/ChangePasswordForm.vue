<template>
  <form @submit.prevent="submit">
    <md-card>
      <md-card-content>
        <div class="md-layout md-alignment-center">
          <div class="md-layout-item md-small-size-100 md-size-70">
            <md-field :md-toggle-password="false">
              <label>Mật khẩu mới</label>
              <md-input v-model="form.newPassword" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-70">
            <md-field :md-toggle-password="false">
              <label>Xác nhận mật khẩu</label>
              <md-input v-model="form.confirmPassword" type="password"></md-input>
            </md-field>
          </div>
          <md-progress-bar md-mode="indeterminate"/>
          <div class="md-layout-item md-size-100 text-center">
            <md-button type="submit" class="md-raised md-success">Xác nhận</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: "receiver-form",
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    ...mapActions({
      changePassword: 'account/changePassword',
      notification: 'addNotification',
    }),
    submit() {
      if (this.form.newPassword != this.form.confirmPassword) {
        this.notification({
          type: 'danger',
          message: 'Mật khấu xác nhận không khớp.'
        });
      } else {
        this.changePassword(this.form.newPassword).then(() => {
          this.notification({
            type: 'success',
            message: 'Thành công.'
          });
        }).catch(() => {
          this.notification({
            type: 'danger',
            message: 'Mật khấu xác nhận không khớp.'
          });
        }).finally(() => {
          this.$router.push({
            name: 'Dashboard'
          });
        })
      }
    }
  },
};
</script>
<style></style>
