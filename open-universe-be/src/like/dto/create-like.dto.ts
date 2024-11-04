import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateLikeDto {
    @ApiProperty()
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'User id must be a number' })
    @IsNotEmpty({ message: 'User id must not be empty' })
    user_id: number;

    @ApiProperty()
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Post id must be a number' })
    @IsNotEmpty({ message: 'Post id must not be empty' })
    post_id: number;  
}
