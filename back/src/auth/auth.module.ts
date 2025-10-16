import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PassportModule,
    JwtModule.registerAsync({ imports: [ConfigModule], inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_PASS'),
        signOptions: { expiresIn: configService.get<string>('JWT_TIME') },
      }),
    }),
  ],
  controllers: [AuthController], providers: [AuthService, JwtStrategy], exports: [AuthService]
})

export class AuthModule {}