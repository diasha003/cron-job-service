import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login() {
    return this.generateToken();
  }

  private async generateToken() {
    const payload = {};
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
