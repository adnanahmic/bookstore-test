import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginDTO, RegisterDTO } from './user/user.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async createUser(@Body() data: RegisterDTO) {
    return await this.userService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Body() data: LoginDTO) {
    return this.authService.login(data.username);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
