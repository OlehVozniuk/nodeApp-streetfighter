import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  getAllUsers() {
    return userRepository.getAll();
  }
  getUserById(id) {
    return userRepository.getOne({ id });
  }
  getUser(search) {
    return userRepository.getOne(search);
  }

  createUser(data) {
    return userRepository.create(data);
  }
  updateUser(id, dataToUpdate) {
    return userRepository.update(id, dataToUpdate);
  }
  deleteUser(id) {
    return userRepository.delete(id);
  }
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
