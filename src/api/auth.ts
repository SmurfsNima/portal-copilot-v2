import Api from "./api";
class Auth extends Api {
    static login (username: string, password : string) {
        const data = {
            username: username,
            password: password,
            scope: '',
            client_id: '',
            client_secret: ''
          };
          
          return this.post("/auth/token", data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
        }
      }

export default Auth