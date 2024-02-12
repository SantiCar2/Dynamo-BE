import { IsNotEmpty, IsString } from "class-validator";

export class InventorieCreation {
    @IsString()
    @IsNotEmpty()
    newName: string;
}