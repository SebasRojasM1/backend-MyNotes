/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, noteSchema } from './entities/note.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: noteSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})

export class NotesModule { }
