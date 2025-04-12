import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  // New fields:
  @Column({ default: 'user' })
  role: string;        // "user" or "admin"

  @Column({ default: 'active' })
  status: string;      // "active" or "suspended"
}
