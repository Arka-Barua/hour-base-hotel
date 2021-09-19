import { CategoryService } from './category.service';
import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/user/user.role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private catagoryService: CategoryService) {}

  @Get()
  async getAllCategory(): Promise<any> {
    return this.catagoryService.getAllCategory();
  }

  @Post('/create')
  @Auth(Role.ADMIN)
  @UseInterceptors(FilesInterceptor('photos'))
  async createCategory(@UploadedFiles() files, @Body() body): Promise<any> {
    return this.catagoryService.createCategory(files, body);
  }

  // @Post('t')
  // @UseInterceptors(FilesInterceptor('photos'))
  // uploadFile(@UploadedFiles() files, @Body() body: any) {
  //   const rebody = body;
  //   const filenames = files.map(
  //     (file: Express.Multer.File) => file.originalname,
  //   );
  //   rebody.files = filenames;
  //   return body;
  // }
}
