<template>
  <div class="container replyViewer">
    <div class="row replies" v-for="reply in replies">
      <!-- <PhotoReply :reply="reply"></PhotoReply> -->
      <div class="reply">
        <div class="row justify-content-center title">
          <div class="col-4 username">
            <a>{{ reply?.user.username }}</a>
          </div>
          <div class="col date">
            <a>{{ reply?.uploadedOn }}</a>
          </div>
          <div class="col-1">
            <span class="xMark" type="button" @click="deleteReply(reply)" v-if="currentUser?.id == reply?.user.id">
              X
            </span>
          </div>
        </div>
        <div class="row content">
          <div class="col">
            <a>{{ reply?.text }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useStore } from 'vuex';

import PhotoService from "../../services/photo.service.js";

import { usePhotoStore } from '../../store/photo';

import moment from 'moment';

import { useToast } from "vue-toastification";



export default {
  components: {
  },
  props: {
    replyData: Object,
  },
  setup(props, context) {
    const store = useStore();
    const currentUser = store.state.auth.user;

    const toast = useToast();

    var replies = ref(null);

    const deleteReply = (reply) => {
      // alert("정말 삭제하시겠습니까?");
      if (confirm('삭제하시면 복구할수 없습니다.\n정말로 삭제하시겠습니까??')) {
        const frm = new FormData();
        frm.append("id", reply.id);

        PhotoService.deleteReply(frm).then((result) => {
          replies.value = result.data.filter(reply => {
            reply.uploadedOn = reply.uploadedOn.split("T")[0]
            return reply;
          });
          // replies.value = result.data;
        })
        toast(
          "삭제되었습니다.", {
          type: "error",
          timeout: 1000,
        }
        )
      } else {
        console.log("취소함");
      }
    }

    watch(() => props.replyData, () => {
      if (props.replyData) {
        for (var i = 0; i < props.replyData.length; i++) {
          props.replyData[i].uploadedOn = moment(props.replyData[i].uploadedOn).format("YYYY-MM-DD hh:mm")
        }
        replies.value = props.replyData;
      }
    })

    return {
      replies,
      currentUser,

      deleteReply,
    }
  },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Gamja+Flower&family=Tauri&display=swap);

/* .container .replyViewer{
  height: 20px;
  width: 400px;
} */

.replyViewer {
  height: 210px;
  /* display: block; */
}

.replies {
  padding: 1% 0 1% 0;
  width: auto;
}

.title div.username {
  font-family: "Gamja Flower", sans-serif;
  font-weight: bold;
  padding-right: 10px;
}

.title div.date {
  font-size: 80%;
  vertical-align: bottom;
  color: rgb(191, 191, 191);
}

.content {
  width: auto;
  font-family: "Gamja Flower", sans-serif;
}

.xMark {
  font-size: 90%;
  color: rgb(180, 180, 180);
}

@media (max-width: 767.98px) {
  .replyViewer {
    height: 50%;
    /* display: block; */
  }

  .title div.username {
    font-size: 80%;
  }

  .title div.date {
    font-size: 60%;
  }

  .content {
    font-size: 80%;
  }

}
</style>