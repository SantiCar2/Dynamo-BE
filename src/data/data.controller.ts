import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { DataService } from './data.service';

@UseGuards(JwtGuard)
@Controller('data')
export class DataController {
    constructor(private dataService: DataService) {}

    @Get('productosTable')
    async getProductsTable() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.dataService.getProducts();
    }

    @Get('inventarioTable')
    async getInventoryTable() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.dataService.getInventory();
    }

    @Get('inventoriesNames')
    async getInventoriesNames() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.dataService.getInventoriesNames();
    }
}
