<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" background>
        <md-steppers :md-active-step.sync="active" md-linear>
          <md-step
            id="first"
            md-label="Chuyển khoản"
            :md-done.sync="first"
            data-background-color="blue"
          >
            <form>
              <md-card>
                <md-card-content>
                  <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-50 md-autocomplete">
                      <md-autocomplete
                        class="search"
                        v-model="form.selectedType"
                        :md-options="types"
                        required
                      >
                        <label>Loại chuyển khoản</label>
                      </md-autocomplete>
                    </div>
                    <template v-if="form.selectedType == 'Liên Ngân Hàng'">
                      <div class="md-layout-item md-small-size-100 md-size-50 md-autocomplete">
                        <md-autocomplete
                          class="search"
                          v-model="form.selectedBank"
                          :md-options="banks"
                          required
                        >
                          <label>Ngân hàng</label>
                        </md-autocomplete>
                      </div>
                    </template>
                    <div class="md-layout-item md-small-size-100 md-size-50 md-autocomplete">
                      <md-autocomplete
                        class="search"
                        v-model="selectedReminder"
                        :md-options="getRemindersTypeSend"
                        @md-selected="getAccount"
                      >
                        <label>Tài khoản gợi nhớ</label>
                      </md-autocomplete>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <md-field>
                        <label>Tên tài khoản</label>
                        <template v-if="getAccountOfReminder != []">
                          <md-input v-model="form.cardName" required disabled></md-input>
                        </template>
                        <template v-else>
                          <md-input required></md-input>
                        </template>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <md-field :class="validCardNumber">
                        <label>Số tài khoản</label>
                        <md-input
                          type="number"
                          v-model="form.cardNumber"
                          required
                          @change="getCardName"
                        ></md-input>
                        <span class="md-error">Số tài khoản không hợp lệ</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <md-field :class="validAmount">
                        <label>Số tiền</label>
                        <md-input type="number" v-model="form.amount" required></md-input>
                        <span class="md-error">Tối thiếu 100.000đ, tối đa 20.000.000đ</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33 md-autocomplete">
                      <md-autocomplete
                        class="search"
                        v-model="form.selectedFee"
                        :md-options="typeFee"
                        required
                      >
                        <label>Người tính phí</label>
                      </md-autocomplete>
                    </div>
                    <div class="md-layout-item md-size-100">
                      <md-field maxlength="5" :class="validContent">
                        <label>Nội dung</label>
                        <md-textarea v-model="form.content" required></md-textarea>
                        <span class="md-error">Nội dung tối thiếu 2 ký tự</span>
                      </md-field>
                    </div>
                  </div>
                </md-card-content>
              </md-card>
              <md-button class="md-raised md-primary" @click="sendForm()">Tiếp tục</md-button>
            </form>
          </md-step>

          <md-step id="second" md-label="OTP" :md-error="secondStepError" :md-done.sync="second">
            <div style="display: flex; flex-direction: row;">
            </div>
            <md-button class="md-raised md-primary" @click="confirm()">Tiếp tục</md-button>
            <!-- <md-button class="md-raised md-primary" @click="setError()">Set error!</md-button> -->
          </md-step>

          <md-step id="third" md-label="Xác nhận" :md-done.sync="third">
            <p>Giao dịch thành công</p>
            <md-button class="md-raised md-primary" @click="end()">Không</md-button>
            <md-button class="md-raised md-primary" @click="addToListReminder()">Có</md-button>
          </md-step>
        </md-steppers>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data: () => ({
    active: "first",
    first: false,
    second: false,
    third: false,
    secondStepError: null,
    selectedType: null,
    selectedReminder: null,
    typeFee: ["Người gửi", "Người nhận"],
    formOTP: {
      transId: null,
      otp: null,
    },
    selectedFee: null,
    form: {
      cardName: null,
      cardNumber: null,
      amount: null,
      selectedFee: null,
      content: null,
      selectedBank: null,
    },
  }),
  computed: {
    ...mapGetters({
      types: "transaction/typeTrans",
      banks: "transaction/partnerBank",
      getRemindersTypeSend: "reminder/getRemindersTypeSend",
      getAccountOfReminder: "reminder/getAccountOfReminder",
      accountInfo: "account/accountInfo",
      accountPgp: "account/accountPgp",
    }),

    validCardNumber() {
      return this.form.cardNumber == "" || this.form.cardNumber == null
        ? ""
        : this.form.cardNumber.length === 16 || this.getAccountOfReminder.cardNumber == this.form.cardNumber || this.form.cardNumber.length === 8
        ? ""
        : "md-invalid";
    },

    validAmount() {
      return this.form.amount == "" || this.form.amount == null
        ? ""
        : this.form.amount >= 100000 && this.form.amount <= 20000000
        ? ""
        : "md-invalid";
    },

    validContent() {
      return this.form.content == "" || this.form.content == null
        ? ""
        : this.form.content.length >= 2
        ? ""
        : "md-invalid";
    },
  },
  methods: {
    ...mapActions({
      getAllReminders: "reminder/getAllReminders",
      getAccountReminderByCardNumber: "reminder/getAccountReminderByCardNumber",
      createTransaction: "transaction/createTransaction",
      sendOTP: "transaction/sendOTP",
      notification: "addNotification",
      confirmOTP: "transaction/confirmOTP",
      getAccountInfo: "account/getAccountInfo",
      addReminder: "reminder/addReminder",
      getAccountPGP: "account/getAccountPGP",
    }),
    setDone(id, index) {
      this[id] = true;

      this.secondStepError = null;

      if (index) {
        this.active = index;
      }
    },
    getAccount() {
      var res = this.selectedReminder.split("-");
      this.getAccountReminderByCardNumber(res[1]).then(() => {
        this.form.cardName = this.getAccountOfReminder.cardName;
        this.form.cardNumber = this.getAccountOfReminder.cardNumber;
      })
      .finally(() => {
        if (this.form.selectedType === 'Liên Ngân Hàng') {
        this.form.cardName = res[0];
      }
      });
    },
    sendForm() {
      this.createTransaction(this.form)
        .then((res) => {
          this.sendOTP(res)
            .then((res) => {
              this.formOTP.transId = res.data.data.transId;
              this.setDone("first", "second");
            })
            .catch(() => {
              this.notification({
                type: "danger",
                message: "Chuyển khoản không hợp lệ",
              });
            });
        })
        .catch(() => {
          this.notification({
            type: "danger",
            message: "Chuyển khoản không hợp lệ",
          });
        });
    },
    confirm() {
      this.confirmOTP(this.formOTP)
        .then(() => {
          this.setDone("second", "third");
        })
        .catch(() => {
          this.notification({
            type: "danger",
            message: "OTP không hợp lệ",
          });
        });
    },
    end() {
      this.$router.go();
    },
    addToListReminder() {
      console.log(this.form)
      var formReminder = {
				selectedTypes: 'Chuyển Tiền',
				remindName: this.form.cardName,
				cardNumber: this.form.cardNumber,
      };
      this.addReminder(formReminder);
      this.$router.go();
    },
    handleOnComplete(value) {
      console.log("OTP completed: ", value);
      this.formOTP.otp = parseInt(value);
    },
    getCardName() {
      if (this.form.cardNumber !== "" && this.form.selectedType === 'Nội bộ') {
        this.getAccountInfo(this.form.cardNumber)
          .then(() => {
            this.form.cardName = this.accountInfo.cardName;
          })
          .catch(() => {
            this.form.cardName = "";
          });
      } else if (this.form.cardNumber !== "" && this.form.selectedType === 'Liên Ngân Hàng') {
        this.getAccountPGP(this.form.cardNumber)
        .then(() => {
          this.form.cardName = this.accountPgp.cardName;
        })
        .catch(() => {
          this.form.cardName = "";
        })
      } else {
        this.form.cardName = "";
      }
    },
  },
  created() {
    this.getAllReminders();
  },
};
</script>
<style lang="scss">
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  &.error {
    border: 1px solid red !important;
  }
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
