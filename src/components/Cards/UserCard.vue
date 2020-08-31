<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h2 class="category text-gray">{{ account.firstName }} {{ account.lastName}}</h2>
      <h4 class="card-title">{{ account.mail }}</h4>
      Địa chỉ ví:
      <p class="card-description">
        {{ account.walletId }}
      </p>
    </md-card-content>
  </md-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/avatar.jpg")
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      account: 'account/account'
    })
  },
  methods: {
    ...mapActions({
      getInfo: 'account/getInfo'
    })
  },
  created() {
    this.getInfo();
  }
};
</script>
<style></style>
