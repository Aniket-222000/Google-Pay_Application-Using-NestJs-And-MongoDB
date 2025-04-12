// src/wallet/wallet.entity.ts
import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity('wallets')
export class Wallet {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;  // References the user's id

  @Column({ default: 0 })
  balance: number;
}
