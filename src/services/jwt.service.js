
class JWT{
    
    static jwtKey = "jwt";
  
    static getTokenFromStorage() {
        localStorage.getItem(JWT.jwtKey);
        return localStorage.getItem(JWT.jwtKey);
    }
    
    static getDecodedToken() {
      let token = JWT.getTokenFromStorage();
      let decodedToken = JWT.parseJwt(token);
      return decodedToken;
    }
  
    static storeToken(token) {
        localStorage.setItem(JWT.jwtKey,token);
        return;
    }

    static clearToken() {
      localStorage.removeItem(JWT.jwtKey);
      return;
    }
  
    static isTokenExpired(){
        let expSeconds = JWT.getExp();
        let nowDate = new Date();
        let nowMilliseconds = nowDate.getTime();
        let nowSeconds = nowMilliseconds/1000;
        return nowSeconds >= expSeconds;
    }

    static getUserID(){
      let decodedToken = JWT.getDecodedToken();
      return decodedToken["user_id"];
    }

    static getEmail(){
        let decodedToken = JWT.getDecodedToken();
        return decodedToken["email"];
    }

    static getEmailVerified(){
        let decodedToken = JWT.getDecodedToken();
        return decodedToken["email_verified"];
    }

    static getExp(){
        let decodedToken = JWT.getDecodedToken();
        return decodedToken["exp"];
    }
  

    static parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };
  
  
  }
  
export default JWT;