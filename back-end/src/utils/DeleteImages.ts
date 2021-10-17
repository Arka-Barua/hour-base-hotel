import * as fs from 'fs';

export const deleteImages = (entity: any) => {
  entity.images.forEach((img: string) => {
    const imgpath = `upload\\categoryphoto\\${img}`;
    fs.unlink(imgpath, (err) => {
      if (err) return err;
      console.log(err);
    });
  });
};
