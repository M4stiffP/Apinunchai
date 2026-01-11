import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto, UpdateColorDto } from '../dto/color-size.dto';
// import { AdminAuthGuard } from '../guards/admin-auth.guard'; // Will create this later

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.colorsService.findById(parseInt(id));
  }

  // @UseGuards(AdminAuthGuard) // Uncomment when guard is ready
  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  // @UseGuards(AdminAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorsService.update(parseInt(id), updateColorDto);
  }

  // @UseGuards(AdminAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.colorsService.delete(parseInt(id));
  }

  // @UseGuards(AdminAuthGuard)
  @Post(':id/images')
  addImage(@Param('id') id: string, @Body('imageUrl') imageUrl: string) {
    return this.colorsService.addImage(parseInt(id), imageUrl);
  }

  // @UseGuards(AdminAuthGuard)
  @Delete(':id/images')
  removeImage(@Param('id') id: string, @Body('imageUrl') imageUrl: string) {
    return this.colorsService.removeImage(parseInt(id), imageUrl);
  }

  // @UseGuards(AdminAuthGuard)
  @Put(':id/primary-image')
  setPrimaryImage(@Param('id') id: string, @Body('imageUrl') imageUrl: string) {
    return this.colorsService.setPrimaryImage(parseInt(id), imageUrl);
  }

  // @UseGuards(AdminAuthGuard)
  @Post(':id/tags')
  addTag(@Param('id') id: string, @Body('tag') tag: string) {
    return this.colorsService.addTag(parseInt(id), tag);
  }

  // @UseGuards(AdminAuthGuard)
  @Delete(':id/tags')
  removeTag(@Param('id') id: string, @Body('tag') tag: string) {
    return this.colorsService.removeTag(parseInt(id), tag);
  }

  @Get('product/:productId')
  findByProductId(@Param('productId') productId: string) {
    return this.colorsService.findByProductId(parseInt(productId));
  }
}