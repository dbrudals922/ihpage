<template>
    <div class="container report" style="height:fit-content;">
        <div class="form-group">
            <label for="exampleFormControlTextarea1">자유롭게 피드백을 남겨보세요~<br>오류 제보도 OK!</label>
            <textarea class="form-control" id="textarea" rows="10" v-model="text" style="resize: none;"></textarea>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-outline-dark mt-3" @click="sendMessage()">제보하기</button>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import { useToast } from "vue-toastification";

export default {
    components: {
    },
    name: "Report",
    emits: [],

    setup(props, context) {
        const text = ref("");
        const store = useStore();
        const currentUser = store.state.auth.user;

        const toast = useToast();

        const sendMessage = () => {
            const request = new XMLHttpRequest();
            request.open("POST", "https://discord.com/api/webhooks/1228398151690358884/crLZoylS83QCB3Om2D0mBws4QeD7Wk55CQeuKeQDcitX_ZrL4Zyf-E67KI8pWSWF715j");

            request.setRequestHeader('Content-type', 'application/json');

            if (currentUser) {
                var myEmbed = {
                    title: currentUser.id + " - " + currentUser.username,
                    description: text.value,
                    color: hexToDecimal("#ff0000")
                }
            } else {
                var myEmbed = {
                    title: "문의가 도착했어요!",
                    description: text.value,
                    color: hexToDecimal("#ff0000")
                }
            }


            const params = {
                username: "IHpage Report Bot",
                avatar_url: "",
                embeds: [myEmbed],
            }

            request.send(JSON.stringify(params));

            text.value = "";

            toast("소중한 제보 감사드립니다.\n즐거운 이용되세요~ 😊", {
                type: 'success',
            });

        }

        const hexToDecimal = (hex) => {
            return parseInt(hex.replace("#", ""), 16)
        }

        return {
            sendMessage,
            text,
        }
    },
    mounted() {
    },
}
</script>

<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap);

.container {
    position: fixed;
}

.form-group {
    font-family: 'Do Hyeon', sans-serif;
    font-size: 150%;
}
</style>