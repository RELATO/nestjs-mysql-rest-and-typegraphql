import { Module } from '@nestjs/common';

import { TypeOrmModule } from "@nestjs/typeorm";

import { Page } from "./entity/page.entity";
import { Post } from "./entity/post.entity";
import { DynUser } from "./entity/dynuser.entity";
// import { BaseResolver } from "./resolver/BaseResolver";
import { PageResolver } from "./resolver/PageResolver";
import { PostResolver } from "./resolver/PostResolver";
import { DynUserResolver } from "./resolver/DynUserResolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([DynUser, Page, Post]),
        // BaseResolver,
    ],
    controllers: [],
    providers: [PostResolver, PageResolver, DynUserResolver],
    exports: [
        // BaseResolver,
    ],
  })
export class DynamicModule {}
