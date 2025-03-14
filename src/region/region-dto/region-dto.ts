import { ApiProperty } from "@nestjs/swagger";

export class regionDto {
    @ApiProperty({example: "Tashkent"})
    name: string;
}