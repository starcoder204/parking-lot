<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <vs-button color="primary" type="filled" size="small" @click="viewLot">Ansehen</vs-button>
    </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  methods: {
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.params.data.username}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
      //   .then(()   => { this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    },
    viewLot () {
      const lotId = this.params.data.id
      this.$router.push({ name: 'lot', params: { lot_id: lotId }})
    }
  }
}
</script>
