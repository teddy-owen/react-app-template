class URLService{
    // change host based on dev vs prod
    static host = process.env.NODE_ENV === 'production' ? "https://example.dev":"https://dsfjh5451454.ngrok.io";

    static usersBase ="users";
    static quizzesBase ="quizzes";
    static questionsBase ="questions";
    static authBase ="authentication";

    static users = () => `${URLService.host}/${URLService.usersBase}`;
    static user = (firebaseId) => `${URLService.host}/${URLService.usersBase}/${firebaseId}`;

    static quizzes = (firebaseId) => `${URLService.host}/${URLService.usersBase}/${firebaseId}/${URLService.quizzesBase}`;
    static quiz = (firebaseId,quizId) => `${URLService.host}/${URLService.usersBase}/${firebaseId}/${URLService.quizzesBase}/${quizId}`;

    static questions = (firebaseId,quizId) => `${URLService.host}/${URLService.usersBase}/${firebaseId}/${URLService.quizzesBase}/${quizId}/${URLService.questionsBase}`;
    static question = (firebaseId,quizId,questionId) => `${URLService.host}/${URLService.usersBase}/${firebaseId}/${URLService.quizzesBase}/${quizId}/${URLService.questionsBase}/${questionId}`;
    
    static login = () => `${URLService.host}/${URLService.authBase}/login`;
    static forgotPassword = () => `${URLService.host}/${URLService.authBase}/forgot-password`;
    static logout= () => `${URLService.host}/${URLService.authBase}/logout`;
    static changePassword = () => `${URLService.host}/${URLService.authBase}/change-password`;
    static refreshToken= () => `${URLService.host}/${URLService.authBase}/refresh-token`;


    static cocktails = () =>`http://my-json-server.typicode.com/teddy-owen/json-placeholder/posts`;
    
    
}

export default URLService;

