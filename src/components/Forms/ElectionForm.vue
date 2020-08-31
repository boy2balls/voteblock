<template>
  <form @submit.prevent="submit">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Tạo cuộc bầu cử</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="validContent">
              <label>Nội dung</label>
              <md-input v-model="form.content" type="text" required></md-input>
              <span class="md-error">Tối thiểu 2 ký tự</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label>Thời gian</label>
            <date-time-picker class="md-primary"
              :startDate = "form.startDate"
              :endDate = "form.endDate"
              @onChange="onChange"
            />
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
            <md-button type="submit" class="md-raised md-success">Tạo</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapActions } from "vuex";
import '@lazy-copilot/datetimepicker/dist/datetimepicker.css';
import { DateTimePicker } from "@lazy-copilot/datetimepicker";

export default {
  name: "voting-form",
  components: {
    DateTimePicker,
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  computed: {
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
        content: "",
        startDate: new Date(),
        endDate: new Date(),
        description: "",
      },
    };
  },
  methods: {
    ...mapActions({
      createElection: 'election/createElection',
      notification: 'addNotification',
    }),
    submit() {
      console.log(this.form)
      var validateForm = {
        content: this.form.content,
        startDate: this.$moment(this.form.startDate).format("YYYY-MM-DD HH:mm:ss"),
        endDate: this.$moment(this.form.endDate).format("YYYY-MM-DD HH:mm:ss"),
        description: this.form.description
      }
      console.log(validateForm);
      this.createElection(validateForm).then(() => {
        this.notification({
          type: 'success',
          message: 'Thành công.'
        });
      }).catch(() => {
        this.notification({
          type: 'danger',
          message: 'Lỗi hệ thống.'
        });
      })
    },
    onChange(data) {
      this.form.startDate = data.startDate;
      this.form.endDate = data.endDate;
    }
  },
};
</script>
<style></style>
