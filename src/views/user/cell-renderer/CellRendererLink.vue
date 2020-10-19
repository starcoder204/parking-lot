<template>
  <div class="flex items-center">
    <vs-avatar :src="picUrl" class="flex-shrink-0 mr-2" size="30px" @click="goToUserPage" />
    <router-link :to="{ name: 'user', params: { user_id: params.data.user_id} }" @click.stop.prevent class="text-inherit hover:text-primary">{{ params.value }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'CellRendererLink',
  data () {
    return {
      picUrl: null
    }
  },
  computed: {
  },
  mounted () {
    this.picUrl = this.params.data.profile_picture ? this.params.data.profile_picture : null
  },
  methods: {
    goToUserPage () {
      this.$router.push({ name: 'user', params: { user_id: this.params.data.user_id } }).catch(() => {})
    }
  }
}
</script>
