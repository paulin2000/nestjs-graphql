import { Args, Mutation, Resolver, ID } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import {
  ArticleCreateOutput,
  ArticleCreateInput,
} from '../dto/article-create.dto';
import { Article } from '../models/article.model';
import {
  ArticleUpdateOutput,
  ArticleUpdateInput,
} from '../dto/article-update.dto';
import { ArticleDeleteOutput } from '../dto/article-delete.dto';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { JWTPayload } from 'src/auth/strategies/jwt.strategy';

@Resolver(Article)
@UseGuards(JwtAuthGuard)
export class ArticleMutationResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleCreateOutput)
  async articleCreate(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: ArticleCreateInput,
  ) {
    return this.articleService.articleCreate(user,input);
  }

  @Mutation(() => ArticleUpdateOutput)
  async articleUpdate(
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.articleService.articleUpdate(articleId, input);
  }

  @Mutation(() => ArticleDeleteOutput)
  async articleDelete(@Args({ name: 'articleId', type: () => ID }) articleId) {
    return this.articleService.articleDelete(articleId);
  }
}
