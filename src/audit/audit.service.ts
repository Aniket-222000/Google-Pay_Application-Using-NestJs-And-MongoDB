import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from './audit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditRepository: Repository<AuditLog>,
  ) {}

  async log(message: string): Promise<AuditLog> {
    const log = this.auditRepository.create({ message });
    return this.auditRepository.save(log);
  }

  async getLogs(query: any = {}): Promise<AuditLog[]> {
    return this.auditRepository.find();
  }
}
