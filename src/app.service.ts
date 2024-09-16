import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly name = 'Instagram-api(clone)';
  private readonly ver = '1.0.0';
  private readonly description = `This is a simple Instagram clone API built with NestJS. It allows users to register, login, and perform various actions similar to Instagram.`;

  version() {
    return ({
      name: this.name,
      version: this.ver,
      description: this.description,
    });
  }
}
