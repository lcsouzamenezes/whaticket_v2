import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  BelongsToMany,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";

import { User, UserQueue, Whatsapp, WhatsappQueue } from "./index";

@Table
class Queue extends Model<Queue> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @AllowNull(false)
  @Unique
  @Column
  color: string;

  @Column
  greetingMessage: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsToMany(() => Whatsapp, () => WhatsappQueue)
  whatsapps: Array<Whatsapp & { WhatsappQueue: WhatsappQueue }>;

  @BelongsToMany(() => User, () => UserQueue)
  users: Array<User & { UserQueue: UserQueue }>;
}

export default Queue;
