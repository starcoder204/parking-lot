<template>
  <div id="ag-grid-demo">
    <vx-card>

      <!-- TABLE ACTION ROW -->
      <div class="flex flex-wrap justify-between items-center top-wrapper">

        <!-- ITEMS PER PAGE -->
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <h5> User </h5>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
          <vx-input-group class="mb-3 search-input-group">
            <template slot="prepend">
              <div class="prepend-text bg-primary">
                <feather-icon icon="SearchIcon" svgClasses="h-4 w-4" />
              </div>
            </template>

            <vs-input class="mb-2 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />
          </vx-input-group>
          <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->
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
        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
</template>

<script>
import Vue from 'vue'
import { AgGridVue } from 'ag-grid-vue'
import { UserServices } from '@/services/index'

import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import CellRendererLink from './cell-renderer/CellRendererLink'
import CellRendererVerified from './cell-renderer/CellRendererVerified'
import CellRendererActions from './cell-renderer/CellRendererActions'
import { pageSize } from '@/config/settings'

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
          field: 'admin_id',
          width: 90
        },
        {
          headerName: 'DashboardUser:',
          field: 'name',
          width: 200,
          cellRendererFramework: Vue.extend(CellRendererLink),
          cellClass: 'text-center'
        },
        {
          headerName: 'Position:',
          field: 'username',
          width: 120
        },
        {
          headerName: 'E-Mail:',
          field: 'email',
          width: 180
        },
        {
          headerName: 'Registered:',
          field: 'account_create',
          width: 150
		    },
		    {
          headerName: 'Last login:',
          field: 'last_login',
          width: 150
        },
        {
          headerName: 'Status:',
          field: 'active_status_id',
          width: 125,
          cellRendererFramework: Vue.extend(CellRendererVerified),
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
    freshUsers (admins) {
      this.contacts = admins
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    const params = {
      admin: 'admin_list',
      per_page: pageSize,
      page: 1
    }
    this.$vs.loading()
    UserServices.userList(params).then(resp => {
      if (!resp.error) {
        this.freshUsers(resp.items)
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
</style>
