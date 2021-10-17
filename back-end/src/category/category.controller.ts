import { CreateCategoryDto, EditCategoryDto } from './category.dto';
import { CustomImageFileName, imageFileFilter } from './../utils/CustomImage';
import { CategoryService } from './category.service';
import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFiles,
  Param,
  Res,
  Patch,
  Delete,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/user/user.role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CategoryEntity } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private catagoryService: CategoryService) {}

  @Get()
  async getAllCategory(): Promise<CategoryEntity[]> {
    return this.catagoryService.getAllCategory();
  }

  @Post('/create')
  @Auth(Role.ADMIN)
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './upload/categoryphoto',
        filename: CustomImageFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createCategory(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.catagoryService.createCategory(files, body);
  }

  @Patch('/edit/:id')
  @Auth(Role.ADMIN)
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './upload/categoryphoto',
        filename: CustomImageFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async editCategory(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param() { id },
    @Body() body: EditCategoryDto,
  ): Promise<CategoryEntity> {
    return this.catagoryService.editCategory(files, body, id);
  }

  @Delete('/delete/:id')
  @Auth(Role.ADMIN)
  async deleteCategory(@Param() { id }): Promise<CategoryEntity> {
    return this.catagoryService.deleteCategory(id);
  }

  @Get('/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload/categoryphoto' });
  }
}
