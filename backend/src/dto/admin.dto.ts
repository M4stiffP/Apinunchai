import { IsString, IsEmail, IsOptional, IsEnum, IsArray, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  fullName: string;

  @IsOptional()
  @IsEnum(['super_admin', 'product_manager', 'content_manager'])
  role?: string;

  @IsOptional()
  @IsArray()
  permissions?: string[];
}

export class LoginAdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(['super_admin', 'product_manager', 'content_manager'])
  role?: string;

  @IsOptional()
  @IsArray()
  permissions?: string[];
}