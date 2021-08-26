import { CategoryService } from './category.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/user/user.role.enum';

@Controller('category')
export class CategoryController {
  constructor(private catagoryService: CategoryService) {}

  @Get()
  async getAllCategory(): Promise<any> {
    return this.catagoryService.getAllCategory();
  }

  @Post('/create')
  @Auth(Role.ADMIN)
  async createCategory(@Body() body): Promise<any> {
    return this.catagoryService.createCategory(body);
  }
}
