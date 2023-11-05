import { IsDate, IsNumber, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class CreateTuitDto {
    @IsDate()
    date: Date = new Date();

    @IsString()
    @Length(1,140)
    content: string;

    @IsNumber()
    @IsPositive()
    userId: number;

    @IsNumber()
    @IsOptional()
    parentTuitId: number | null;
}
