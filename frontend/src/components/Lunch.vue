<template>
  <div class="container d-flex justify-content-center">
    <table>
      <thead>
        <tr>
          <th>요일</th>
          <th>메뉴</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in header">
          <td>{{ item }}</td>
          <td>{{ menu[index] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import axios from 'axios';
import AuthService from "../services/auth.service";
import { useStore } from 'vuex';

export default {
  name: "Home",
  components: {
    AuthService
  },
  data() {
    return {
      content: [[]],
      header: ["월", "화", "수", "목", "금"],
      menu: [],
    };
  },
  mounted() {
    this.LunchList();
  },
  methods: {
    LunchList() {
      let i = 0;

      const store = useStore();
      const currentUser = store.state.auth.user;

      AuthService.getLunchList(currentUser.username).then(
        (response) => {
          this.content = response.data;

          for (i = 0; i < this.content.length; i++) {
            this.menu.push(this.content[i][1]);
          }
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
    }
  }
}
</script>

<style scoped>
.container {
  height: 600px;
}

table {
  width: 100%;
  height: 100%;
  text-align: center;
}

table th {
  height: 25px !important;
  width: 10%;
  border-bottom: 2px solid darkgray;
}

table thead {
  height: 25px !important;
  width: 10%;
}

table tbody {
  height: 50px !important;
}

table tr {
  height: 50px !important;
}

table td {
  padding: 12px;
  height: 50px !important;
  width: 10%;
}


@font-face {
  font-family: "Maplestory";
  src: url("../fonts/MaplestoryBold.ttf") format('opentype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "Maplestory";
  src: url("../fonts/MaplestoryLight.ttf") format('opentype');
  font-weight: normal;
  font-style: normal;
}

thead {
  font-family: "Maplestory";
  font-weight: bold;
  font-size: x-large;
  background-color: rgba(111, 124, 121, 0.3);
  color: black
}

tbody {
  font-family: "MapleStory";
  font-weight: normal;
  font-size: large;
}

table tr:nth-of-type(even) {
  background-color: rgba(111, 124, 121, 0.132);
}

th:first-child,
td:first-child {
  border-right: 1px solid black;
  width: 1%;
}

@media (max-width: 767.98px) {
  .container {
    height: 500px;
    padding-top: 50px;
  }

  table {
    width: 100%;
    height: 100%;
  }

  table th {
    height: 10px !important;
    width: 10%;
  }

  table thead {
    height: 10px !important;
    width: 10%;
  }

  table tbody {
    height: 10px !important;
  }

  table tr {
    height: 10px !important;
  }

  table td {
    padding: 6px;
    height: 12px !important;
    width: 11%;

  }

  thead {
    font-size: small;
  }

  tbody {
    font-size: small;
  }

}
</style>
