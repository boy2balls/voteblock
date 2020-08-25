<template>
    <div class="content">
        <div class="md-layout">
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <md-card>
                <md-card-header data-background-color="blue">
                    <h4 class="title">Giao dịch chuyển</h4>
                </md-card-header>
                <md-card-content>
                    <history-send-table table-header-color="green"></history-send-table>
                </md-card-content>
                </md-card>
            </div>
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <md-card>
                <md-card-header data-background-color="blue">
                    <h4 class="title">Giao dịch nhận</h4>
                </md-card-header>
                <md-card-content>
                    <history-receiver-table table-header-color="green"></history-receiver-table>
                </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import { HistorySendTable, HistoryReceiverTable } from "@/components";

export default {
    components: {
        HistorySendTable,
        HistoryReceiverTable,
    }
};
</script>
