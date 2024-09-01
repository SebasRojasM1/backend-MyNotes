/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UsePipes, ValidationPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto, UpdateNoteDto } from '../dto';
import { Note } from '../entities/note.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({
    summary: 'Create a new note',
    description: 'This endpoint creates a new note with the provided data.',
  })
  @ApiCreatedResponse({ description: 'Note created successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(createNoteDto);
  }

  @Get("/all")
  @ApiOperation({
    summary: 'Get all notes',
    description: 'This endpoint retrieves all notes from the database.',
  })
  @ApiOkResponse({ description: 'Notes retrieved successfully!' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  async findAll(): Promise<Note[]> {
    const notes = await this.notesService.findAll();
    
    if (notes.length === 0) {
      throw new NotFoundException('No notes found');
    }
    
    return notes;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a note by ID',
    description: 'This endpoint retrieves a note by its unique ID.',
  })
  @ApiOkResponse({ description: 'Note retrieved successfully!' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  async findOne(@Param('id') id: string): Promise<Note> {

    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    return this.notesService.findOne(id);
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update a note by ID',
    description: 'This endpoint updates a note by its unique ID.',
  })
  @ApiOkResponse({ description: 'Note updated successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update( @Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto): Promise<Note> {
    
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    return this.notesService.update(id, updateNoteDto);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a note by ID',
    description: 'This endpoint deletes a note by its unique ID.',
  })
  @ApiOkResponse({ description: 'Note deleted successfully!' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  async delete(@Param('id') id: string) {
    
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    return this.notesService.delete(id);
  }
}