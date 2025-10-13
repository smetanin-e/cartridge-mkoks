import { AuthUser } from '../services/dto/agent.dto';

export const shortName = (user: AuthUser) => {
  return `${user.surname} ${user.firstName[0]}.${user.lastName[0]}.`;
};
