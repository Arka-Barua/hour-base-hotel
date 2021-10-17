import { CreateCategoryDto, EditCategoryDto } from './category.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import * as fs from 'fs';

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
      console.log(files);

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

  async editCategory(
    files: Array<Express.Multer.File>,
    body: EditCategoryDto,
    params,
  ): Promise<any> {
    const { name, maxPeople, price_per_hour, services } = body;
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
      const selectedCategory = await this.categoryRepository.findOneOrFail({
        id: params.id,
      });

      selectedCategory.images.forEach((img) => {
        const imgpath = `upload\\categoryphoto\\${img}`;
        fs.unlink(imgpath, (err) => {
          if (err) return err;
          console.log(err);
        });
      });

      selectedCategory.name = name;
      selectedCategory.maxPeople = maxPeople;
      selectedCategory.price_per_hour = price_per_hour;
      selectedCategory.services = services;
      const filenames = files.map((file: Express.Multer.File) => file.filename);
      selectedCategory.images = filenames;
      return this.categoryRepository.save(selectedCategory);
    }
  }
}
