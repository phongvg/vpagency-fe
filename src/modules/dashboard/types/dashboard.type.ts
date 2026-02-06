export type UserStatistic = {
  total: number;
  byStatus: ByStatus;
  byRole: ByRole[];
};

export type ByRole = {
  _count: number;
  roles: string[];
};

export type ByStatus = {
  active: number;
  inactive: number;
  onboarding: number;
};

export type TaskStatistic = {
  onGoing: number;
  finished: number;
  delayed: number;
  total: number;
  series: Series[];
  range: string[];
};

export interface Series {
  name: string;
  data: number[];
}
