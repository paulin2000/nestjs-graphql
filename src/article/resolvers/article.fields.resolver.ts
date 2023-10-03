import { Args, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Article } from '../models/article.model';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/models/user.model';
import { ArticleCommentsPaginnation } from '../dto/article-comment-paginnation.dto';
import { PaginationArgs } from '../../paginnation/dto/paginnation.dto';
import { ArticleService } from '../article.service';

@Resolver(Article)
export class ArticleFieldsResolver {
  constructor(
    private readonly userService: UserService,
    private readonly articleService: ArticleService
  ) { }

  @ResolveField(() => UserEntity)
  async author(@Parent() article: Article) {
    if (!article.authorId) {
      return null
    }
    try {
      return await this.userService.getUserById(article.authorId)
    } catch (e) {
      return null
    }
  }

  @ResolveField(() => ArticleCommentsPaginnation)
  async comments(@Parent() article: Article, @Args() args: PaginationArgs){
    return await this.articleService.articleCommentsPagination(article.id,args)
  }
}