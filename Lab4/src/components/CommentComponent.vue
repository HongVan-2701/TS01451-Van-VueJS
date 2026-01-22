<template>
    <div class="container">
        <h4>Chào, {{ user }}! Hãy để lại bình luận:</h4>
        <textarea v-model="noidung" class="form-control mb-2" placeholder="Nhập bình luận..."></textarea>
        <button class="btn btn-success" @click="submitComment">Gửi bình luận</button>

        <ul class="list-group mt-3">
            <li class="list-group-item" v-for="(bl, index) in binhluan" :key="index">{{ bl }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
const props = defineProps({ user: String });

const noidung = ref('');
const binhluan = ref([]);

const submitComment = () => {
    if (noidung.value.trim()) {
        binhluan.value.push(`${props.user}: ${noidung.value}`);
        noidung.value = '';
    }
};
</script>