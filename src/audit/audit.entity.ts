// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuditLog } from './audit.entity';
// import { AuditService } from './audit.service';

// @Module({
//   imports: [TypeOrmModule.forFeature([AuditLog])],
//   providers: [AuditService],
//   exports: [AuditService],
// })
// export class AuditModule {}
// // export { AuditLog };

// src/audit/audit.entity.ts
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
