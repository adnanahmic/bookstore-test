import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from './user.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(data: RegisterDTO): Promise<any> {
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    const user = new this.userModel(data);
    const { _id, username, authorPsuedonym, ...rest } = await user.save();
    return { _id, username, authorPsuedonym };
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findUser(data: LoginDTO): Promise<User> {
    return await this.userModel.findOne({ username: data.username });
  }
}
