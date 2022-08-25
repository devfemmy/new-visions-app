import baseAxios from "./api/baseAxios"

export default class HomePageService {
  static async homePage (){
    const res = await baseAxios.post('/homePage')
    return res?.data || res;
  }

  static async getStages (){
    const res = await baseAxios.post('/getStages')
    return res?.data || res;
  }

  static async getLevels (data){
    const res = await baseAxios.post('/getLevels', data)
    return res?.data || res;
  }

  static async getSubjects (data){
    const res = await baseAxios.post('/getSubjects', data)
    return res?.data || res;
  }

  static async getSubjectDetails (data){
    const res = await baseAxios.post('/getSubjectDetails', data)
    return res?.data || res;
  }

  static async getTeachers (data){
    const res = await baseAxios.post('/getTeachers', data)
    return res?.data || res;
  }

  static async getSubjectTeachers (data){
    const res = await baseAxios.post('/getSubjectTeachers', data)
    return res?.data || res;
  }

  static async getSubjectGroups (data){
    const res = await baseAxios.post('/getSubjectGroups', data)
    return res?.data || res;
  }

  static async getGroupDays (data){
    const res = await baseAxios.post('/getGroupDays', data)
    return res?.data || res;
  }

  static async postNotificationData (data){
    const res = await baseAxios.post('/updateNotificationsToken', data)
    return res?.data || res;
  }

  static async getNotificationData (data){
    const res = await baseAxios.post('/getNotifications', data)
    return res?.data || res;
  }
  
}