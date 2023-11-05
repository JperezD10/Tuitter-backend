import { IsNumber, IsPositive, Min } from "class-validator";

export class CreateLikeDto {
    @IsNumber()
    @IsPositive()
    @Min(1)
    userId: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    tuitId: number;
}
