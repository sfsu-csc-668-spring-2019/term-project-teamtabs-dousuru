import { User } from "./User";

export class Message {
  id: number;
  owner: User;
  partitions: MessagePartition[];
  timeCreated: Date;
  timeUpdated: Date;
}

export class MessagePartition {
  id: number;
  index: number;
  type: string;
  associatedValue: string;
}
