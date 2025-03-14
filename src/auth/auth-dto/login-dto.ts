import { ApiProperty } from "@nestjs/swagger";

export class loginDto {
    @ApiProperty({example: "johndoe@example.com"})
    email: string;
    @ApiProperty({example: "12345"})
    password: string;
}