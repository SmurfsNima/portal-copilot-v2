/* eslint-disable @typescript-eslint/no-explicit-any */
interface Information {
    userName:string
    email:string
}

class User {

    constructor(public information?:Information){}

    private syncToLocalStorage () {
        localStorage.setItem('authUser',JSON.stringify(this))
    }

} 
export default User