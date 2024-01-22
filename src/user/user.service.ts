import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entites/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private saltOrRounds = 10;
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async create(createuserdto: CreateUserDto) {
    const password: string = createuserdto.password;
    const hash: string = await bcrypt
      .hash(password, this.saltOrRounds)
      .catch((e) => e);

    delete createuserdto.password;
    const user = new this.userModel({
      ...createuserdto,
      password: hash,
    });

    const newUser = await user.save();

    const payload = {
      userId: newUser._id,
      phoneNumber: newUser.phoneNumber,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.TOKEN_SECRET,
    });
    return { user: newUser, token: `Bearer ${token}` };
  }
  async findAll() {
    try {
      return await this.userModel.find();
    } catch (error) {
      return error.message;
    }
  }
  async findOne(id: mongoose.Schema.Types.ObjectId): Promise<any> {
    try {
      const resultat = await this.userModel.findOne({ _id: id });

      return resultat;
    } catch (error) {
      return error.message;
    }
  }
}
