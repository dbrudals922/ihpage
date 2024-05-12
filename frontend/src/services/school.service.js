import axios from 'axios';

const API_URL3 = 'http://52.78.94.72:8080/api/info/';

class AuthService {
  getLunchList(userName) {
    return axios.get(API_URL3 + 'getLunchInfo', {
      params:{
        name: userName
      }
    });
  }

  getTimeSchedule(userName) {
    return axios.get(API_URL3 + 'getScheduleInfo', {
      params:{
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
