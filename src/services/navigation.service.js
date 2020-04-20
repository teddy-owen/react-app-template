import queryString from 'query-string';

class Navigation{
    
    static getURLParam(props=null,key=""){
        console.assert(props.match != null, "Must ensure component wrapped in 'withRouter' to allow URL access.");
        return props.match.params[key];
    }

    static getQueryObject(props=null){
        console.assert(props.location != null, "Must ensure component wrapped in 'withRouter' to allow URL access.");
        let parsedQueryString = queryString.parse(props.location.search);
        return parsedQueryString;
    }

    static getQueryParam(props=null,key=""){
        console.assert(props.location != null, "Must ensure component wrapped in 'withRouter' to allow URL access.");
        let parsedQueryString = Navigation.getQueryObject(props);
        return parsedQueryString[key];
    }

    static setQueryParams(props=null,queryObject=null){
        console.assert(props.history != null, "Must ensure component wrapped in 'withRouter' to allow URL access.");
        props.history.push({
            search:queryString.stringify(queryObject),
        });
        return;
    }
    
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
