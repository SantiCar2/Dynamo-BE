import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventorieCreation } from './dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class InventoriesService {
    constructor(private prisma: PrismaService) {}
    async createInventory(dto: InventorieCreation) {
        if (!dto.newName) throw new BadRequestException('Name is required');
        try{
            const result = await this.prisma.inventoryName.create({
                data: {
                    name: dto.newName,
                },
            })
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Name already exists');
            }
            throw new BadRequestException(error);
        }
        return {message: 'Inventory created successfully'};
    }

    async deleteInventory(name: string) {
        try {
            await this.prisma.inventory.deleteMany({
                where: {
                    InventoryName: {
                        name: name,
                    },
                }
            });
            await this.prisma.inventoryName.delete({
                where: {
                    name: name,
                },
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('Name does not exist');
            }
            throw new BadRequestException(error);
        }
        return {message: 'Inventory deleted successfully'};
    }

    async changeInventoryName(name: string, newName: string) {
        try {
            await this.prisma.inventoryName.update({
                where: {
                    name: name,
                },
                data: {
                    name: newName,
                },
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
        return {message: 'Inventory name changed successfully'};
    }

}
