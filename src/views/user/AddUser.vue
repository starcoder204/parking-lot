<template>
  <div id="page-user-edit">
    <vs-alert color="danger" :active.sync="alter_user_issue" class="mb-3">
      <span> {{ error_message }} </span>
    </vs-alert>
    <vx-card>
      <div slot="no-body" class="tabs-container px-6 pt-6">
        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Account" icon-pack="feather" icon="icon-user">
            <div class="tab-text">

              <div id="user-edit-tab-info">
                <!-- Avatar Row -->
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <div class="flex items-start flex-col sm:flex-row">
                        <img :src="data.avatar" class="mr-8 rounded h-24 w-24" />
                        <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                        <div>
                            <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">{{ data.name  }}</p>
                            <input type="file" class="hidden" ref="update_avatar_input" @change="update_avatar" accept="image/*" id="user_avatar">

                            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                            <vs-button class="mr-4 mb-4" @click="changeAvatar">Change Avatar</vs-button>
                            <!-- <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Change Avatar</vs-button> -->

                        </div>
                        </div>
                    </div>
                </div>

                <!-- Content Row -->
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-input class="w-full mt-4" label="Name" v-model="data.name" v-validate="'required|alpha_spaces'" name="name" placeholder="Type your name"/>
                        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

                        <vs-input class="w-full mt-4" label="Email" v-model="data.email" type="email" v-validate="'required|email'" name="email" placeholder="Type your Email"/>
                        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <div class="mt-4">
                        <label class="vs-input--label">Status</label>
                        <v-select v-model="status_local" :clearable="false" :options="statusOptions" v-validate="'required'" name="status_id" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        <span class="text-danger text-sm"  v-show="errors.has('status_id')">{{ errors.first('status_id') }}</span>
                        </div>
                        <div class="mt-4">
                        <label class="vs-input--label">Role</label>
                        <v-select v-model="role_local" :clearable="false" :options="roleOptions" v-validate="'required'" name="role_id" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        <span class="text-danger text-sm"  v-show="errors.has('role_id')">{{ errors.first('role_id') }}</span>
                        </div>

                        <div class="pw-div">
                        <vs-input class="w-full mt-4" :type="pw_hidden ? 'password': 'text'" label="Password" v-model="data.password" v-validate="'required|min:6|max:10'" name="password" ref="password" placeholder="Your Password" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                        <feather-icon :icon="pw_hidden ? 'EyeIcon': 'EyeOffIcon'" @click="pw_hidden = !pw_hidden" svgClasses="h-4 w-4" class="ml-1 pw-icon" color="primary"/>
                        </div>
                    </div>
                </div>

                <!-- Save & Reset Button -->
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <div class="mt-8 flex flex-wrap items-center justify-end">
                        <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save</vs-button>
                        </div>
                    </div>
                </div>

                <!-- Permissions -->
                <vx-card class="mt-base" no-shadow card-border>
                    <div class="vx-row">
                        <div class="vx-col w-full">
                        <div class="flex items-end px-3">
                            <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
                            <span class="font-medium text-lg leading-none">Permissions</span>
                        </div>
                        <vs-divider />
                        </div>
                    </div>

                    <div class="block overflow-x-auto">
                        <table class="w-full">
                        <tr>
                            <!--
                            You can also use `Object.keys(Object.values(data.permissions)[0])` this logic if you consider,
                            our data structure. You just have to loop over above variable to get table headers.
                            Below we made it simple. So, everyone can understand.
                            -->
                            <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in ['Module', 'Read', 'Write', 'Create', 'Disable']" :key="heading">{{ heading }}</th>
                        </tr>

                        <tr v-for="(val, key) in data.permissions" :key="key">
                            <td class="px-3 py-2">{{ val.title }}</td>
                            <td v-for="(permission, name) in val.data" class="px-3 py-2" :key="name+permission">
                            <vs-checkbox v-model="val.data[name]" />
                            </td>
                        </tr>
                        </table>
                    </div>
                </vx-card>

              </div>
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </vx-card>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { UserServices } from '@/services/index'
export default {
  components: {
    vSelect
  },
  data () {
    return {
      alter_user_issue: false,
      error_message: '',
      user_data: null,
      activeTab: 0,
      imageFile: null,
      data: {
        avatar: require('@/assets/images/avatar_default.jpg'),
        name: '',
        email: '',
        password: '',
        permissions: {
          ticket_overview: {
            title: 'Ticket Overview',
            data: { read: true, write: true, create: true, disable: true }
          },
          ticket_workflow: {
            title: 'Ticket Workflow',
            data: { read: true, write: true, create: true, disable: true }
          },
          parking_lot_overview: {
            title: 'Parking Lot Overview',
            data: { read: true, write: true, create: true, disable: true }
          },
          parking_lot_workflow: {
            title: 'Parking Lot Workflow',
            data: { read: true, write: true, create: true, disable: true }
          },
          parking_lot_commision_area: {
            title: 'Parking Lot Commision Area',
            data: { read: true, write: true, create: true, disable: true }
          },
          finance_payout_overview: {
            title: 'Finance Payout Overview',
            data: { read: true, write: true, create: true, disable: true }
          },
          finance_payout_workflow: {
            title: 'Finance Payout Workflow',
            data: { read: true, write: true, create: true, disable: true }
          },
          user_area_overview: {
            title: 'User Area Overview',
            data: { read: true, write: true, create: true, disable: true }
          },
          user_area_workflow: {
            title: 'User Area Workflow',
            data: { read: true, write: true, create: true, disable: true }
          },
          admin_area_overview: {
            title: 'Admin Area Overview',
            data: { read: true, write: true, create: true, disable: true }
          },
          admin_area_workflow: {
            title: 'Admin Area Workflow',
            data: { read: true, write: true, create: true, disable: true }
          },
          sign_order_overview: {
            title: 'Sign Order Overview',
            data: { read: true, write: true, create: true, disable: true }
          },
          sign_order_workflow: {
            title: 'Sign Order Workflow',
            data: { read: true, write: true, create: true, disable: true }
          },
          finance_payout_password: {
            title: 'Finance Payout Password',
            data: { read: true }
          }
        },
        role_id: '1',
        status_id: '1'
      },
      pw_hidden: true,
      statusOptions: [
        { label: 'Active',  value: '1' },
        { label: 'Blocked',  value: '2' },
        { label: 'Deactivated',  value: '3' }
      ],
      roleOptions: [
        { label: 'Admin',  value: '1' },
        { label: 'User',  value: '2' },
        { label: 'Staff',  value: '3' }
      ]
    }
  },
  computed: {
    status_local: {
      get () {
        const label = this.statusOptions.filter(e => e.value === this.data.status_id)[0].label
        return { label, value: this.data.status_id }
      },
      set (obj) {
        this.data.status_id = obj.value
      }
    },
    role_local: {
      get () {
        const label = this.roleOptions.filter(e => e.value === this.data.role_id)[0].label
        return { label, value: this.data.role_id }
      },
      set (obj) {
        this.data.role_id = obj.value
      }
    },
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    capitalize (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
    },
    save_changes () {
      if (!this.validateForm) return
      if (!this.data.name || !this.data.email || !this.data.password) {
        return
      }
      const params = {
        admin: 'admin_create',
        avatar: this.imageFile,
        name: this.data.name,
        email: this.data.email,
        status_id: this.data.status_id,
        role_id: this.data.role_id,
        password: this.data.password,
        account_create: this.getDateTime(),
        ticket_overview_read: this.data.permissions.ticket_overview.data.read ? '1' : '0',
        ticket_overview_write: this.data.permissions.ticket_overview.data.write ? '1' : '0',
        ticket_overview_edit: this.data.permissions.ticket_overview.data.create ? '1' : '0',
        ticket_overview_disable: this.data.permissions.ticket_overview.data.disable ? '1' : '0',
        ticket_workflow_read: this.data.permissions.ticket_workflow.data.read ? '1' : '0',
        ticket_workflow_write: this.data.permissions.ticket_workflow.data.write ? '1' : '0',
        ticket_workflow_edit: this.data.permissions.ticket_workflow.data.create ? '1' : '0',
        ticket_workflow_disable: this.data.permissions.ticket_workflow.data.disable ? '1' : '0',
        parking_lot_overview_read: this.data.permissions.parking_lot_overview.data.read ? '1' : '0',
        parking_lot_overview_write: this.data.permissions.parking_lot_overview.data.write ? '1' : '0',
        parking_lot_overview_edit: this.data.permissions.parking_lot_overview.data.create ? '1' : '0',
        parking_lot_overview_disable: this.data.permissions.parking_lot_overview.data.disable ? '1' : '0',
        parking_lot_workflow_read: this.data.permissions.parking_lot_workflow.data.read ? '1' : '0',
        parking_lot_workflow_write: this.data.permissions.parking_lot_workflow.data.write ? '1' : '0',
        parking_lot_workflow_edit: this.data.permissions.parking_lot_workflow.data.create ? '1' : '0',
        parking_lot_workflow_disable: this.data.permissions.parking_lot_workflow.data.disable ? '1' : '0',
        parking_lot_commision_area_read: this.data.permissions.parking_lot_commision_area.data.read ? '1' : '0',
        parking_lot_commision_area_write: this.data.permissions.parking_lot_commision_area.data.write ? '1' : '0',
        parking_lot_commision_area_edit: this.data.permissions.parking_lot_commision_area.data.create ? '1' : '0',
        parking_lot_commision_area_disable: this.data.permissions.parking_lot_commision_area.data.disable ? '1' : '0',
        finance_payout_overview_read: this.data.permissions.finance_payout_overview.data.read ? '1' : '0',
        finance_payout_overview_write: this.data.permissions.finance_payout_overview.data.write ? '1' : '0',
        finance_payout_overview_edit: this.data.permissions.finance_payout_overview.data.create ? '1' : '0',
        finance_payout_overview_disable: this.data.permissions.finance_payout_overview.data.disable ? '1' : '0',
        finance_payout_workflow_read: this.data.permissions.finance_payout_workflow.data.read ? '1' : '0',
        finance_payout_workflow_write: this.data.permissions.finance_payout_workflow.data.write ? '1' : '0',
        finance_payout_workflow_edit: this.data.permissions.finance_payout_workflow.data.create ? '1' : '0',
        finance_payout_workflow_disable: this.data.permissions.finance_payout_workflow.data.disable ? '1' : '0',
        user_area_overview_read: this.data.permissions.user_area_overview.data.read ? '1' : '0',
        user_area_overview_write: this.data.permissions.user_area_overview.data.write ? '1' : '0',
        user_area_overview_edit: this.data.permissions.user_area_overview.data.create ? '1' : '0',
        user_area_overview_disable: this.data.permissions.user_area_overview.data.disable ? '1' : '0',
        user_area_workflow_read: this.data.permissions.user_area_workflow.data.read ? '1' : '0',
        user_area_workflow_write: this.data.permissions.user_area_workflow.data.write ? '1' : '0',
        user_area_workflow_edit: this.data.permissions.user_area_workflow.data.create ? '1' : '0',
        user_area_workflow_disable: this.data.permissions.user_area_workflow.data.disable ? '1' : '0',
        admin_area_overview_read: this.data.permissions.admin_area_overview.data.read ? '1' : '0',
        admin_area_overview_write: this.data.permissions.admin_area_overview.data.write ? '1' : '0',
        admin_area_overview_edit: this.data.permissions.admin_area_overview.data.create ? '1' : '0',
        admin_area_overview_disable: this.data.permissions.admin_area_overview.data.disable ? '1' : '0',
        admin_area_workflow_read: this.data.permissions.admin_area_workflow.data.read ? '1' : '0',
        admin_area_workflow_write: this.data.permissions.admin_area_workflow.data.create ? '1' : '0',
        admin_area_workflow_edit: this.data.permissions.admin_area_workflow.data.write ? '1' : '0',
        admin_area_workflow_disable: this.data.permissions.admin_area_workflow.data.disable ? '1' : '0',
        sign_order_overview_read: this.data.permissions.sign_order_overview.data.read ? '1' : '0',
        sign_order_overview_write: this.data.permissions.sign_order_overview.data.write ? '1' : '0',
        sign_order_overview_edit: this.data.permissions.sign_order_overview.data.create ? '1' : '0',
        sign_order_overview_disable: this.data.permissions.sign_order_overview.data.disable ? '1' : '0',
        sign_order_workflow_read: this.data.permissions.sign_order_workflow.data.read ? '1' : '0',
        sign_order_workflow_write: this.data.permissions.sign_order_workflow.data.write ? '1' : '0',
        sign_order_workflow_edit: this.data.permissions.sign_order_workflow.data.create ? '1' : '0',
        sign_order_workflow_disable: this.data.permissions.sign_order_workflow.data.disable ? '1' : '0',
        finance_payout_password_read: this.data.permissions.finance_payout_workflow.data.read ? '1' : '0'
      }
      this.$vs.loading()
      this.alter_user_issue = false
      UserServices.userApi(params).then(resp => {
        if (!resp.error) {
          this.$router.push({ name: 'admin-list' }).catch(() => {})
        } else {
          this.alter_user_issue = true
          this.error_message = resp.message
        }
        this.$vs.loading.close()
      }).catch(err => {
        this.$vs.loading.close()
        console.log(err)
      })
    },
    changeAvatar () {
      document.getElementById('user_avatar').click()
    },
    update_avatar () {
      const input = event.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.data.avatar = e.target.result
        }
        reader.readAsDataURL(input.files[0])
        this.imageFile = input.files[0]
      }
    },
    getDateTime () {
      const date_ob = new Date()
      const date = `0${date_ob.getDate()}`.slice(-2)
      const month = `0${(date_ob.getMonth() + 1)}`.slice(-2)
      const year = date_ob.getFullYear()
      const hours = date_ob.getHours()
      const minutes = date_ob.getMinutes()
      const seconds = date_ob.getSeconds()
      return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    }
  }
}
</script>

<style lang="scss" scope>
.pw-div {
    position: relative;
    .pw-icon {
        color: rgba(var(--vs-primary), 1);
        position: absolute !important;
        right: 10px;
        top: 34px;
    }
}
</style>