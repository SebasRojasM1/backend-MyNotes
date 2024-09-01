import { Module } from '@nestjs/common';
import { NotesModule } from './modules/notes/notes.module';
import dbConfig from './libs/config/persistence/db-config';
import { ConfigModule } from '@nestjs/config';
import { persistenceModule } from './libs/config/persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: '.env',
    }),
    persistenceModule,
    NotesModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}