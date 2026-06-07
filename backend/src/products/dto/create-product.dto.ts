// DTO para crear producto — incluye todos los campos de la Fase 2
// El slug se genera automáticamente en el servicio

import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, Min, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()             @IsString()                          name: string;
  @ApiPropertyOptional()    @IsString()  @IsOptional()           description?: string;
  @ApiProperty()             @IsNumber() @Min(0)                  price: number;
  @ApiPropertyOptional()    @IsNumber()  @IsOptional()            salePrice?: number;
  @ApiProperty()             @IsString()                          sku: string;
  @ApiProperty()             @IsNumber() @Min(0)                  stock: number;
  @ApiPropertyOptional({ type: [String] }) @IsArray() @IsOptional() images?: string[];
  @ApiPropertyOptional()    @IsBoolean() @IsOptional()            featured?: boolean;
  @ApiPropertyOptional()    @IsBoolean() @IsOptional()            isNew?: boolean;
  @ApiPropertyOptional()    @IsBoolean() @IsOptional()            isOffer?: boolean;
  @ApiPropertyOptional()    @IsBoolean() @IsOptional()            active?: boolean;
  @ApiPropertyOptional()    @IsString()  @IsOptional()            categoryId?: string;
  @ApiPropertyOptional()    @IsString()  @IsOptional()            brandId?: string;
  // ── Fase 2 ────────────────────────────────────────────────────────────────
  @ApiPropertyOptional()    @IsString()  @IsOptional()            videoUrl?: string;
  @ApiPropertyOptional()                @IsOptional()             performanceStats?: unknown;
  @ApiPropertyOptional()                @IsOptional()             features?: unknown;
  @ApiPropertyOptional({ type: [String] }) @IsArray() @IsOptional() relatedProductIds?: string[];
}
