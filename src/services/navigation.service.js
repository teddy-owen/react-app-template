
class Navigation{
    static paths = {
        root:"/",
        auth:"/auth",
        login:"/auth/login",
        register:"/auth/register",
        forgotPassword:"/auth/forgot-password",
        quizzes:"/quizzes",
        quizDetail:"/quizzes/:id",
        qaDetail:"/quizzes/:id/qa/:qaid",
        qaAdd:"/quizzes/:id/qa/add",
        manageAccount:"/manage-account",
    };

    static generateQuizDetailPath(id){
        return `/quizzes/${id}`;
    }
    
    static generateQaAddPath(quizId){
        return `/quizzes/${quizId}/qa/add`;
    }

    static generateQaDetailPath(quizId,qaId){
        return `/quizzes/${quizId}/qa/${qaId}`;
    }

}

export default Navigation;