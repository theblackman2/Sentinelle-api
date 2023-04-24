import { Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Field, FieldDocument } from './entities/field.entity';
import { Model } from 'mongoose';

@Injectable()
export class FieldService {
  constructor(
    @InjectModel(Field.name)
    private field = Model<FieldDocument>,
  ) {}

  async create(createFieldDto: CreateFieldDto) {
    const newField = await this.field.create({
      ...createFieldDto,
    });
    return newField;
  }

  async findAll() {
    const field = await this.field.find();
    return field;
  }

  findOne(id: number) {
    return `This action returns a #${id} field`;
  }

  update(id: number, updateFieldDto: UpdateFieldDto) {
    return `This action updates a #${id} field`;
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }
}