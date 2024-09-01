import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateNoteDto{
    @ApiProperty({ description: 'Title of the note', example: 'How to use Docker' })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ description: 'Body content of the note', example: 'Study Docker for the exam' })
    @IsString()
    @IsOptional()
    body?: string;
}
