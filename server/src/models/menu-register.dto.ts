import { Length, IsString, IsNumberString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class MenuRegisterDTO {

    @Length(2, 20)
    @IsString()
    product_name: string;

    @Length(1, 4)
    @IsNumberString()
    product_price: number;

    @Length(1, 1)
    @IsNumberString()
    product_type: number;

    @Length(1, 4)
    @IsNumberString()
    product_weight: number;

    @Length(2, 20)
    @IsString()
    product_description: string;

    @Optional()
    //@IsString()
    image_url: string;
    // Add isDeleted column?
}
