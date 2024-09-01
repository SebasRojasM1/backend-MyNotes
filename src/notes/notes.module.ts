import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes, noteSchema } from './entities/note.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notes.name, schema: noteSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})

export class NotesModule { }
