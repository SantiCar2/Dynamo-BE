import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCreation, ProductUpdate } from './dto';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}
    async getProductsNames() {
        return this.prisma.product.findMany({
            select: {
                SKU: true,
            },
        });
    }
    async createProduct(dto: ProductCreation) {
        try {
            await this.prisma.product.create({
                data: {
                    name: dto.name,
                    SKU: dto.SKU,
                    CBM: dto.CBM,
                    description: dto.description,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') throw new ConflictException('SKU already exists');
            throw new BadRequestException(error);
        }
        return {message: 'Product created successfully'};
    }

    async updateProduct(dto: ProductUpdate) {
        try {
            await this.prisma.product.update({
                where: {
                    SKU: dto.oldSKU,
                },
                data: {
                    name: dto.name,
                    SKU: dto.SKU,
                    CBM: dto.CBM,
                    description: dto.description,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') throw new ConflictException('SKU already exists');
            throw new BadRequestException(error);
        }
        return {message: 'Product updated successfully'};
    }

    async deleteProduct(SKU: string) {
        await this.prisma.product.delete({
            where: {
                SKU,
            },
        });
        return {message: 'Product deleted successfully'};
    }
}
