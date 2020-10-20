<template>
    <div>
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                  v-if="payoutOrders.analyticsData"
                  icon="DollarSignIcon"
                  :statistic="payoutOrders.analyticsData.subscribers"
                  statisticTitle="Open Payout Orders"
                  :chartData="payoutOrders.series"
				  color="danger"
                  type="area" />
            </div>
			<div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                  v-if="alreadyPaidOut.analyticsData"
                  icon="DollarSignIcon"
                  :statistic="alreadyPaidOut.analyticsData.subscribers"
                  statisticTitle="Already paid out"
                  :chartData="alreadyPaidOut.series"
				  color="success"
                  type="area" />
            </div>
			<div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                  v-if="paidOutAskingUser.analyticsData"
                  icon="UserIcon"
                  :statistic="paidOutAskingUser.analyticsData.subscribers"
                  statisticTitle="Asking for Payout"
                  :chartData="paidOutAskingUser.series"
				  color="success"
                  type="area" />
            </div>
			<div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                  v-if="commissionInquiry.analyticsData"
                  icon="DollarSignIcon"
                  :statistic="commissionInquiry.analyticsData.subscribers"
                  statisticTitle="Inquiry of commision which can be payed out by user"
                  :chartData="commissionInquiry.series"
				  color="warning"
                  type="area" />
            </div>
        </div>

		<div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
                <statistics-card-line
                  v-if="paymentsOnHold.analyticsData"
                  icon="DollarSignIcon"
                  :statistic="paymentsOnHold.analyticsData.subscribers"
                  statisticTitle="Payments on Hold caused of missing Sign images"
                  :chartData="paymentsOnHold.series"
				  color="warning"
				  chartConf="1"
                  type="area" />
            </div>
			<div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
                <statistics-card-line
                  v-if="payedOut.analyticsData"
                  icon="DollarSignIcon"
                  :statistic="payedOut.analyticsData.subscribers"
                  statisticTitle="Payed Out"
                  :chartData="payedOut.series"
				  color="primary"
				  chartConf="1"
                  type="area" />
            </div>
		</div>

		<div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
                <statistics-card-line
                  v-if="amountEarnedThisMonth.analyticsData"
                  icon="DollarSignIcon"
                  :statistic="amountEarnedThisMonth.analyticsData.subscribers"
                  statisticTitle="Amount earned this month"
                  :chartData="amountEarnedThisMonth.series"
				  color="success"
				  chartConf="1"
                  type="area" />
            </div>
			<div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
                <statistics-card-line
                  v-if="amountEarned.analyticsData"
                  icon="DollarSignIcon"
                  :statistic="amountEarned.analyticsData.subscribers"
                  statisticTitle="Amount earned so far"
                  :chartData="amountEarned.series"
				  color="success"
				  chartConf="1"
                  type="area" />
            </div>
		</div>

    </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
export default{
  components: {
	StatisticsCardLine
  },
  data () {
    return {
	  payoutOrders: {},
	  alreadyPaidOut: {},
	  paidOutAskingUser: {},
	  commissionInquiry: {},
	  // next
	  paymentsOnHold: {},
	  payedOut: {},
	  // next
	  amountEarnedThisMonth: {},
	  amountEarned: {}
    }
  },
  computed: {
  },
  mounted () {
  },
  created () {
    this.payoutOrders = {
	  series: [
		{
		  name: 'Subscribers',
		  data: [28, 40, 36, 52, 38, 60, 55]
		}
	  ],
	  analyticsData: {
		subscribers: '€17.507,50'
	  }
	},
	this.alreadyPaidOut = {
	  series: [
		{
		  name: 'Subscribers',
		  data: [28, 40, 36, 52, 38, 60, 55]
		}
	  ],
	  analyticsData: {
		subscribers: '€4.757,50'
	  }
	},
	this.paidOutAskingUser = {
	  series: [
		{
		  name: 'Subscribers',
		  data: [28, 40, 36, 52, 38, 60, 55]
		}
	  ],
	  analyticsData: {
		subscribers: '275 User'
	  }
	},
	this.commissionInquiry = {
	  series: [
		{
		  name: 'Subscribers',
		  data: [14, 20, 18, 25, 18, 30, 27]
		}
	  ],
	  analyticsData: {
		subscribers: '1470 (€ 11.025)'
	  }
	},
	this.paymentsOnHold = {
	  series: [
		{
		  name: 'Subscribers',
		  data: [14, 20, 18, 25, 18, 30, 27]
		}
	  ],
	  analyticsData: {
		subscribers: '€ 24.210'
	  }
	},
	this.payedOut = {
	  series: [
		{
		  name: 'Subscribers',
		  data: [14, 20, 18, 25, 18, 30, 27]
		}
	  ],
	  analyticsData: {
		subscribers: '€ 54.525'
	  }
	},
	this.amountEarnedThisMonth = {
	  series: [
		{
		  name: 'Subscribers',
		  data: [14, 20, 18, 25, 18, 30, 27]
		}
	  ],
	  analyticsData: {
		subscribers: '€ 28.541'
	  }
	},
	this.amountEarned = {
	  series: [
		{
		  name: 'Subscribers',
		  data: [14, 20, 18, 25, 18, 30, 27]
		}
	  ],
	  analyticsData: {
		subscribers: '€ 1.224.210'
	  }
	}
  }
}
</script>

<style lang="scss">
.chat-card-log {
    height: 400px;
    .chat-sent-msg {
        background-color: #f2f4f7 !important;
    }
}
.truncate {
  h2 {
	color: #626262 !important;
  }
}
</style>
