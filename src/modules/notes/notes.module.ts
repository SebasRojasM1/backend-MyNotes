/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, noteSchema } from './entities/note.entity';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: noteSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
  exports:[NotesService]
})
export class NotesModule {}
