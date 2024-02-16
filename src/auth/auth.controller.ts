import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @Post('/login')
  login() {
    return this.authService.login();
  }
}
