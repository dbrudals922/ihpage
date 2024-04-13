import axios from "axios";

const API_URL = 'https://port-0-ihbackend-85phb42bluxo83i2.sel5.cloudtype.app/api/club/';

class ClubService {
    async uploadClubPost(formData) {
        return axios.post(API_URL + 'uploadClubPost', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
    
      async uploadClubImage(formData) {
        return axios.post(API_URL + 'uploadClubImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
}


export default new ClubService();