import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Types } from 'mongoose';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';

export type SchoolDocument = School & Document;
@Schema()
export class School {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  address: string;
  @Prop()
  email: string;
  @Prop({ required: true, unique: true })
  phoneNumber: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Student' })
  @Type(() => Student)
  students: Student;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Class' })
  @Type(() => Class)
  classes: Class;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
