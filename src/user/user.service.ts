import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  

  async findById(userId: string): Promise<User> {
    // Convert string to ObjectId for accurate querying
    const objectId = new ObjectId(userId);
    const user = await this.userRepository.findOne({ where: { _id: objectId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(userId: string, updateData: Partial<User>): Promise<User> {
    // Here, repository.update accepts a string ID for update; then findById converts it as needed.
    await this.userRepository.update(userId, updateData);
    return this.findById(userId);
  }

  // Get all users (optionally, implement filtering based on query)
  async findAll(query: any = {}): Promise<User[]> {
    return this.userRepository.find();
  }
  
  async countUsers(): Promise<number> {
    return this.userRepository.count();
  }
}
