<template>
  <div id="page-user-edit">
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
                            <input type="file" class="hidden" ref="update_avatar_input" @change="update_avatar" accept="image/*">

                            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                            <vs-button class="mr-4 mb-4">Change Avatar</vs-button>
                            <!-- <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Change Avatar</vs-button> -->

                        </div>
                        </div>
                    </div>
                </div>

                <!-- Content Row -->
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-input class="w-full mt-4" label="Username" v-model="data.username" v-validate="'required|alpha_num'" name="username" placeholder="Enter your username" />
                        <span class="text-danger text-sm"  v-show="errors.has('username')">{{ errors.first('username') }}</span>

                        <vs-input class="w-full mt-4" label="Name" v-model="data.name" v-validate="'required|alpha_spaces'" name="name" placeholder="Type your name"/>
                        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

                        <vs-input class="w-full mt-4" label="Email" v-model="data.email" type="email" v-validate="'required|email'" name="email" placeholder="Type your Email"/>
                        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <div class="mt-4">
                        <label class="vs-input--label">Status</label>
                        <v-select v-model="status_local" :clearable="false" :options="statusOptions" v-validate="'required'" name="status" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        <span class="text-danger text-sm"  v-show="errors.has('status')">{{ errors.first('status') }}</span>
                        </div>
                        <div class="mt-4">
                        <label class="vs-input--label">Role</label>
                        <v-select v-model="role_local" :clearable="false" :options="roleOptions" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
                        </div>

                        <div class="pw-div">
                        <vs-input class="w-full mt-4" :type="pw_hidden ? 'password': 'text'" label="Password" v-model="data.password" v-validate="'required|min:6|max:10'" name="password" ref="password" placeholder="Your Password" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                        <feather-icon :icon="pw_hidden ? 'EyeIcon': 'EyeOffIcon'" @click="pw_hidden = !pw_hidden" svgClasses="h-4 w-4" class="ml-1 pw-icon" color="primary"/>
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
                            <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in ['Module', 'Read', 'Write', 'Create', 'Delete']" :key="heading">{{ heading }}</th>
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

                <!-- Save & Reset Button -->
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <div class="mt-8 flex flex-wrap items-center justify-end">
                        <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button>
                        </div>
                    </div>
                </div>
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
export default {
  components: {
    vSelect
  },
  data () {
    return {
      user_data: null,
      activeTab: 0,
      data: {
        avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg'),
        username: '',
        name: '',
        email: '',
        password: '',
        permissions: {
          ticket_overview: {
            title: 'Ticket Overview',
            data: { read: true, write: true, create: true, delete: false }
          },
          ticket_workflow: {
            title: 'Ticket Workflow',
            data: { read: true, write: true, create: true, delete: true }
          },
          parking_lot_overview: {
            title: 'Parking Lot Overview',
            data: { read: true, write: true, create: true, delete: false }
          },
          parking_lot_workflow: {
            title: 'Parking Lot Workflow',
            data: { read: true, write: true, create: true, delete: false }
          },
          parking_lot_commision_area: {
            title: 'Parking Lot Commision Area',
            data: { read: true, write: true, create: true, delete: true }
          },
          finance_payout_overview: {
            title: 'Finance Payout Overview',
            data: { read: true, write: true, create: true, delete: false }
          },
          user_area_overview: {
            title: 'User Area Overview',
            data: { read: true, write: true, create: true, delete: false }
          },
          user_area_workflow: {
            title: 'User Area Workflow',
            data: { read: true, write: true, create: true, delete: false }
          },
          admin_area_overview: {
            title: 'Admin Area Overview',
            data: { read: true, write: true, create: true, delete: false }
          },
          admin_area_workflow: {
            title: 'Admin Area Workflow',
            data: { read: true, write: true, create: true, delete: false }
          },
          sign_order_overview: {
            title: 'Sign Order Overview',
            data: { read: true, write: true, create: true, delete: false }
          },
          sign_order_workflow: {
            title: 'Sign Order Workflow',
            data: { read: true, write: true, create: true, delete: false }
          },
          finance_payout_password: {
            title: 'Finance Payout Password',
            data: { read: true }
          }
        },
        role: 'admin',
        status: 'active'
      },
      pw_hidden: true,
      statusOptions: [
        { label: 'Active',  value: 'active' },
        { label: 'Blocked',  value: 'blocked' },
        { label: 'Deactivated',  value: 'deactivated' }
      ],
      roleOptions: [
        { label: 'Admin',  value: 'admin' },
        { label: 'User',  value: 'user' },
        { label: 'Staff',  value: 'staff' }
      ]
    }
  },
  computed: {
    status_local: {
      get () {
        return { label: this.capitalize(this.data.status),  value: this.data.status  }
      },
      set (obj) {
        this.data.status = obj.value
      }
    },
    role_local: {
      get () {
        return { label: this.capitalize(this.data.role),  value: this.data.role  }
      },
      set (obj) {
        this.data.role = obj.value
      }
    },
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    pwShow () {
      console.log('password show')
    },
    capitalize (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
    },
    save_changes () {
      /* eslint-disable */
      if (!this.validateForm) return

      // Here will go your API call for updating data

      /* eslint-enable */
    },
    update_avatar () {
      // You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
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