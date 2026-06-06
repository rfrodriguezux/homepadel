import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HeroSlidesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.heroSlide.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
  }

  findAllAdmin() {
    return this.prisma.heroSlide.findMany({ orderBy: { order: 'asc' } });
  }

  create(dto: any) {
    return this.prisma.heroSlide.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const slide = await this.prisma.heroSlide.findUnique({ where: { id } });
    if (!slide) throw new NotFoundException('Slide no encontrado');
    return this.prisma.heroSlide.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const slide = await this.prisma.heroSlide.findUnique({ where: { id } });
    if (!slide) throw new NotFoundException('Slide no encontrado');
    return this.prisma.heroSlide.delete({ where: { id } });
  }
}
