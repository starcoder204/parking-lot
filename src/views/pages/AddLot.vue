<template>
    <div class="vx-row">
        <!-- Left section -->
        <div class="vx-col md:w-2/3 w-full mb-base">
            <vx-card title="Parking lot without signs:">
                <h5>Data of Parking Lot</h5>
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full mb-base">
                        <div class="vx-row mt-3 mb-3">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label-placeholder="Parking Lot Name:" v-model="parkingLotForm.name" />
                            </div>
                        </div>
                        <div class="vx-row mb-3">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label-placeholder="Parking Lot Address:" v-model="parkingLotForm.address" />
                            </div>
                        </div>
                        <div class="vx-row mb-3">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label-placeholder="Principle:" v-model="parkingLotForm.principle" />
                            </div>
                        </div>
                        <div class="vx-row mb-3">
                            <div class="vx-col w-full">
                                <vs-input class="w-full" label-placeholder="Date/Time of creation:" />
                            </div>
                        </div>
                    </div>

                    <div class="vx-col md:w-1/2 w-full mb-base">
                        <div class="vx-row mt-3 mb-3">
                            <div class="vx-col md:w-1/2 w-full">
                                <vs-input class="w-full" label-placeholder="Number Parking Spaces:" v-model="parkingLotForm.number_parking_spaces" />
                            </div>
                            <div class="vx-col md:w-1/2 w-full">
                                <vs-input class="w-full" label-placeholder="Usage Relationship:" v-model="parkingLotForm.relationship" />
                            </div>
                        </div>
                    </div>
                </div>
                <h5>Sign Order:</h5>
            </vx-card>
        </div>

        <!-- Right section -->
        <div class="vx-col md:w-1/3 w-full mb-base">
            <vx-card>
                <div class="vx-row mb-3">
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-select v-model="userForm.username" class="w-full select-large" label="Username" @change="chooseUser">
                            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in userOptions" class="w-full" />
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-1/2 w-full mt-5" v-if="selectedUser">
                        <vs-avatar :src="selectedUser.avatar" class="flex-shrink-0 mr-2" size="30px" />
                    </div>
                </div>
                <div class="vx-row mb-3">
                    <div class="vx-col w-full md:w-1/2">
                        <vs-input class="w-full" label-placeholder="Name" v-model="userForm.name" />
                    </div>
                    <div class="vx-col w-full md:w-1/2">
                        <vs-input class="w-full" label-placeholder="Company" v-model="userForm.company" />
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label-placeholder="Address of user" v-model="userForm.address" />
                    </div>
                </div>
            </vx-card>

            <vx-card class="mt-5" title="Sign Delivery Data:">
                <div class="vx-row mb-3">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label-placeholder="Receiver Name" v-model="signDeliveryFrom.receiver_name" />
                    </div>
                </div>
                <div class="vx-row mb-3">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label-placeholder="Company" v-model="signDeliveryFrom.company" />
                    </div>
                </div>
                <div class="vx-row mb-2">
                    <div class="vx-col w-full">
                        <vs-input class="w-full" label-placeholder="Delivery Address" v-model="signDeliveryFrom.address" />
                    </div>
                </div>
            </vx-card>

            <vx-card class="mt-5 text-center" title="Vollmacht">
                <vs-button color="primary" type="filled" size="small">create Vollmacht</vs-button>
            </vx-card>
        </div>
    </div>
</template>

<script>
export default{
  data () {
    return {
      parkingLotForm: {
        name: '',
        address: '',
        principal: '',
        created_at: '',
        number_parking_spaces: 34,
        relationship: 'Owner'
      },
      userOptions: [
        {text: 'shelley', value:'shelley', avatar: require('@/assets/images/portrait/small/avatar-s-1.jpg') },
        {text: 'groden', value:'groden', avatar: require('@/assets/images/portrait/small/avatar-s-2.jpg')},
        {text: 'cyril', value:'cyril', avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg')},
        {text: 'conrad', value:'conrad', avatar: require('@/assets/images/portrait/small/avatar-s-4.jpg')}
      ],
      selectedUser:  null,
      userForm: {
        username: 'shelley',
        name: '',
        compnay: '',
        address: ''
      },
      signDeliveryFrom: {
        receiver_name: '',
        company: '',
        address: ''
      },
      check1: '',
      check2: '',
      check3: '',
      check4: '',
      check5: '',
      check6: '',
      check7: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
    }
  },
  methods: {
    chooseUser () {
      const username = this.userForm.username
      this.selectedUser = this.userOptions.filter(e => e.value === username)[0]
    }
  },
  mounted () {
    this.selectedUser = this.userOptions[0]
  }
}
</script>

<style lang="scss" scope>
// .vs-input-primary {
//     border: 1px solid rgba(var(--vs-success),1)!important;
// }
input {
    border: 1px solid rgba(var(--vs-success),1) !important;
}
.vs-input-primary .vs-input--input:focus {
    border: 1px solid rgba(var(--vs-danger),1)!important;
}
</style>
