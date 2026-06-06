import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
  }

  findAllAdmin() {
    return this.prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
  }

  create(dto: any) {
    return this.prisma.testimonial.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const item = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Testimonio no encontrado');
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const item = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Testimonio no encontrado');
    return this.prisma.testimonial.delete({ where: { id } });
  }
}
