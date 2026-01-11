import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { CreateAdminDto, LoginAdminDto, UpdateAdminDto } from '../dto/admin.dto';
// import { AdminAuthGuard } from '../guards/admin-auth.guard'; // Will create this later

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  register(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Post('login')
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  // @UseGuards(AdminAuthGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  // @UseGuards(AdminAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.adminService.findById(parseInt(id));
  }

  // @UseGuards(AdminAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(parseInt(id), updateAdminDto);
  }

  // @UseGuards(AdminAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.adminService.deleteAdmin(parseInt(id));
  }
}