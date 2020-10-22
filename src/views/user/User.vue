<template>
  <div class="user-page">
    <vs-alert color="danger" :active.sync="alter_issue" class="mb-3">
      <span> {{ error_message }} </span>
    </vs-alert>
    <div v-if="!alter_issue">
      <vx-card v-if="user" title="Account" class="mb-base">
          <div class="vx-row">
            <div class="vx-col" id="avatar-col">
              <div class="img-container mb-4">
                <img :src="user.profile_picture ? user.profile_picture : defaultPic" class="rounded" width="100px" />
              </div>
            </div>
            <div class="vx-col flex-1">
              <table>
                <tr>
                  <td class="font-semibold">Username</td>
                  <td> {{user.username}} </td>
                </tr>
                <tr>
                  <td class="font-semibold">Name</td>
                  <td> {{user.name}} </td>
                </tr>
                <tr>
                  <td class="font-semibold">Email</td>
                  <td> {{user.email}} </td>
                </tr>
                <tr>
                  <td class="font-semibold"> Usage </td>
                  <td> Business account </td>
                </tr>
                <tr>
                  <td class="font-semibold">User Id</td>
                  <td> {{user.user_id}} </td>
                </tr>
              </table>
            </div>

            <div class="vx-col flex-1">
              <table>
                <tr>
                  <td class="font-semibold">Company</td>
                  <td> Windon Technologies Pvt Ltd </td>
                </tr>
                <tr>
                  <td class="font-semibold">Registered</td>
                  <td> {{user.account_create}} </td>
                </tr>
                <tr>
                  <td class="font-semibold">Last login</td>
                  <td> {{user.last_login}} </td>
                </tr>
                <tr>
                  <div class="vx-col w-full flex mt-5" id="account-manage-buttons">
                      <vs-button color="success" icon-pack="feather">Active Use</vs-button>
                  </div>
                </tr>
              </table>
            </div>
            
          </div>
      </vx-card>

      <div v-if="user" class="vx-row">
          <div class="vx-col lg:w-1/2 w-full">
            <vx-card title="Summary" class="mb-base">
              <div class="flex">
                  <div class="w-1/2">
                      <table>
                      <tr>
                          <td class="font-semibold">Tickets (total):</td>
                          <td> {{user.tickets}} </td>
                      </tr>
                      <tr>
                          <td class="font-semibold">Parking Lots:</td>
                          <td>{{user.lots.length}}</td>
                      </tr>
                      <tr>
                          <td class="font-semibold">Earned (total):</td>
                          <td>{{user.earned}}</td>
                      </tr>
                      <tr>
                          <td class="font-semibold">Paid Up to now:</td>
                          <td>525</td>
                      </tr>
                      </table>
                  </div>

                  <div class="w-1/2">
                      <table>
                      <tr>
                          <td class="font-semibold">Amount on hold:</td>
                          <td>22.50</td>
                      </tr>
                      <tr>
                          <td class="font-semibold">Last Cashout</td>
                          <td>05.11.2020</td>
                      </tr>
                      <tr>
                          <td class="font-semibold">Employees</td>
                          <td>{{user.employees.length}}</td>
                      </tr>
                      </table>
                  </div>
              </div>
            </vx-card>
          </div>

          <div class="vx-col lg:w-1/2 w-full">
            <vx-card title="Account Details" class="mb-base">
              <div class="mb-4">
                  <span class="font-semibold"> Account Owner: </span>
                  <span> Angelo Sashington </span>
              </div>
              <div class="mb-4">
                  <span class="font-semibold"> International Bank Account Number (IBAN): </span>
                  <span> DE360976374820 </span>
              </div>
              <div>
                  <span class="font-semibold"> Bank: </span>
                  <span> Sparda Bank Germany </span>
              </div>
            </vx-card>
          </div>
      </div>

      <vx-card class="parking-lots">
        <div class="flex flex-wrap justify-between items-center top-wrapper">
          <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
            <h5> Parking Lots from User </h5>
          </div>
          <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
            <vx-input-group class="mb-3 search-input-group">
              <template slot="prepend">
                <div class="prepend-text bg-primary">
                  <feather-icon icon="SearchIcon" svgClasses="h-4 w-4" />
                </div>
              </template>
              <vs-input class="mb-2 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />
            </vx-input-group>
          </div>
        </div>
        <ag-grid-vue
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="contacts"
          rowSelection="multiple"
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="false"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          :enableRtl="$vs.rtl">
        </ag-grid-vue>
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div class="p-2 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ contacts.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : contacts.length }} of {{ contacts.length }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(5)">
              <span>5</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
              <span>20</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
              <span>50</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
        <vs-pagination
          :total="totalPages"
          :max="maxPageNumbers"
          v-model="currentPage" />
      </vx-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { AgGridVue } from 'ag-grid-vue'
import { UserServices } from '@/services/index'

import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import CellRendererLink from './cell-renderer/CellRendererLink'
import CellRendererVerified from './cell-renderer/CellRendererVerified'
import CellRendererActions from './cell-renderer/CellRendererActions'

export default {
  name: 'Overview',
  components: {
    AgGridVue,
    CellRendererLink,
    CellRendererVerified,
    CellRendererActions
  },
  data () {
    return {
      alter_issue: false,
      error_message: '',
      user: null,
      defaultPic: require('@/assets/images/avatar_default.jpg'),
      searchQuery: '',
      gridOptions: {},
      maxPageNumbers: 7,
      gridApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
        resizable: true,
        suppressMenu: true,
        headerComponentParams: {
          template:
            '<div class="ag-cell-label-container" role="presentation">' +
            '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
            '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
            '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
            '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
            '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
            '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
            '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
            '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
            '  </div>' +
            '</div>'
        }
      },
      columnDefs: [
        {
          headerName: 'ID',
          field: 'lot_id',
          width: 80
        },
        {
          headerName: 'Username:',
          field: 'user_id.username',
          width: 175,
          cellRendererFramework: Vue.extend(CellRendererLink),
          cellClass: 'text-center'
        },
        {
          headerName: 'Address of Lot:',
          field: 'address',
          width: 275
        },
        {
          headerName: 'Date of creation:',
          field: 'created_at',
          width: 150
        },
        {
          headerName: 'Commission:',
          field: 'status_commission',
          width: 150,
          cellRendererFramework: Vue.extend(CellRendererVerified),
          cellClass: 'text-center'
        },
        {
          headerName: 'Image Signs:',
          field: 'status_image_sign',
          width: 150,
          cellRendererFramework: Vue.extend(CellRendererVerified),
          cellClass: 'text-center'
        },
        {
          headerName: 'Proofed:',
          field: 'status_proofed',
          width: 150,
          cellRendererFramework: Vue.extend(CellRendererVerified),
          cellClass: 'text-center'
        },
        {
          headerName: 'Lot Status Admin:',
          field: 'status_by_admin',
          width: 125,
          cellRendererFramework: Vue.extend(CellRendererVerified),
          cellClass: 'text-center'
        },
        {
          headerName: 'Lot Status User:',
          field: 'status_by_user',
          width: 125,
          cellRendererFramework: Vue.extend(CellRendererVerified),
          cellClass: 'text-center'
        },
        {
          headerName: '',
          field: '',
          width: 125,
          cellRendererFramework: Vue.extend(CellRendererActions),
          cellClass: 'text-center'
        }
      ],
      contacts: [],
      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererVerified,
        CellRendererActions
      }
    }
  },
  watch: {
    '$store.state.windowWidth' (val) {
      if (val <= 576) {
        this.maxPageNumbers = 4
        this.gridOptions.columnApi.setColumnPinned('email', null)
      } else this.gridOptions.columnApi.setColumnPinned('email', 'left')
    }
  },
  computed: {
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }
  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    freshLots (lots) {
      lots.forEach(lot => {
        lot.address = `${lot.town} ${lot.street} ${lot.house_number}`
        if (!lot.user_id) {
          lot.user_id = {
            username: null
          }
        }
      })
      this.contacts = lots
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    const params = {
      admin: 'user_read',
      id: this.$route.params.user_id
    }
    this.$vs.loading()
    UserServices.userApi(params).then(resp => {
      if (!resp.error) {
        this.user = resp.user
      } else {
        this.alter_issue = true
        this.error_message = resp.message
      }
      this.$vs.loading.close()
    }).catch(err => {
      this.$vs.loading.close()
      console.log(err)
    })
    
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
      header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
    }
  }
}

</script>

<style lang="scss" scope>
.user-page {
    .vx-card__title {
        h4 {
            color: rgba(var(--vs-primary),1) !important;
        }
    }
    .top-wrapper {
        box-shadow: 0px 7px 6px -10px #111111;
        padding: 0 20px;
        margin-bottom: 20px;
    }
    .ag-grid-table-actions-left {
        h5 {
            color: rgba(var(--vs-primary),1);
        }
    }
    .ag-header-row {
        color: rgba(var(--vs-primary),1);
    }
    table {
        td {
            vertical-align: top;
            min-width: 140px;
            padding-bottom: .8rem;
            word-break: break-all;
        }

        &:not(.permissions-table) {
            td {
                @media screen and (max-width:370px) {
                display: block;
                }
            }
        }
    }
}
</style>
