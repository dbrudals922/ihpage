<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <a class="btn" @click="deleteAccount()"> 계정 삭제 </a>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default {
  name: "User",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        this.content = response.data;
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
  methods: {
    deleteAccount() {
      if (confirm("정말 삭제하시겠습니까?\n삭제하시면 다시 복구할 수 없습니다.")) {
        AuthService.deleteUser(this.currentUser.id).then(
          (response) => {
            console.log(response);
            alert("삭제가 완료되었습니다.\n다음에 또 만나요~");
            this.$store.dispatch('auth/logout');
            this.$router.push("/");

          },
          (error) => {
            console.log(error);
          }
        )
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  }

};
</script>
<style>
body {
  padding-top: 5rem;
}
</style>