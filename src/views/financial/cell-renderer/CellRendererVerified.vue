<template>
    <vs-switch color="danger" v-model="switchVal" @click="changeVal(switchVal)">
        <span slot="on">{{onText}}</span>
        <span slot="off">{{offText}}</span>
    </vs-switch>
</template>

<script>
export default {
  name: 'CellRendererVerified',
  data () {
    return {
      switchVal: true,
      field: '',
      onText: 'Nein',
      offText: 'Ja'
    }
  },
  computed: {
  },
  created () {
    this.switchVal = this.params.value === '1'
    this.field = this.params.colDef.field
    if (this.field === 'lot_status_admin' || this.field === 'lot_status_user') {
      this.onText = 'Inaktiv'
      this.offText = 'Aktiv'
    }
  },
  methods: {
    changeVal (value) {
      const params = {
        id: this.params.data.lot_id
      }
      console.log(params, value)
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
