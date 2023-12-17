import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from './entities/notification.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notification: Model<NotificationDocument>,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    try {
      return await this.notification.create({ ...createNotificationDto });
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return await this.notification.find().populate('student');
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.notification.findOne({ _id: id }).populate('student');
    } catch (error) {
      return error.message;
    }
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateNotificationDto: UpdateNotificationDto,
  ) {
    try {
      return await this.notification.updateOne(
        { _id: id },
        { updateNotificationDto },
      );
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    return await this.notification.deleteOne({ _id: id });
  }
}
