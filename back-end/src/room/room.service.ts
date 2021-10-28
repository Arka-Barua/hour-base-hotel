import { CategoryService } from './../category/category.service';
import { CreateRoomDto } from './room.dto';
import {
  Inject,
  Injectable,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) {}

  async getRoomById(id: string): Promise<RoomEntity> {
    return this.roomRepository.findOneOrFail(id);
  }

  async findAllRooms(): Promise<RoomEntity[]> {
    return this.roomRepository.find({ relations: ['category'] });
  }

  async deleteRoom(id: string): Promise<any> {
    return this.roomRepository.delete(id);
  }

  async createRoom(body: CreateRoomDto): Promise<any> {
    const { roomNumber, category } = body;
    const selectedCategory = await this.categoryService.findCategoryById(
      category,
    );

    const existingRoom = await this.roomRepository.findOne({
      where: { roomNumber },
    });

    if (existingRoom) {
      console.log(existingRoom);
      throw new BadRequestException(`Room Number ${roomNumber} already exists`);
    } else {
      const newRoom = new RoomEntity();
      newRoom.roomNumber = roomNumber;
      newRoom.category = selectedCategory;
      return this.roomRepository.save(newRoom);
    }
  }

  async editRoom(id: string, body: any): Promise<any> {
    const { roomNumber, category } = body;
    const selectedCategory = await this.categoryService.findCategoryById(
      category,
    );
    const editableRoom = await this.roomRepository.findOneOrFail(id);
    editableRoom.roomNumber = roomNumber;
    editableRoom.category = selectedCategory;
    return this.roomRepository.save(editableRoom);
  }
}
