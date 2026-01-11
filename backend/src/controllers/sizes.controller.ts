import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { SizesService } from '../services/sizes.service';
import { CreateSizeDto, UpdateSizeDto } from '../dto/color-size.dto';
// import { AdminAuthGuard } from '../guards/admin-auth.guard'; // Will create this later

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    if (category) {
      return this.sizesService.findByCategory(category);
    }
    return this.sizesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.sizesService.findById(parseInt(id));
  }

  // @UseGuards(AdminAuthGuard)
  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  // @UseGuards(AdminAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizesService.update(parseInt(id), updateSizeDto);
  }

  // @UseGuards(AdminAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.sizesService.delete(parseInt(id));
  }

  // @UseGuards(AdminAuthGuard)
  @Post('reorder/:category')
  reorderSizes(
    @Param('category') category: string,
    @Body() sizeOrders: { id: number; sortOrder: number }[]
  ) {
    return this.sizesService.reorderSizes(category, sizeOrders);
  }
}