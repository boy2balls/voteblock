import axios from 'axios'

export default ({
    namespaced: true,

    state: {
        send_transactions: [],
        receiver_transactions: [],
        debt_transactions: [],
        type_trans: [
            "Nội bộ",
            "Liên Ngân Hàng"
        ],
        partner_bank: [
            "PGP_Bank",
            "RSA_Bank"
        ],
    },

    getters: {
        typeTrans (state) {
            return state.type_trans
        },
        partnerBank (state) {
            return state.partner_bank
        },
        getSendTransactions(state) {
            return state.send_transactions
        },
        getReceiverTransactions(state) {
            return state.receiver_transactions
        },
        getDebtTransactions(state) {
            return state.debt_transactions
        },
    },

    mutations: {
        SET_SEND_TRANSACTIONS (state, transactions) {
            state.send_transactions = transactions
        },
        SET_RECEIVER_TRANSACTIONS (state, transactions) {
            state.receiver_transactions = transactions
        },
        SET_DEBT_TRANSACTIONS (state, transactions) {
            state.debt_transactions = transactions
        },
        NEW_TRANSACTION () {
        }
    },

    actions: {
        async createTransaction({ commit }, form ) {
            let typeFee;
            if (form.selectedFee == 'Người nhận') {
                typeFee = 2;
            } else {
                typeFee = 1;
            }

            let merchantId;
            switch (form.selectedBank) {
                case 'PGP_Bank':
                    merchantId = 2;
                    break;
                case 'RSA_Bank':
                    merchantId = 3;
                    break;
                default: merchantId = 1;
            }

            let response = await axios.post('transaction', {
                receiverCard: form.cardNumber,
                typeFee: typeFee,
                content: form.content,
                amount: form.amount,
                merchantId: merchantId,
                receiverName: form.cardName
            });

            commit('NEW_TRANSACTION')
            return response.data.data.transId
        },
        async sendOTP({ commit }, transId) {
            let response = await axios.get('send-otp/payment/' + transId);
            commit('NEW_TRANSACTION');
            return response;
        },
        async confirmOTP({ commit }, form) {
            console.log(form)
            await axios.post('validate-otp', {
                action: 'payment',
                otp: form.otp,
                transId: form.transId
            });
            commit('NEW_TRANSACTION');
        },
        async getTransactions({ commit }, type) {
            let response = await axios.get('/get-transactions/' + type);
            let transactions = [];

            if (response.data.data.transactions) {
                response.data.data.transactions.forEach(transaction => {
                    if (transaction.status == 'COMPLETED') {
                        if (transactions) {
                            transactions.push(transaction)
                        } else {
                            transactions = transaction
                        }
                        
                    }
                });
            }

            if (type == 'send') {
                commit('SET_SEND_TRANSACTIONS', transactions);
            } else if (type == 'receiver') {
                commit('SET_RECEIVER_TRANSACTIONS', transactions);
            } else {
                commit('SET_DEBT_TRANSACTIONS', transactions);
            }
        },
        async sendOTPDebt({ commit }, transId) {
            let response = await axios.get('send-otp/debt/' + transId);
            commit('NEW_TRANSACTION');
            return response;
        },
        async confirmOTPDebt({ commit }, form) {
            console.log(form)
            await axios.post('validate-otp', {
                action: 'debt',
                otp: form.otp,
                transId: form.transId
            });
            commit('NEW_TRANSACTION');
        },
    }
})
