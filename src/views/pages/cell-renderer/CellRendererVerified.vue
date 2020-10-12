<template>
    <vs-switch color="danger" v-model="switch1">
        <span slot="on">{{onText}}</span>
        <span slot="off">{{offText}}</span>
    </vs-switch>
</template>

<script>
export default {
  name: 'CellRendererVerified',
  data () {
    return {
      switch1: true,
      onText: 'Nein',
      offText: 'Ja'
    }
  },
  computed: {
    textColor () {
      return this.params.value === 1 ? 'text-primary' : 'text-grey'
    }
  },
  created () {
    this.switch1 = this.params.value === 1 ? true : false
    if (this.params.colDef.field === 'lot_status_admin' || this.params.colDef.field === 'lot_status_user') {
      this.onText = 'Inaktiv'
      this.offText = 'Aktiv'
    }
  }
}
</script>

<style lang="scss" scope>
.ag-cell button.vs-switch {
    margin: auto;
    margin-top: 12px;
    width: 70px !important;
}
</style>
