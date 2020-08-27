<template>
    <div class="content">
        <div class="md-layout">
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <stats-card data-background-color="green">
                <template slot="header">
                    <md-icon>money</md-icon>
                </template>

                <template slot="content">
                    <p class="category">Số phiếu bầu</p>
                    <h3 class="title">0</h3>
                </template>

                <template slot="footer">
                    <div class="stats">
                        <md-icon>date_range</md-icon>
                        Cập nhật 24 giờ
                    </div>
                </template>
                </stats-card>
            </div>
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <chart-card
                :chart-data="dailySalesChart.data"
                :chart-options="dailySalesChart.options"
                :chart-type="'Line'"
                data-background-color="blue"
                >
                <template slot="content">
                    <h4 class="title">Hoạt Động</h4>
                    <p class="category">

                    </p>
                </template>

                <template slot="footer">
                    <div class="stats">
                        <md-icon>access_time</md-icon>
                        updated 4 minutes ago
                    </div>
                </template>
                </chart-card>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import {
  StatsCard,
  ChartCard
} from "@/components";

export default {
    components: {
        StatsCard,
        ChartCard
    },
    data() {
        return {
            account_saving: 0,
            dailySalesChart: {
                data: {
                    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
                    series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
                },
                options: {
                    lineSmooth: this.$Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 60, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 20,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            }
        };
    },
    methods: {
		...mapActions({
            getAccount: 'account/getAccount',
        }),
    },
    computed: {
        ...mapGetters({
            account: 'account/account'
        })
    },
    created() {
        this.getAccount();
    }
};
</script>
