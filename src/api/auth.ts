import Api from "./api";
interface AuthResponse {
  data: {
    access_token: string;
  };
}
// const mockUser = {
//   username: "codie",
//   password: "codie#123",
//   accessToken: "mockAccessToken123"
// };
class Auth extends Api {
  static login(username: string, password: string): Promise<AuthResponse> {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (username === mockUser.username && password === mockUser.password) {
    //       resolve({ data: { access_token: mockUser.accessToken } });
    //     } else {
    //       reject(new Error("Invalid credentials"));
    //     }
    //   }, 500);
    // });
    const data = {
      username: username,
      password: password,
      scope: "",
      client_id: "",
      client_secret: "",
    };

    return this.post("/auth/token", data);
  }
}

export default Auth;
