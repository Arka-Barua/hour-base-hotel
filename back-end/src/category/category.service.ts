import { CreateCategoryDto } from './category.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategory(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({
      select: [
        'id',
        'maxPeople',
        'images',
        'name',
        'price_per_hour',
        'services',
      ],
    });
  }

  async createCategory(
    files: Array<Express.Multer.File>,
    body: CreateCategoryDto,
  ): Promise<any> {
    if (files && files.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Images is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (files && files.length !== 3) {
      console.log(files);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'At least three images is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const newCategory = new CategoryEntity();
      newCategory.name = body.name;
      newCategory.maxPeople = body.maxPeople;
      newCategory.price_per_hour = body.price_per_hour;
      newCategory.services = body.services;
      const filenames = files.map((file: Express.Multer.File) => file.filename);
      newCategory.images = filenames;
      return this.categoryRepository.save(newCategory);
    }
  }
}
