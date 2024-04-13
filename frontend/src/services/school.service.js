import axios from 'axios';

const API_URL3 = 'https://port-0-backend-85phb42bluxo83i2.sel5.cloudtype.app/api/info/';

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
