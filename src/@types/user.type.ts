export type AuthUser = {
  id: number;
  login: string;
  role: string;
  surname: string;
  firstName: string;
  lastName: string;
};

export type Roles = {
  name: string;
  label: string;
  id: number;
};
