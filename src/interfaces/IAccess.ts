import { ApiProperty } from "@nestjs/swagger";

export interface IAccess {
    username: string;
    password: string;
}

export class AccessDto implements IAccess {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}