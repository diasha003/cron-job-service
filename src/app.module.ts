import { Module } from '@nestjs/common';
import { TickersModule } from './tickers/tickers.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

//const ENV = process.env.NODE_ENV

@Module({
  imports: [
    TickersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
