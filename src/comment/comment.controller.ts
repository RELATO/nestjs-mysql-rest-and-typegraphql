import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Delete,
  Query,
} from "@nestjs/common";

import { CommentService } from "./comment.service";
import { AuthGuard } from "../shared/auth.guard";
import { User } from "../user/user.decorator";
import { CommentDTO } from "./dto/comment.dto";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get("idea/:id")
  public showCommentsByIdea(
    @Param("id") idea: number,
    @Query("page") page: number,
  ) {
    return this.commentService.showByIdea(idea, page);
  }

  @Get("user/:id")
  public showCommentsByUser(
    @Param("id") user: number,
    @Query("page") page: number,
  ) {
    return this.commentService.showByUser(user, page);
  }

  @Post("idea/:id")
  @UseGuards(new AuthGuard())
  public createComment(
    @Param("id") idea: number,
    @User("id") user: number,
    @Body() data: CommentDTO,
  ) {
    return this.commentService.create(idea, user, data);
  }

  @Get(":id")
  public showComment(@Param("id") id: number) {
    return this.commentService.show(id);
  }

  @Delete(":id")
  @UseGuards(new AuthGuard())
  public destroyComment(@Param("id") id: number, @User("id") user: number) {
    return this.commentService.destroy(id, user);
  }
}
