import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
// import { type } from 'os';
import { Course } from 'src/course/entities/course.entity';
import { School } from 'src/school/entities/school.entity';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  phoneNumber: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Course' })
  @Type(() => Course)
  courses: Course;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: School.name })
  @Type(() => School)
  schools: School;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
