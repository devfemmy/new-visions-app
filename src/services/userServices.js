import baseAxios from './api/baseAxios'

export default class HomePageService {
    static async homePage() {
        const res = await baseAxios.post('/homePage')
        return res?.data || res
    }

    static async getStages() {
        const res = await baseAxios.post('/getStages')
        return res?.data || res
    }

    static async getLevels(data) {
        const res = await baseAxios.post('/getLevels', data)
        return res?.data || res
    }

    static async getSubjects(data) {
        const res = await baseAxios.post('/getSubjects', data)
        return res?.data || res
    }

    static async deleteUser(data) {
        const res = await baseAxios.post('/changeUserStatus', data)
        return res?.data || res
    }

    static async getSubjectDetails(data) {
        const res = await baseAxios.post('/getSubjectDetails', data)
        return res?.data || res
    }

    static async getTeachers(data) {
        const res = await baseAxios.post('/getTeachers', data)
        return res?.data || res
    }

    static async getSubjectTeachers(data) {
        const res = await baseAxios.post('/getSubjectTeachers', data)
        return res?.data || res
    }

    static async getSubjectGroups(data) {
        const res = await baseAxios.post('/getSubjectGroups', data)
        return res?.data || res
    }

    static async getGroupDays(data) {
        const res = await baseAxios.post('/getGroupDays', data)
        return res?.data || res
    }

    static async getSubjectChaptersAndLessons(data) {
        const res = await baseAxios.post('/getSubjectChaptersAndLessons', data)
        return res?.data || res
    }

    static async getTeacherFreeDays(data) {
        const res = await baseAxios.post('/getTeacherFreeDays', data)
        return res?.data || res
    }

    static async postNotificationData(data) {
        const res = await baseAxios.post('/updateNotificationsToken', data)
        return res?.data || res
    }

    static async getNotificationData(data) {
        const res = await baseAxios.post('/getNotifications', data)
        return res?.data || res
    }

    static async getCalendar(data) {
        const res = await baseAxios.post('/getCalendar', data)
        return res?.data || res
    }

    static async checkLive(data) {
        const res = await baseAxios.post('/checkLive', data)
        return res?.data || res
    }

    static async joinLive(data) {
        const res = await baseAxios.post('/joinLive', data)
        return res?.data || res
    }

    static async startLessonQuiz(data) {
        const res = await baseAxios.post('/startLessonQuiz', data)
        return res?.data || res
    }

    static async submitLessonQuiz(data) {
        const res = await baseAxios.post('/submitLessonQuiz', data)
        return res?.data || res
    }

    static async getConversations(data) {
        const res = await baseAxios.post('/getMessages', data)
        return res?.data || res
    }

    static async sendMessage(data) {
        const res = await baseAxios.post('/sendMessage', data)
        return res?.data || res
    }

    static async getMessageById(data) {
        const res = await baseAxios.post(
            '/getConversationMessages?page=1',
            data
        )
        return res?.data || res
    }

    static async getTeacherProfile(data) {
        const res = await baseAxios.post('/getTeacherProfile', data)
        return res?.data || res
    }

    static async getAboutUs(data) {
        const res = await baseAxios.get('about_us', data)
        return res?.data || res
    }
}
