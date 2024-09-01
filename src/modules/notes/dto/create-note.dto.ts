import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
    @ApiProperty({ description: 'Title of the note', example: 'How to use Docker' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Body content of the note', example: 'Study Docker for the exam' })
    @IsString()
    @IsNotEmpty()
    body: string;
}
