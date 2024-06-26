import axios from 'axios';

const API_URL = 'http://43.200.205.10:8080/api/auth/';
const API_URL3 = 'http://43.200.205.10:8080/api/info/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    console.log(user);
    return axios.post(API_URL + 'signup', {
      schoolName: user.schoolName,
      username: user.username,
      email: user.email,
      password: user.password,
      s_grade: user.s_grade,
      s_class: user.s_class,
      s_number: user.s_number,
      role: user.role,
    });
  }

  deleteUser(id) {
    return axios.post(API_URL + 'deleteUser/' + id);
  }

  please() {
    return axios.get(API_URL + 'aaaaa', {
    });
  };

  getLunchList(userName) {
    return axios.get(API_URL3 + 'getLunchInfo', {
      params: {
        name: userName
      }
    });
  }

  getTimeSchedule(userName) {
    return axios.get(API_URL3 + 'getScheduleInfo', {
      params: {
        name: userName
      }
    });
  }

  getSchoolInfo(location, schoolName) {
    return axios.get(API_URL3 + 'getSchoolInfo', {
      params: {
        loca: location,
        name: schoolName
      }
    });
  }

}

export default new AuthService();
