<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <!-- <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedBank"
              :md-options="banks"
            >
              <label>Tìm kiếm...</label>
            </md-autocomplete>
          </div>-->
          <md-list>
            <md-list-item href="/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <li class="md-list-item">
              <a class="md-list-item-router md-list-item-container md-button-clean dropdown">
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span class="notification">0</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul
                      class="dropdown-menu dropdown-menu-right dropdown-menu-size-50"
                    >
                      <li>
                        Không có thông báo nào
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>

            <li class="md-list-item">
              <a class="md-list-item-router md-list-item-container md-button-clean dropdown">
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>person</md-icon>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a href="/change-password">Đổi mật khẩu</a>
                      </li>
                      <li>
                        <a href="#" @click.prevent="signOut">Đăng xuất</a>
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      signOutAction: "auth/signOut",
    }),

    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "login",
        });
      });
    },
  },
};
</script>

<style lang="css"></style>
