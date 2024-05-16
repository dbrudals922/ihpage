<template>
  <div class="container">
    <table style="margin-left: auto; margin-right: auto;">
      <thead>
        <th v-for="item in header">{{ item }}</th>
      </thead>
      <tbody>
        <tr v-for="line in time">
          <td v-for="item in line">{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import SchoolService from '../services/school.service';
import { useStore } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      header: ["", "월", "화", "수", "목", "금"],
      time: [["1"], ["2"], ["3"], ["4"], ["5"], ["6"], ["7"]]
    }
  },
  mounted() {
    this.timeSchedule();
  },
  methods: {
    timeSchedule() {
      let index = 0;
      let i = 0;
      let j = 0

      const store = useStore();
      const currentUser = store.state.auth.user;

      SchoolService.getTimeSchedule(currentUser.username).then(
        (res) => {
          // console.log(res.data);

          let a = new Array();
          a = res.data;

          for (i = 0; i < a[0].length; i++) {
            for (j = 0; j < a[0][i]; j++) {
              this.time[j].push(a[1][index]);
              index += 1;
            };
            if (j < 7) {
              for (j; j < 7; j++) {
                this.time[j].push("");
              }
            }
          }
        }
      )
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
  height: 50px !important;
  width: 10%;
  border-bottom: 2px solid darkgray;
}

table thead {
  height: 50px !important;
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
  color: black;
}

tbody {
  font-family: "MapleStory";
  font-weight: normal;
  font-size: large;
}

th:first-child,
td:first-child {
  border-right: 1px solid black;
  width: 5%;
}

table tr:nth-of-type(even) {
  background-color: rgba(111, 124, 121, 0.132);
}

@media (max-width: 767.98px) {
  .container {
    height: 500px;
    padding-top: 50px;
  }

  table {
    width: 100%;
    height: 430px;
  }

  table th {
    height: 12px !important;
    width: 10%;
  }

  table thead {
    height: 12px !important;
    width: 10%;
  }

  table tbody {
    height: 12px !important;
  }

  table tr {
    height: 12px !important;
  }

  table td {
    padding: 8px 6px 8px 6px;
    height: 12px !important;
    width: 11%;
    font-size: 70%;
  }

  thead {
    font-size: small;
  }

  tbody {
    font-size: small;
  }

}
</style>