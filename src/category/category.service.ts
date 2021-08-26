import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(body): Promise<any> {
    const newCategory = new CategoryEntity();
    newCategory.name = body.name;
    newCategory.maxPeople = body.maxPeople;
    newCategory.price = body.price;
    newCategory.services = body.services;
    return this.categoryRepository.save(newCategory);
  }
}
