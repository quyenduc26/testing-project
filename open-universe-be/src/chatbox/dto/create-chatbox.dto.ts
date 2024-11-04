import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";

export class CreateChatboxDto {
    @ApiProperty()
    @ArrayMinSize(2, { message: 'Array must contain at least 2 elements' })
    @IsNumber({}, { each: true, message: 'Each element of the array must be Number' })
    @IsNotEmpty({ message: 'ID of participants must not be empty' })
    readonly participants: number[];
}
