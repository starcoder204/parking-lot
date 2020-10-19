<template>
    <div class="vx-row add-lot-page">
        <!-- Left section -->
        <div class="vx-col md:w-2/3 w-full mb-base">
            <vx-card>
                <h5>Parking lot without signs:</h5>
                <div class="vx-row mt-5">
                    <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
                        <vx-card class="lot-image">
                            <div slot="no-body">
                                <img :src="image" @click="clickPhoto(0)" alt="content-img" class="responsive card-img-top rounded-lg">
                            </div>
                        </vx-card>
                    </div>
                    <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
                        <vx-card class="lot-image">
                            <div slot="no-body">
                                <img :src="image1" @click="clickPhoto(1)" alt="content-img" class="responsive card-img-top rounded-lg">
                            </div>
                        </vx-card>
                    </div>
                    <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
                        <vx-card class="lot-image">
                            <div slot="no-body">
                                <img :src="image2" @click="clickPhoto(2)" alt="content-img" class="responsive card-img-top rounded-lg">
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
                        <div class="vx-row mt-5">
                            <div class="vx-col w-full">
                                <flat-pickr :config="configdateTimePicker" v-model="datetime" placeholder="Date/Time of creation:" />
                            </div>
                        </div>
                    </div>

                    <div class="vx-col md:w-1/2 w-full mb-base">
                        <div class="vx-row mt-3 mb-5">
                            <div class="vx-col md:w-1/2 w-full">
                                <vs-input class="w-full" label-placeholder="Number Parking Spaces:" v-model="parkingLotForm.number_parking_spaces" />
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
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
export default{
  data () {
    return {
      image: require('@/assets/images/upload_default.png'),
      image1: require('@/assets/images/upload_default.png'),
      image2: require('@/assets/images/upload_default.png'),
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
        number_parking_spaces: '',
        relationship: ''
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
      datetime: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'd-m-Y H:i:ss'
      },
      imageFile: null,
      selectedImageIndex: null
    }
  },
  components: {
    flatPickr
  },
  methods: {
    chooseUser () {
      const username = this.userForm.username
      this.selectedUser = this.userOptions.filter(e => e.value === username)[0]
    },
    clickPhoto (index) {
      console.log('photo click')
      this.selectedImageIndex = index
      document.getElementById('user_photo').click()
    },
    previewImage (event) {
      const input = event.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (this.selectedImageIndex === 0) {
            this.image = e.target.result
          } else if (this.selectedImageIndex === 1) {
            this.image1 = e.target.result
          } else if (this.selectedImageIndex === 2) {
            this.image2 = e.target.result
          }
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
  },
  mounted () {
    this.selectedUser = this.userOptions[0]
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
    .lot-image img {
        height: 200px;
    }
    .lot-image, input.vs-input--input, .flatpickr-input {
        border: 1px solid rgba(var(--vs-success),1) !important;
    }
    .vs-input-primary .vs-input--input:focus {
        border: 1px solid rgba(var(--vs-danger),1)!important;
    }
}
</style>
