export enum Type {
  CLASSIC = "CLASSIC",
  SERVER_SIDE = "SERVER_SIDE",
  MVT = "MVT",
}

export enum Status {
  DRAFT = "DRAFT",
  ONLINE = "ONLINE",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export interface Site {
  id: number;
  url: string;
}

export interface Test {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: number;
}

export enum StatusColors {
  ONLINE = "#1BDA9D",
  PAUSED = "#FF8346",
  STOPPED = "#FE4848",
  DRAFT = "#5C5C5C",
}

export enum FormattedTypes {
  CLASSIC = "Classic",
  SERVER_SIDE = "Server-side",
  MVT = "MVT",
}
