import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

export abstract class BaseService{
    protected handleErrors(error){
        if(error.code === '23505') throw new BadRequestException(error.detail);

        console.error(error)
        throw new InternalServerErrorException('An error happened. Please talk with admins')
    }
}