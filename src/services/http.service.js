import URLService from "services/url.service.js";
import JWT from "services/jwt.service.js";

class HTTPService{
    static async _httpGET(url){
        // Check if token expired, and refresh if so
        await HTTPService.checkAndRefreshToken();
        
        let headers = new Headers({
            "Authorization":`token ${JWT.getTokenFromStorage()}`,
            "content-type":"application/json", 
            'Accept': 'application/json',
        });

        let response = await fetch(url,{
            method: 'GET',
            headers: headers,
          });
        
        if(response.ok){
            let responseJson = await response.json();
            return responseJson;
        }else if(response.status === 401 || response.status === 403){
            // Redirect to Login
            throw response;
        }else{
            throw response;
        }

    }

    static async _httpPOST(url,json,checkToken=true,logoutOn401=true){
        // Check if token expired, and refresh if so
        if(checkToken){
            await HTTPService.checkAndRefreshToken();
        }
    
        let headers = new Headers({
            "Authorization":`token ${JWT.getTokenFromStorage()}`,
            "content-type":"application/json", 
            'Accept': 'application/json',
        });

        let response = await fetch(url,{
            method: 'POST',
            headers: headers,
            body:JSON.stringify(json),
          });
        
        if(response.ok){
            try {                
                let responseJson = await response.json();
                return responseJson;
            } catch (error) {
                return;
            }
        }else if((response.status === 401 || response.status === 403) && logoutOn401){
            // Redirect to Login
            throw response;
        }else{
            throw response;
        }

    }

    static async _httpPUT(url,json,checkToken=true,logoutOn401=true){
        // Check if token expired, and refresh if so
        if(checkToken){
            await HTTPService.checkAndRefreshToken();
        }
    
        let headers = new Headers({
            "Authorization":`token ${JWT.getTokenFromStorage()}`,
            "content-type":"application/json", 
            'Accept': 'application/json',
        });

        let response = await fetch(url,{
            method: 'PUT',
            headers: headers,
            body:JSON.stringify(json),
          });
        
        if(response.ok){
            try {                
                let responseJson = await response.json();
                return responseJson;
            } catch (error) {
                return;
            }
        }else if((response.status === 401 || response.status === 403) && logoutOn401){
            // Redirect to Login
            throw response;
        }else{
            throw response;
        }

    }
    
    static async _httpDELETE(url){
        // Check if token expired, and refresh if so
        await HTTPService.checkAndRefreshToken();
        
        let headers = new Headers({
            "Authorization":`token ${JWT.getTokenFromStorage()}`,
            'Accept': 'application/json',
        });

        let response = await fetch(url,{
            method: 'DELETE',
            headers: headers,
          });
        
        if(response.ok){
            try {                
                let responseJson = await response.json();
                return responseJson;
            } catch (error) {
                return;
            }
        }else if(response.status === 401 || response.status === 403){
            // Redirect to Login
            throw response;
        }else{
            throw response;
        }

    }

    static async getQuizzes() {
        let response = await HTTPService._httpGET(URLService.quizzes(JWT.getUserID()));
        return response;
      }

    static async getQuiz(quizId) {
        let response = await HTTPService._httpGET(URLService.quiz(JWT.getUserID(),quizId));
        return response;
      }
    
    static async getQuestion(quizId, qaId) {
        let response = await HTTPService._httpGET(URLService.question(JWT.getUserID(), quizId, qaId));
        return response;
    }
    
    static async newQuiz(name) {
        let response = await HTTPService._httpPOST(URLService.quizzes(JWT.getUserID()),{name});
        return response;
    } 

    static async editQuiz(quizId,name) {
        let response = await HTTPService._httpPUT(URLService.quiz(JWT.getUserID(),quizId),{name});
        return response;
    } 

    static async deleteQuiz(quizId) {
        let response = await HTTPService._httpDELETE(URLService.quiz(JWT.getUserID(),quizId));
        return response;
    } 

    static async newQuestion(quizId,question,answer) {
        let response = await HTTPService._httpPOST(URLService.questions(JWT.getUserID(),quizId),{question,answer});
        return response;
    } 

    static async editQuestion(quizId,qaId,question,answer) {
        let response = await HTTPService._httpPUT(URLService.question(JWT.getUserID(),quizId,qaId),{question,answer});
        return response;
    } 
  
    static async deleteQuestion(quizId,qaId) {
        let response = await HTTPService._httpDELETE(URLService.question(JWT.getUserID(),quizId,qaId));
        return response;
    } 


    // Auth
    static async login(email, password){
        let response = await HTTPService._httpPOST(URLService.login(),{email:email,password:password},false,false);
        return response;
    }

    static async logout(){
        let response = await HTTPService._httpPOST(URLService.logout(),{});
        return response;
    }

    static async register(email, password){
        let response = await HTTPService._httpPOST(URLService.users(),{email:email,password:password},false,false);
        return response;
    }

    static async forgotPassword(email){
        let response = await HTTPService._httpPOST(URLService.forgotPassword(),{email:email},false,false);
        return response;
    }

    static async changePassword(password){
        let response = await HTTPService._httpPUT(URLService.changePassword(),{"new_password":password});
        return response;
    }

    static async updateEmail(email){
        let response = await HTTPService._httpPUT(URLService.user(JWT.getUserID()),{email});
        return response;
    }

    static async deleteUser(){
        let response = await HTTPService._httpDELETE(URLService.user(JWT.getUserID()));
        return response;
    }


    static async checkAndRefreshToken(){
        if(JWT.isTokenExpired()){
          console.log("token expired, refreshing");
          try {
              let responseJson = await HTTPService._httpPOST(URLService.refreshToken(),{},false,false);
              JWT.storeToken(responseJson["token"]);
          } catch (error) {
                console.error(error);  
                // TODO: navigate to login
                // NavigationService.toLoginRoute();
          }
        }
        return;
    }


    static async getCocktails() {
        let response = await HTTPService._httpGET(URLService.cocktails());
        return response;
    }
    
}

export default HTTPService;