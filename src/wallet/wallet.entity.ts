import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity('wallets')
export class Wallet {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;  // Reference to user's id (as string)

  @Column({ default: 0 })
  balance: number;
}
