import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataService {
    constructor(private prisma: PrismaService) {}

    getInventoriesNames() {
        return this.prisma.inventoryName.findMany({
            select: {
                name: true,
            },
        });
    }

    async getInventory() {
        const result = await this.prisma.inventory.findMany({
            select: {
                quantity: true,
                name: true,
                updatedAt: true,
                product: {
                    select: {
                        name: true,
                        SKU: true,
                    },
                },
            },
        });

        const transformedResult = result.map((inventory) => {
            return {
                Iventario: inventory.name,
                SKU: inventory.product.SKU,
                Nombre: inventory.product.name,
                Cantidad: inventory.quantity,
                Fecha: inventory.updatedAt,
            };
        });
        return transformedResult;
    }

    async getProducts() {
        const result = await this.prisma.product.findMany({
            select: {
                id: true,
                name: true,
                SKU: true,
                inventories: {
                    select: {
                        quantity: true,
                    },
                },
            },
        });

        const transformedResult = result.map((product) => {
            const totalQuantity = product.inventories.reduce(
                (acc, inventory) => {
                    return acc + inventory.quantity;
                },
                0,
            );

            return {
                Id: product.id,
                Nombre: product.name,
                SKU: product.SKU,
                Cantidad: totalQuantity,
            };
        });

        return transformedResult;
    }
}

