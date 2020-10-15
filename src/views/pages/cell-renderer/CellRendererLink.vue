<template>
  <div class="flex items-center">
    <vs-avatar :src="picUrl" class="flex-shrink-0 mr-2" size="30px" @click="$router.push(url)" />
    <router-link :to="url" @click.stop.prevent class="text-inherit hover:text-primary">{{ params.value }}</router-link>
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
    url () {
      return '/apps/user/user-view/268'

      // Below line will be for actual product
      // Currently it's commented due to demo purpose - Above url is for demo purpose
      // return "/apps/user/user-view/" + this.params.data.id
    }
  },
  mounted () {
    this.picUrl = this.params.data.user_id.profile_picture ? this.params.data.user_id.profile_picture : null
  }
}
</script>
