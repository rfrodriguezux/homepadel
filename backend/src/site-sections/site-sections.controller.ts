import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SiteSectionsService, SectionKey } from './site-sections.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Site Sections')
@Controller('site-sections')
export class SiteSectionsController {
  constructor(private readonly siteSectionsService: SiteSectionsService) {}

  // Público — cualquiera puede leer una sección por clave
  @Get(':key')
  findOne(@Param('key') key: SectionKey) {
    return this.siteSectionsService.findOne(key);
  }

  // Admin — upsert de una sección
  @Put(':key')
  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.ADMIN)
  upsert(
    @Param('key') key: SectionKey,
    @Body() dto: { data: Record<string, unknown>; active?: boolean },
  ) {
    return this.siteSectionsService.upsert(key, dto);
  }
}
