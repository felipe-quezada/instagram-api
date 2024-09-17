import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    fullName,
    userName,
    phoneNumber,
    email,
    password,
  }: RegisterDto) {
    const user = await this.usersService.findByEmail(email);

    // verificación de existencia de email
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    // encriptamos la contraseña
    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.usersService.create({
      fullName,
      userName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    return {
      message: 'User created successfully',
    };
  }

  async login({ userName, password }: LoginDto) {
    const user = await this.usersService.findByUserName(userName);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { user };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'User logged in successfully',
      user: user.userName,
      token,
    };
  }

  async googleLogin() {
    return {
      message: 'Google login',
    };
  }

  async googleCallback() {
    return {
      message: 'Google callback',
    };
  }
}
