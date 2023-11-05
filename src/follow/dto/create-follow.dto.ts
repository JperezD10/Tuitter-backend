import { IsNumber, IsPositive, Min } from "class-validator";

export class CreateFollowDto {

    @IsNumber()
    @IsPositive()
    @Min(1)
    followerId: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    followingId: number;
}
