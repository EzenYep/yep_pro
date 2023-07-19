<template>
    <div>
        <h2>Kakao Pay</h2>
        <a :href="state.next_redirect_pc_url">
            결제하시겠습니까?
        </a>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useRoute} from "vue-router";
const route = useRoute();
const amount = route.query.amount
const quantity = route.query.quantity
console.log(quantity)
const state = ref({
    next_redirect_pc_url: "",
    tid: "",
    params: {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name: "Yep 영화 예약",
        quantity: quantity,
        total_amount: amount*quantity,
        vat_amount: 200,
        tax_free_amount: 0,
        approval_url: "http://localhost:8080/",
        fail_url: "http://localhost:8080/",
        cancel_url: "http://localhost:8080/",
    },
});

onMounted(async () => {
    try {
        const response = await axios({
            url: "https://kapi.kakao.com/v1/payment/ready",
            method: "POST",
            headers: {
                Authorization: "KakaoAK 806d2cb0ff6998ba5a03e9fd9b328a1c",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params: state.value.params,
        });

        state.value.next_redirect_pc_url = response.data.next_redirect_pc_url;
        state.value.tid = response.data.tid;
    } catch (error) {
        console.log(error);
    }
});
</script>