import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import dbConfig from 'config/persistence/db-config';
import { ConfigModule } from '@nestjs/config';
import { NotesController } from './notes/controllers/notes.controller';
import { NotesService } from './notes/services/notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes, noteSchema } from './notes/entities/note.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: '.env',
    }),
    MongooseModule.forFeature([{ name: Notes.name, schema: noteSchema }]),
    NotesModule
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}