import { Entity, ObjectIdColumn, Column, ObjectId, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
