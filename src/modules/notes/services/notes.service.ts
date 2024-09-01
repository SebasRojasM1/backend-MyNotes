/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Note } from '../entities/note.entity';
import { CreateNoteDto, UpdateNoteDto } from '../dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(createNote :CreateNoteDto): Promise<Note> {
    const newNote = new this.noteModel(createNote);
    return newNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.noteModel.findById(id).exec();
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async update(id: string, updateNote: UpdateNoteDto): Promise<Note> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const updatedNote = await this.noteModel.findByIdAndUpdate(id, updateNote, {
      new: true,
      runValidators: true, // Ejecutar validadores de Mongoose
    });

    if (!updatedNote) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return updatedNote;
  }

  async delete(id: string): Promise<void> {
    const result = await this.noteModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }
}