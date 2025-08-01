import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { User } from "@prisma/client"

export interface ICreateUserDTO extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
}

export class CreateUserDTO implements ICreateUserDTO {
    @ApiProperty()
    name: string
    @ApiProperty()
    email: string
}

export interface IUpdateUserDTO extends Omit<Partial<User>, 'createdAt' | 'updatedAt'> {
    id: number
}

export class UpdateUserDTO implements IUpdateUserDTO {
    @ApiProperty()
    id: number
    @ApiPropertyOptional()
    name?: string
    @ApiPropertyOptional()
    email?: string
}

export class UserFilterDTO {
    @ApiPropertyOptional()
    name?: string
}