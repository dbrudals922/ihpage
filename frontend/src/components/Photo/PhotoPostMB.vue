<template>
  <!-- 게시물 하나 -->
  <!-- imageViewer -->
  <div class="container">
    <div class="row justify-content-between">
      <!-- username -->
      <div class="col">
        <div id="userBox">
          <h4><font-awesome-icon icon="user" /> {{ images.post?.user.username }}</h4>
        </div>
      </div>

      <div class="col-1">
        <div class="dropdown">
          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <font-awesome-icon icon="bars" />
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li v-if="currentUser?.id == images.post?.user.id || currentUser?.roles[0] == 'ROLE_ADMIN'">
              <div class="btn dropdown-item" @click="editPost()"><font-awesome-icon icon="pencil-alt" /> 수정
              </div>
            </li>
            <li v-if="currentUser?.id == images.post?.user.id || currentUser?.roles[0] == 'ROLE_ADMIN'">
              <div class="btn dropdown-item" @click="deletePost()"><font-awesome-icon icon="trash" /> 삭제
              </div>
            </li>
            <li>
              <div class="btn dropdown-item text-danger"><font-awesome-icon icon="flag" /> 신고 </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row" style="margin: 0 auto;">
      <!-- photo viewer -->
      <div class="col">
        <splide :options="preoptions" @splide:move="onSplideMoved" id="photoSplide" ref="mainSplide">
          <splide-slide v-for="image in images.images" :key="image.index">
            <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${image.image})` }"
              @click="editing = false">
            </div>
          </splide-slide>
        </splide>
      </div>
    </div>
    <!-- info -->
    <div class="row" style="margin: 0 auto;">

      <!-- text -->
      <div id="textBox" class="" v-if="!editing">
        <div class="" style="max-height: 100px; min-height: 40px">{{ images.post?.text }}</div>
        <p style="font-size: 70%;" class="text-secondary">{{ images.post?.uploadedOn }}</p>

      </div>

      <!-- text editing box -->
      <div id="textBox" class="row md-3" style="padding-left: 5%;" v-if="editing">
        <textarea @input="inputHandler" maxlength="100" class="form-control" id="contentText" rows="12" v-model="text"
          style="resize: none;"></textarea>
        <p id="lengthText">{{ 100 - text.length }}/100</p>
        <div class="row justify-content-end" style="width:inherit">
          <div class="col-3">
            <button class="btn btn-outline-dark m-3" @click="editing = !editing">Cancel</button>
          </div>
          <div class="col-2">
            <button class="btn btn-outline-primary m-3" @click="editText">Submit</button>
          </div>
        </div>
      </div>

      <div id="replyViewer" v-if="!editing">
        <!-- 댓글이 있을 곳입니다. -->
        <perfect-scrollbar :options="{ suppressScrollX: true }">
          <PhotoReply :replyData="replyData"></PhotoReply>
        </perfect-scrollbar>

      </div>

      <!-- reaction zone -->
      <div id="reactionZone" v-if="!editing">

        <!-- heart -->
        <div id="heartBox" class="col align-self-end mt-2">
          <HeartButton :imagePost="this.images.post" @clickHeart="getHeart" /> <a>{{ heart.length }}</a>
        </div>

        <!-- reply chat -->
        <div class="input-group">
          <textarea class="form-control mt-1 ml-3" id="textArea" rows="1" placeholder="댓글을 입력하세요." style="resize: none;"
            v-model="chatText"></textarea>
          <span class="input-group-addon btn text-primary" @click="sendReply">게시</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { ref, watch } from "vue";
import { useStore } from 'vuex';

import PhotoService from "../../services/photo.service.js";

import usePhotoStore from '../../store/photo';

import HeartButton from "./HeartButton.vue";

import PhotoReply from "./PhotoReply.vue";

import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import { useToast } from "vue-toastification";

export default {
  name: "PhotoPost",
  components: {
    Splide,
    SplideSlide,
    HeartButton,
    PhotoReply,
    PerfectScrollbar,
  },
  props: {
    images: Object,
  },
  setup(props, context) {
    var preoptions = {
      rewind: true,
      height: 200,
      gap: '1rem',
      perMove: 1,
      perPage: 1,
      // pagination: true,
      postId: null,
      paginationDirection: 'ltr',
      // direction: 'ttb',
      // arrows: false,
      // paginationDirection: 'ltr',
    };

    const store = useStore();
    const currentUser = store.state.auth.user;
    const photoStore = usePhotoStore();

    var editing = ref(false);

    var text = ref("");

    const toast = useToast();


    const editPost = () => {
      editing.value = true;
      text.value = props.images.post?.text;
    }

    const editText = async () => {
      const frm = new FormData();
      frm.append("postId", props.images.post?.id);
      frm.append("text", text.value)

      await PhotoService.editPostText(frm).then((result) => {
        props.images.post.text = result.data.text;
      });

      editing.value = false;

      toast("수정되었습니다.", {
        type: 'warning', // success, error, default, info, warning
        position: 'top-right',
      })
    };


    const deletePost = () => {
      // toast(content, {
      //   closeButton: false,
      //   type: "warning",
      //   timeout: 50000
      // });

      if (confirm("삭제하시면 복구할수 없습니다.\n정말 삭제하시겠습니까??")) {
        const frm = new FormData();
        frm.append("postId", props.images.post?.id);

        // var photoIdList = [];
        // for (const photo in props.images.images) {
        //   photoIdList.push(props.images.images[photo].id);
        // }
        // frm.append("photoIdList", photoIdList);

        PhotoService.deletePost(frm).then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            result.data[i].image = "data:image/png;base64," + result.data[i].image
          }
          photoStore.setAllPhotos(result.data);
        });
        alert("성공적으로 삭제되었습니다.")
        history.go(0);

        toast("삭제되었습니다.", {
          type: 'error', // success, error, default, info, warning
          position: 'top-right',
        })


      } else {
        console.log("취소함");
      }
    }

    var currentIndex = ref(1);
    const mainSplide = ref(null);
    var heart = ref(0);

    const onSplideMoved = (splide) => {
      currentIndex.value = splide.index;
    }

    var replyData = ref(null);
    const chatText = ref(null);


    const openModal = () => {
      PhotoService.getReplyByPostId(props.images.post.id).then((result) => {
        replyData.value = result.data;
      })

      chatText.value = null;

      currentIndex.value = props.images.index;
      mainSplide.value.splide.Components.Controller.go(props.images.index);

    }

    const closeModal = () => {
      editing.value = false;

    };

    const getHeart = () => {
      PhotoService.getPostHearts(props.images.post.id).then((result) => {
        heart.value = result.data;
      })
    }

    const sendReply = () => {
      if (!chatText.value) {
        toast("내용을 입력해주세요", {
          type: "warning",
          position: "top-center",
          timeout: 1000,
        })
        return;
      }
      const frm = new FormData();
      frm.append("text", chatText.value);
      frm.append("userId", currentUser.id);
      frm.append("postId", props.images.post.id);

      PhotoService.uploadReply(frm).then((result) => {
        replyData.value = result.data;
      })

      chatText.value = null;
    }

    return {
      preoptions,
      currentUser,
      photoStore,

      // methods
      editPost,
      editText,
      openModal,
      closeModal,
      onSplideMoved,
      deletePost,
      sendReply,
      getHeart,

      // variables
      editing,
      text,
      currentIndex,
      mainSplide,
      chatText,
      heart,
      replyData,

    }
  },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap);

.imagePreviewWrapper {
  height: 200px;
  max-width: 600px;
  /* object-fit: cover; */
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  /* border: 1px solid gray; */
}


#userBox {
  font-family: "Black Han Sans";
  padding: 5px 0 0 5px;
}

#heartBox {
  font-family: "Balck Han Sans";
  font-weight: bold;
  color: red;
}

#reactionZone {
  position: relative;
  bottom: 0;
  padding: 0 3% 3% 0;
  border-top: 0.1rem solid whitesmoke;
  background-color: white;

}

.detailContainer {
  padding-top: 1%;
  width: 100%;
}

#lengthText {
  text-align: right;
  margin-top: -27px;
  margin-right: 10px;
  padding-right: 1%;
  color: gray;
}

#imageLength {
  text-align: right;
  margin-top: -5%;
  padding-right: 3%;
  color: gray;
  position: relative;
}

button {
  background: none;
  border: none;
  padding: 0;
  outline: inherit;
  cursor: pointer;
}

#replyViewer {
  padding-top: 1%;
  height: 100px;
}

#textBox {
  padding: 5px 10px 0 0;
  font-size: 90%;
  width: 150%;
  /* height: 200px; */
}

.ps {
  height: 100px;
}
</style>
