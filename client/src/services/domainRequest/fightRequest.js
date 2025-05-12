import { post, get } from "../requestHelper";

const entity = "fights";

export const createFight = async (body) => {
  return await post(entity, body);
};

export const getAllFights = async () => {
  return await get(entity);
};

export const getFightById = async (id) => {
  return await get(entity, id);
};
