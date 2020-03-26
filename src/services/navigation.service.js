
class Navigation{
    static paths = {
        root:"/",
        auth:"/auth",
        login:"/auth/login",
        register:"/auth/register",
        forgotPassword:"/auth/forgot-password",
        app:"/app",
        quizzes:"/app/quizzes",
        quizDetail:"/app/quizzes/:id",
        qaDetail:"/app/quizzes/:id/qa/:qaid",
        qaAdd:"/app/quizzes/:id/qa/add",
        manageAccount:"/app/manage-account",
    };

    static generateQuizDetailPath(id){
        return `/app/quizzes/${id}`;
    }
    
    static generateQaAddPath(quizId){
        return `/app/quizzes/${quizId}/qa/add`;
    }

    static generateQaDetailPath(quizId,qaId){
        return `/app/quizzes/${quizId}/qa/${qaId}`;
    }

}

export default Navigation;