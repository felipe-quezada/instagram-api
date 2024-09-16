import { IsString } from 'class-validator';

export class CreateTestDto {
  @IsString()
  test: string;
}
