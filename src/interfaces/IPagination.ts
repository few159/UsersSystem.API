import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsIn, IsString, IsInt, ValidateNested } from "class-validator";

export interface IPagination<T> {
    data: Array<T>;
    page: number;
    pageSize: number;
    total: number;
}

export interface IPaginationQuery {
    page: number;
    pageSize: number;
    order?: {
        column: string,
        flow: 'asc' | 'desc'
    };
}


class OrderQuery {
  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  flow?: 'asc' | 'desc';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  column?: string;
}

export class PaginationQuery {
  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  pageSize?: number = 10;

  @ApiPropertyOptional({ type: () => OrderQuery })
  @ValidateNested()
  @Type(() => OrderQuery)
  @IsOptional()
  order?: OrderQuery = {};
}