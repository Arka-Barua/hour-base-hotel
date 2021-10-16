import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

export const CustomImageFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const filename = name.replace(/\s/g, '') + uuid();
  const extension = extname(file.originalname);
  callback(null, `${filename}${extension}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    callback(null, true);
  } else {
    // Reject file
    callback(
      new HttpException(
        `Unsupported file type ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
};
