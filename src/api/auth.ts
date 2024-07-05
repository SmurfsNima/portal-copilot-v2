import Api from "./api";

class Auth extends Api {
    static login () {
        const response = this.post("/login",{})
        return response
    }
}

export default Auth