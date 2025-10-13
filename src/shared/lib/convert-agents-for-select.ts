import { Agent } from '../services/dto/agent.dto';
import { shortName } from './short-name';

export const convertAgentsForSelect = (agents: Agent[]) => {
  return agents.map((agent) => {
    return { id: agent.id, label: shortName(agent), name: shortName(agent) };
  });
};
