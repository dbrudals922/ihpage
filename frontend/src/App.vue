<template>
  <div id="app">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"> -->

    <!-- nav bar -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
      <a class="text-dark navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav mr-auto">

          <li class="nav-item">
            <a class="text-dark nav-link" href="/">
              Home
            </a>
          </li>

          <li class="nav-item" v-if="currentUser">
            <a class="text-dark nav-link" href="#page2">
              학교
            </a>
          </li>
          <li class="nav-item" v-if="currentUser">
            <a class="text-dark nav-link" href="#page3">
              Photo
            </a>
          </li>
          <li class="nav-item" v-if="currentUser">
            <a class="text-dark nav-link" href="#page4">
              동아리
            </a>
          </li>
          <li class="nav-item" v-if="currentUser">
            <a class="text-dark nav-link" href="#page5">
              중고
            </a>
          </li>
          <li class="nav-item">
            <a class="text-dark nav-link" href="#page6" @click="Please()">
              문의
            </a>
          </li>

          <li class="nav-item" v-if="!currentUser">
            <a class="text-dark nav-link" data-bs-toggle="modal" data-bs-target="#schoolSearchModal">회원가입</a>
          </li>
          <li class="nav-item" v-if="!currentUser">
            <a class="text-dark nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">로그인</a>
          </li>

          <li class="nav-item" v-if="currentUser">
            <router-link to="/user" class="nav-link text-dark">
              <font-awesome-icon icon="user" />
              {{ currentUser.username }}
            </router-link>
          </li>

          <li class="nav-item" v-if="currentUser">
            <a class="nav-link text-dark" @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" /> LogOut
            </a>
          </li>
        </div>
      </div>
    </nav>
  </div>

  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import 'vue-fullpage.js/dist/style.css'
import VueFullPage from 'vue-fullpage.js'
import AuthService from './services/auth.service.js'
import axios from 'axios';

import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

import { usePhotoStore } from "./store/photo.js";
import PhotoService from "./services/photo.service.js";


export default {
  name: 'app',
  components: {
    VueFullPage,
    axios,
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  async created() {
    const photoStore = usePhotoStore();

    if (photoStore.getAllPhotos.length <= 0) {
      await PhotoService.getAllPhoto().then((result) => {
        for (var i = 0; i < result.data.length; i++) {
          result.data[i].image = "data:image/png;base64," + result.data[i].image
        }
        photoStore.setAllPhotos(result.data);
      })
    }
  },
  methods: {
    changePopState() {
      this.popState = !this.popState;
    },

    toggleNavigation() {
      this.options.navigation = !this.options.navigation
    },

    toggleScrollbar() {
      console.log('Changing scrollbar...')
      this.options.scrollBar = !this.options.scrollBar
    },
    Please() {
      AuthService.getLunchList().then(
        (response) => {
          this.content = response.data;
          console.log(this.content);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      // this.$router.push('/login');
      this.changePopState();
    },

  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentPage() {

    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_TEACHER');
      }

      return false;
    }
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap);

.navbar {
  border-bottom: 2px solid rgb(0, 0, 0);
  background-color: white;
}


#menu {
  border-bottom: 2px solid rgb(0, 0, 0);
  background-color: white;
  position: fixed;
  top: 0;
  height: 7%;
  padding-left: 30px;
}

#menu a {
  padding: 0.8em;
  font-size: large;
}

div #app {
  font-family: 'Do Hyeon', sans-serif;
  font-size: 100%;
}

p {
  margin: auto;
}

/* toast */
.toastCustomStyle {
  width: fit-content;
}

@media (max-width: 767.98px) {
  .nav-item a {
    margin-left: 20px;
  }
}
</style>