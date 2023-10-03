import { Resolver, Query, Args } from '@nestjs/graphql';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { ArticlePagination, ArticlePaginationArgs } from '../dto/articles-paginnation.dto';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(
    private readonly articleService: ArticleService
  ) {}

  @Query(()=>[Article])
  async articleList(){
    return this.articleService.articleList()
  }
  @Query(()=>ArticlePagination)
  async articlePagination(@Args() args: ArticlePaginationArgs){
    return await this.articleService.articlePagination(args)
  }


}