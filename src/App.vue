<template>
  <div id="app">
    <router-view/>

    <notification-list/>
  </div>
</template>

<script>
import NotificationList from './components/NotificationsList';

export default {
  name: 'app',
  components: {
    NotificationList
  }
}
</script>
