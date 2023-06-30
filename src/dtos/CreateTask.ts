import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsNotEmpty()
  @IsUUID()
  fileId: string;
}
