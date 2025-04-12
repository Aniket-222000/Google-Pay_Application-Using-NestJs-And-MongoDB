import { Entity, ObjectIdColumn, Column, ObjectId, CreateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;

  @Column()
  type: string; // 'topup', 'withdraw', 'transfer'

  @Column()
  amount: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
