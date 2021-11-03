import { CreateCategoryDto, EditCategoryDto } from './category.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { deleteImages } from 'src/utils/DeleteImages';

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

  async findCategoryById(id: string): Promise<CategoryEntity> {
    return this.categoryRepository.findOneOrFail(id);
  }

  async createCategory(
    files: Array<Express.Multer.File>,
    body: CreateCategoryDto,
  ): Promise<CategoryEntity> {
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
    id: string,
  ): Promise<CategoryEntity> {
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
      const selectedCategory = await this.findCategoryById(id);
      deleteImages(selectedCategory);
      selectedCategory.name = name;
      selectedCategory.maxPeople = maxPeople;
      selectedCategory.price_per_hour = price_per_hour;
      selectedCategory.services = services;
      const filenames = files.map((file: Express.Multer.File) => file.filename);
      selectedCategory.images = filenames;
      return this.categoryRepository.save(selectedCategory);
    }
  }

  async deleteCategory(id: string): Promise<CategoryEntity> {
    const selectedCategory = await this.findCategoryById(id);
    deleteImages(selectedCategory);
    return this.categoryRepository.remove(selectedCategory);
  }

  async getCategoryByName(name: string): Promise<CategoryEntity> {
    return this.categoryRepository.findOne({ where: { name } });
  }
}
