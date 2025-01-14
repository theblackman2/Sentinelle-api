/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from './entities/schedule.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private schedule: Model<ScheduleDocument>,
  ) {}
  async create(createScheduleDto: CreateScheduleDto) {
    // console.log(createScheduleDto);
    try {
      const oldSchedule = await this.schedule.findOne({
        $and: [
          { class: createScheduleDto.class },
          { course: createScheduleDto.course },
        ],
      });
      if (oldSchedule) return 'shedull for this class exist';
      else {
        const newSchedull = await this.schedule
          .create({
            ...createScheduleDto,
          })
          .catch((e) => {
            throw new HttpException(
              { error: 'error', e },
              HttpStatus.BAD_REQUEST,
            );
          });
        return newSchedull;
      }
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return await this.schedule
      .find()
      .populate({ path: 'class', select: 'level' });
  }

  async findByClass(classId: mongoose.Schema.Types.ObjectId) {
    try {
      const schedule = await this.schedule
        .find({ class: classId })
        // .select({ name:  })
        .populate({
          path: 'course',
          select: 'field',
          populate: { path: 'field', select: 'name' },
        });

      let lundi = [{ day: 'lundi', course: [] }];
      let mardi = [{ day: 'mardi', course: [] }];
      let mercredi = [{ day: 'mercredi', course: [] }];
      let jeudi = [{ day: 'jeudi', course: [] }];
      let vendredi = [{ day: 'vendredi', course: [] }];
      let samedi = [{ day: 'samedi', course: [] }];
      let newSchedull = [];
      //lundi
      let courseLundi = [];
      schedule
        .filter((a) => a.day === 'lundi')
        .map((d) => {
          courseLundi.push({
            courseId: JSON.parse(JSON.stringify(d?.course))._id,
            startHoour: d?.startHour,
            endHour: d?.endHour,
            name: JSON.parse(JSON.stringify(d?.course?.field)).name,
          });
        });
      lundi[0].course = courseLundi;
      //mardi
      let courseMardi = [];
      schedule
        .filter((a) => a.day === 'mardi')
        .map((d) => {
          courseMardi.push({
            courseId: JSON.parse(JSON.stringify(d?.course))._id,
            startHoour: d?.startHour,
            endHour: d?.endHour,
            name: JSON.parse(JSON.stringify(d?.course?.field)).name,
          });
        });
      mardi[0].course = courseMardi;
      //mercreid
      let courrseMer = [];
      schedule
        .filter((a) => a.day === 'mercredi')
        .map((d) => {
          courrseMer.push({
            courseId: JSON.parse(JSON.stringify(d?.course))._id,
            startHoour: d?.startHour,
            endHour: d?.endHour,
            name: JSON.parse(JSON.stringify(d?.course?.field)).name,
          });
        });
      mercredi[0].course = courrseMer;
      //jeudi
      let courseJeudi = [];
      schedule
        .filter((a) => a.day === 'jeudi')
        .map((d) => {
          courseJeudi.push({
            courseId: JSON.parse(JSON.stringify(d?.course))._id,
            startHoour: d?.startHour,
            endHour: d?.endHour,
            name: JSON.parse(JSON.stringify(d?.course?.field)).name,
          });
        });
      jeudi[0].course = courseJeudi;
      //vendredi
      let courseVendredi = [];
      schedule
        .filter((a) => a.day === 'vendredi')
        .map((d) => {
          courseVendredi.push({
            courseId: JSON.parse(JSON.stringify(d?.course))._id,
            startHoour: d?.startHour,
            endHour: d?.endHour,
            name: JSON.parse(JSON.stringify(d?.course?.field)).name,
          });
        });
      vendredi[0].course = courseVendredi;
      //samedi
      let samediCourse = [];
      schedule
        .filter((a) => a.day === 'samedi')
        .map((d) => {
          samediCourse.push({
            courseId: JSON.parse(JSON.stringify(d?.course))._id,
            startHoour: d?.startHour,
            endHour: d?.endHour,
            name: JSON.parse(JSON.stringify(d?.course?.field)).name,
          });
        });
      samedi[0].course = samediCourse;

      newSchedull.push(lundi);
      newSchedull.push(mardi);
      newSchedull.push(mercredi);
      newSchedull.push(jeudi);
      newSchedull.push(vendredi);
      newSchedull.push(samedi);

      // return schedule;
      return newSchedull;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.schedule
      .findOne({ _id: id })
      .populate({
        path: 'class',
        select: 'level',
        populate: {
          path: 'option',
          select: 'name',
        },
      })
      .populate({
        path: 'course',
        select: '',
        populate: [
          { path: 'field', select: 'name' },
          { path: 'teacher', select: ['firstName', 'lastName'] },
        ],
      });
    // .populate({ path: 'class', select: 'level' });
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateScheduleDto: UpdateScheduleDto,
  ) {
    return await this.schedule.updateOne({ _id: id }, { updateScheduleDto });
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
