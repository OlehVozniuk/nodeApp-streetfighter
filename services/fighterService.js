import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighterById(id) {
    return fighterRepository.getOne({ id });
  }

  getFighterByName(name) {
    return fighterRepository.getOne({ name });
  }

  getFighter(search) {
    return fighterRepository.getOne(search);
  }

  createFighter(data) {
    return fighterRepository.create(data);
  }

  updateFighter(id, dataToUpdate) {
    return fighterRepository.update(id, dataToUpdate);
  }

  deleteFighter(id) {
    return fighterRepository.delete(id);
  }

  search(search) {
    const fighter = fighterRepository.getOne(search);
    if (!fighter) {
      return null;
    }
    return fighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
