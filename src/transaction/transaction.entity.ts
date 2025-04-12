import { Entity, ObjectIdColumn, Column, ObjectId, CreateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;

  @Column()
  type: string;  // e.g., topup, withdraw, transfer

  @Column()
  amount: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  flagged: boolean;  // for admin flagging

  @CreateDateColumn()
  createdAt: Date;
}
