import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentService } from '../comment.service';
import { Comment } from '../models/comment.model';
import { CurrentUser, JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CommentCreateOutput, CommentCreateInput } from '../dto/comment-create.dto';
import { JWTPayload } from 'src/auth/strategies/jwt.strategy';

@Resolver(Comment)
export class CommentMutationsResolver {
  constructor(
    private readonly commentService: CommentService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentCreateOutput)
  async commentCreate(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: CommentCreateInput
  ) {
    return this.commentService.commentCreate(user, input)
  }

}