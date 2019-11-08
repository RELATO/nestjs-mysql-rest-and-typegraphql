import { Resolver, Query, Args, Mutation, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CommentEntity } from "./comment.entity";
import { CommentService } from "./comment.service";
import { CommentDTO } from "./dto/comment.dto";
import { AuthGuard } from "../shared/auth.guard";
import { Int } from "type-graphql";

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => CommentEntity)
  public comment(@Args({ name: "id", type: () => Int, nullable: false }) id: number) {
    return this.commentService.show(id);
  }

  @Mutation(() => CommentEntity)
  @UseGuards(new AuthGuard())
  public createComment(
    @Args({ name: "ideaId", type: () => Int, nullable: false }) ideaId: number,
    @Args("comment") comment: CommentDTO,
    @Context("user") { id: userId },
  ) {
    return this.commentService.create(ideaId, userId, comment);
  }

  @Mutation(() => CommentEntity)
  @UseGuards(new AuthGuard())
  public deleteComment(
    @Args({ name: "id", type: () => Int, nullable: false }) id: number,
    @Context("user") { id: userId },
  ) {
    return this.commentService.destroy(id, userId);
  }
}
