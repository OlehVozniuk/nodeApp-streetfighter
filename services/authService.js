import { userService } from "./userService.js";

class AuthService {
  login({ email, password }) {
    const user = userService.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

const authService = new AuthService();

export { authService };
