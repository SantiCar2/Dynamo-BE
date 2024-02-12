import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ProductsService } from './products.service';
import { ProductCreation, ProductUpdate } from './dto';

@UseGuards(JwtGuard)
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @Roles(['admin', 'user'])
    @Get('getNames')
    async getProductsNames() {
        return this.productService.getProductsNames();
    }

    @Roles(['admin'])
    @Post('create')
    async createProduct(@Body() dto: ProductCreation){
        return this.productService.createProduct(dto);
    }

    @Roles(['admin'])
    @Put('update')
    async updateProduct(@Body() dto: ProductUpdate){
        return this.productService.updateProduct(dto);
    }

    @Roles(['admin'])
    @Delete('delete/:SKU')
    async deleteProduct(@Param('SKU') SKU: string){
        return this.productService.deleteProduct(SKU);
    }
}
