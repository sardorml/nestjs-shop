import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogDto {
  @ApiProperty()
  name: string;
}
