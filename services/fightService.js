import { fightRepository } from "../repositories/fightRepository.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

class FightersService {
  async createFight(fighter1Id, fighter2Id) {
    const fighter1 = await fighterRepository.getOne({ id: fighter1Id });
    const fighter2 = await fighterRepository.getOne({ id: fighter2Id });

    if (!fighter1 || !fighter2) {
      throw new Error("Один або обидва бійці не знайдені");
    }

    let fighter1Health = fighter1.health || 100;
    let fighter2Health = fighter2.health || 100;

    const log = [];
    const MAX_ROUNDS = 100;
    let rounds = 0;

    while (fighter1Health > 0 && fighter2Health > 0 && rounds < MAX_ROUNDS) {
      rounds++;

      const fighter1Shot = this.getRandomDamage(fighter1.power || 20);
      const fighter2Shot = this.getRandomDamage(fighter2.power || 20);

      fighter2Health -= fighter1Shot;
      fighter1Health -= fighter2Shot;

      log.push({
        round: rounds,
        fighter1Shot,
        fighter2Shot,
        fighter1Health: Math.max(fighter1Health, 0),
        fighter2Health: Math.max(fighter2Health, 0),
      });
    }

    const winner = fighter1Health > 0 ? fighter1.id : fighter2.id;

    const fight = {
      id: `${fighter1.id}-${fighter2.id}-${Date.now()}`,
      fighter1: fighter1.id,
      fighter2: fighter2.id,
      winner,
      log,
    };

    return await fightRepository.create(fight);
  }

  async getAllFights() {
    return fightRepository.getAll();
  }

  async getFightById(id) {
    return fightRepository.getOne({ id });
  }

  getRandomDamage(power) {
    const damage = Math.floor(Math.random() * (power / 2)) + 1;
    return damage;
  }
}

const fightersService = new FightersService();

export { fightersService };
