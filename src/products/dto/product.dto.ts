import { IsNotEmpty, IsNumber, IsString, isInt } from "class-validator";

export class ProductCreation {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    SKU: string;

    @IsNumber()
    @IsNotEmpty()
    CBM: number;
}

export class ProductUpdate {
    @IsString()
    @IsNotEmpty()
    oldSKU: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    SKU: string;

    @IsNumber()
    @IsNotEmpty()
    CBM: number;
}