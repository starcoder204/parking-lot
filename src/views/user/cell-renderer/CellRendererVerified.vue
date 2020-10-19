<template>
    <vs-switch color="danger" v-model="switchVal" @click="changeVal(switchVal)">
        <span slot="on">{{onText}}</span>
        <span slot="off">{{offText}}</span>
    </vs-switch>
</template>

<script>
import { LotServices } from '@/services/index'
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
      switch (this.field) {
        case 'status_commission':
          params.admin = 'lot_commission_status'
          params.status_commission = value ? '0' : '1'
          break
        case 'status_image_sign':
          params.admin = 'lot_image_sign_status'
          params.status_image_sign = value ? '0' : '1'
          break
        case 'status_proofed':
          params.admin = 'lot_proofed_status'
          params.status_proofed = value ? '0' : '1'
          break
        case 'status_by_admin':
          params.admin = 'lot_admin_status'
          params.status_by_admin = value ? '0' : '1'
          break
        default:
          break
      }
      LotServices.parkingLot(params).then(resp => {
        if (this.$route.name === 'unproofed' || this.$route.name === 'commissionproof') {
          this.$router.go()
        }
      }).catch(err => {
        console.log(err)
        this.switchVal = !this.switchVal
      })
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
