import { ApiProperty } from '@nestjs/swagger';

export class UpdateCatalogDto {
  @ApiProperty({ required: false })
  name?: string;
}
