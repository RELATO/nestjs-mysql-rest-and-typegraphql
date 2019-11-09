import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";

import { IdeaModule } from "./idea/idea.module";
import { HttpErrorFilter } from "./shared/http-error.filter";
import { LoggingInterceptor } from "./shared/logging.interceptor";
import { ValidationPipe } from "./shared/validation.pipe";
import { DataInterceptor } from './shared/data.interceptor';
import { DataPipe } from './shared/data.pipe';
import { UserModule } from "./user/user.module";
import { CommentModule } from "./comment/comment.module";
import { DynamicModule } from './dynamic/dynamic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "ideas",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV !== "production",
      autoSchemaFile: "schema.gql",
      context: ({ req }) => ({ headers: req.headers }),
    }),
    IdeaModule,
    UserModule,
    CommentModule,
    DynamicModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DataInterceptor,
    // },
    {
      provide: APP_PIPE,
      useClass: DataPipe,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
