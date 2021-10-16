import { CreateCategoryDto } from './category.dto';
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
  ): Promise<any> {
    return this.catagoryService.createCategory(files, body);
  }

  @Get('/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload/categoryphoto' });
  }
}
