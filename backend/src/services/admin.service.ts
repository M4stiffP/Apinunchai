import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from '../schemas/admin.schema';
import { CreateAdminDto, LoginAdminDto, UpdateAdminDto } from '../dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const { username, email, password, fullName, role, permissions } = createAdminDto;

    // Check if username or email already exists
    const existingAdmin = await this.adminModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingAdmin) {
      throw new ConflictException('Username or email already exists');
    }

    // Get the next id
    const lastAdmin = await this.adminModel.findOne().sort({ id: -1 });
    const nextId = lastAdmin ? lastAdmin.id + 1 : 1;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new this.adminModel({
      id: nextId,
      username,
      email,
      password: hashedPassword,
      fullName,
      role: role || 'product_manager',
      permissions: permissions || ['products.view', 'products.edit'],
    });

    await admin.save();

    // Generate JWT token
    const payload = { 
      username: admin.username, 
      sub: admin.id, 
      role: admin.role,
      permissions: admin.permissions
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Admin created successfully',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
        permissions: admin.permissions,
      },
    };
  }

  async login(loginAdminDto: LoginAdminDto) {
    const { username, password } = loginAdminDto;

    // Find admin
    const admin = await this.adminModel.findOne({ username });
    if (!admin || !admin.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    admin.lastLoginAt = new Date();
    await admin.save();

    // Generate JWT token
    const payload = { 
      username: admin.username, 
      sub: admin.id, 
      role: admin.role,
      permissions: admin.permissions
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
        permissions: admin.permissions,
        lastLoginAt: admin.lastLoginAt,
      },
    };
  }

  async findAll() {
    const admins = await this.adminModel
      .find({ isActive: true })
      .select('-password')
      .sort({ createdAt: -1 });
    
    return admins;
  }

  async findById(id: number) {
    const admin = await this.adminModel
      .findOne({ id, isActive: true })
      .select('-password');

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findOne({ id });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    // Check if email is being changed and if it's already taken
    if (updateAdminDto.email && updateAdminDto.email !== admin.email) {
      const existingAdmin = await this.adminModel.findOne({
        email: updateAdminDto.email,
        id: { $ne: id },
      });

      if (existingAdmin) {
        throw new ConflictException('Email already exists');
      }
    }

    // Update admin
    Object.assign(admin, updateAdminDto);
    await admin.save();

    return {
      message: 'Admin updated successfully',
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
        permissions: admin.permissions,
      },
    };
  }

  async deleteAdmin(id: number) {
    const admin = await this.adminModel.findOne({ id });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    // Soft delete
    admin.isActive = false;
    await admin.save();

    return { message: 'Admin deleted successfully' };
  }

  async validateAdmin(payload: any) {
    const admin = await this.adminModel
      .findOne({ id: payload.sub, isActive: true })
      .select('-password');

    if (!admin) {
      throw new UnauthorizedException();
    }

    return admin;
  }
}