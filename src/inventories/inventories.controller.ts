import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { InventoriesService } from './inventories.service';
import { Roles } from 'src/auth/decorator';
import { InventorieCreation } from './dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('inventories')
export class InventoriesController {

    constructor(private inventoriesService: InventoriesService) {}

    @Post('create')
    @Roles(['admin']) // Fix: Change argument to an array of strings
    async createInventory(@Body() dto: InventorieCreation) {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.inventoriesService.createInventory(dto);
    }

    @Delete(':name')
    @Roles(['admin'])
    async deleteInventory(@Param('name') name: string) {
        return this.inventoriesService.deleteInventory(name);
    }

    @Put(':name')
    @Roles(['admin'])
    async modifyInventory(@Param('name') name: string, @Body('newName') newName: string) {
        return this.inventoriesService.changeInventoryName(name, newName);
    }
}
