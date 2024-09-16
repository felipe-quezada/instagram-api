import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
  ) {}

  create(createTestDto: CreateTestDto): Promise<Test> {
    return this.testRepository.save(createTestDto);
  }

  findAll(): Promise<Test[]> {
    return this.testRepository.find();
  }

  findOne(id: number): Promise<Test> {
    return this.testRepository.findOneBy({ id });
  }

  update(id: number, updateTestDto: UpdateTestDto): Promise<UpdateResult> {
    return this.testRepository.update(id, updateTestDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.testRepository.delete({ id});
  }
}
