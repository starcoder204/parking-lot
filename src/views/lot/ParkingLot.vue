<template>
    <div class="add-lot-page">
        <div class="vx-row" v-if="failedMessage">
           <span class="failed-info"> {{failedMessage}} </span>
        </div>
        <div class="vx-row" v-if="!failedMessage && lot">
            <!-- Left section -->
            <div class="vx-col md:w-2/3 w-full mb-base">
                <vx-card>
                    <h5>Parking lot without signs:</h5>
                    <div class="vx-row mt-5">
                        <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
                            <vx-card class="lot-image">
                                <div slot="no-body">
                                    <img :src="image" @click="clickPhoto" alt="content-img" class="responsive card-img-top rounded-lg">
                                </div>
                            </vx-card>
                        </div>
                        <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
                            <vx-card class="lot-image">
                                <div slot="no-body">
                                    <img :src="image" alt="content-img" class="responsive card-img-top rounded-lg">
                                </div>
                            </vx-card>
                        </div>
                        <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
                            <vx-card class="lot-image">
                                <div slot="no-body">
                                    <img :src="image" alt="content-img" class="responsive card-img-top rounded-lg">
                                </div>
                            </vx-card>
                        </div>
                    </div>
                    <input type="file" class="hidden" ref="updateImgInput" id="user_photo" @change="previewImage" accept="image/*">
                    <h5>Data of Parking Lot</h5>
                    <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full mb-base">
                            <div class="vx-row mt-3 mb-3">
                                <div class="vx-col w-full">
                                    <vs-input class="w-full" label-placeholder="Parking Lot Name:" v-model="lot.name" />
                                </div>
                            </div>
                            <div class="vx-row mb-3">
                                <div class="vx-col w-full">
                                    <vs-input class="w-full" label-placeholder="Parking Lot Address:" v-model="lot.street" />
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
                            <div class="vx-row mt-3 mb-5">
                                <div class="vx-col md:w-1/2 w-full">
                                    <vs-input class="w-full" label-placeholder="Number Parking Spaces:" v-model="lot.spaces" />
                                </div>
                                <div class="vx-col md:w-1/2 w-full">
                                    <vs-input class="w-full" label-placeholder="Usage Relationship:" v-model="parkingLotForm.relationship" />
                                </div>
                            </div>
                            <h5>Signing of User:</h5>
                            <div class="vx-row mt-3 mb-5">
                                <div class="vx-col md:w-1/2 w-full">
                                </div>
                                <div class="vx-col md:w-1/2 w-full">
                                    <vs-button color="primary" type="filled" size="small">Ask NEW</vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5>Sign Order:</h5>
                    <div class="vx-row mt-5">
                        <div class="vx-col w-full sm:w-1/3 lg:w-1/5 p-5">
                            <vx-card>
                                <div slot="no-body">
                                    <img :src="sign_order_image1" alt="content-img" class="responsive rounded-lg">
                                    <div class="mt-4 text-center">
                                        <vs-input-number v-model="number1" label="Anzahl" size="small"/>
                                        <vs-button color="primary" type="filled" class="w-full mt-3" size="small">attachment</vs-button>
                                    </div>
                                </div>
                            </vx-card>
                        </div>
                        <div class="vx-col w-full sm:w-1/3 lg:w-1/5 p-5">
                            <vx-card>
                                <div slot="no-body">
                                    <img :src="sign_order_image1" alt="content-img" class="responsive rounded-lg">
                                    <div class="mt-4 text-center">
                                        <vs-input-number v-model="number2" label="Anzahl" size="small"/>
                                        <vs-button color="primary" type="filled" class="w-full mt-3" size="small">attachment</vs-button>
                                    </div>
                                </div>
                            </vx-card>
                        </div>
                        <div class="vx-col w-full sm:w-1/3 lg:w-1/5 p-5">
                            <vx-card>
                                <div slot="no-body">
                                    <img :src="sign_order_image1" alt="content-img" class="responsive rounded-lg">
                                    <div class="mt-4 text-center">
                                        <vs-input-number v-model="number3" label="Anzahl" size="small"/>
                                        <vs-button color="primary" type="filled" class="w-full mt-3" size="small">attachment</vs-button>
                                    </div>
                                </div>
                            </vx-card>
                        </div>
                        <div class="vx-col w-full sm:w-1/3 lg:w-1/5 p-5">
                            <vx-card>
                                <div slot="no-body">
                                    <img :src="sign_order_image1" alt="content-img" class="responsive rounded-lg">
                                    <div class="mt-4 text-center">
                                        <vs-input-number v-model="number4" label="Anzahl" size="small"/>
                                        <vs-button color="primary" type="filled" class="w-full mt-3" size="small">attachment</vs-button>
                                    </div>
                                </div>
                            </vx-card>
                        </div>
                        <div class="vx-col w-full sm:w-1/3 lg:w-1/5 p-5">
                            <vx-card>
                                <div slot="no-body">
                                    <img :src="sign_order_image1" alt="content-img" class="responsive rounded-lg">
                                    <div class="mt-4 text-center">
                                        <vs-input-number v-model="number5" label="Anzahl" size="small"/>
                                        <vs-button color="primary" type="filled" class="w-full mt-3" size="small">attachment</vs-button>
                                    </div>
                                </div>
                            </vx-card>
                        </div>
                    </div>
                </vx-card>
            </div>

            <!-- Right section -->
            <div class="vx-col md:w-1/3 w-full mb-base">
                <vx-card>
                    <div class="vx-row mb-3" v-if="userOptions && userOptions.length > 0">
                        <div class="vx-col md:w-1/2 w-full">
                            <vs-select v-model="userForm.username" class="w-full select-large" label="Username" @change="chooseUser">
                                <vs-select-item :key="index" :value="user.username" :text="user.username" v-for="(user,index) in userOptions" class="w-full" />
                            </vs-select>
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5" v-if="selectedUser">
                            <vs-avatar :src="selectedUser.profile_picture ? selectedUser.profile_picture : null" class="flex-shrink-0 mr-2" size="30px" />
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
    </div>
</template>

<script>
import { LotServices } from '@/services/index'
export default{
  data () {
    return {
      lot: null,
      lotId: null,
      imageFile: null,
      imageData: '',
      image: require('@/assets/images/pages/login.png'),
      sign_order_image1: require('@/assets/images/pages/sign_orders/1.png'),
      number1: 1,
      number2: 1,
      number3: 1,
      number4: 1,
      number5: 1,
      parkingLotForm: {
        name: '',
        address: '',
        principal: '',
        created_at: '',
        number_parking_spaces: 34,
        relationship: 'Owner'
      },
      userOptions: [],
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
      failedMessage: ''
    }
  },
  created () {
  },
  mounted () {
    this.lotId = this.$route.params.lot_id
    const params = {
      admin: 'lot_read',
      id: this.lotId
    }
    this.$vs.loading()
    LotServices.parkingLot(params).then(resp => {
      this.freshLot(resp.lot)
      this.$vs.loading.close()
    }).catch(err => {
      console.log(err)
      this.failedMessage = err
    })
  },
  methods: {
    freshLot (lot) {
      this.lot = lot
      this.userOptions = lot.users
      if (lot.users && lot.users.length > 0) {
        console.log(this.userOptions)
        this.selectedUser = this.userOptions[0]

        this.userForm.username = lot.users[0].username
      }
    },
    chooseUser () {
      const username = this.userForm.username
      this.selectedUser = this.userOptions.filter(e => e.username === username)[0]
    },
    clickPhoto () {
      console.log('photo click')
      document.getElementById('user_photo').click()
    },
    previewImage (event) {
      const input = event.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.image = e.target.result
        }
        reader.readAsDataURL(input.files[0])
        this.imageFile = input.files[0]
        setTimeout(() => {
          this.uploadPicture()
        }, 200)
      }
    },
    uploadPicture () {
    }
  }  
}
</script>

<style lang="scss" scope>
.add-lot-page {
    #user_photo {
        display: none;
    }
    .vuesax-app-is-ltr .vs-input--input.hasValue+.vs-placeholder-label {
        color: #2d2a2a
    }
    .lot-image, input.vs-input--input {
        border: 1px solid rgba(var(--vs-success),1) !important;
    }
    .vs-input-primary .vs-input--input:focus {
        border: 1px solid rgba(var(--vs-danger),1)!important;
    }
}
</style>
