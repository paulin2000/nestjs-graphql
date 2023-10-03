import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from './dto/article-create.dto';
import { Article } from './models/article.model';
import { ArticleUpdateInput } from './dto/article-update.dto';
import { ArticleDeleteOutput } from './dto/article-delete.dto';
import {
  ArticlePagination,
  ArticlePaginationArgs,
} from './dto/articles-paginnation.dto';
import { SortDirection } from 'src/paginnation/dto/paginnation.dto';
import { UserEntity } from 'src/user/models/user.model';
import { JWTPayload } from 'src/auth/strategies/jwt.strategy';
import { PaginationArgs } from '../paginnation/dto/paginnation.dto';
import { ArticleCommentsPaginnation } from './dto/article-comment-paginnation.dto';
import { Comment } from '../comment/models/comment.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async articleCreate(
    user: JWTPayload,
    input: ArticleCreateInput,
  ): Promise<ArticleCreateOutput> {
    const newArticle = this.articleRepository.create(input);
    newArticle.author = new UserEntity()
    newArticle.author.id = user.id
    const article = await this.articleRepository.save(newArticle);

    return { article };
  }

  async articleUpdate(
    articleId: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleCreateOutput> {
    const article = await this.articleRepository.findOneOrFail(articleId);
    article.title = input.title;
    article.description = input.description;
    article.image = input.image;
    await article.save();

    return { article };
  }
  a;
  async articleDelete(articleId: Article['id']): Promise<ArticleDeleteOutput> {
    const article = await this.articleRepository.findOneOrFail(articleId);
    await article.remove();
    return { articleId };
  }

  async articleGetById(articleId: Article["id"]): Promise<Article>{
    return await this.articleRepository.findOneOrFail(articleId)
  }
  async articleList(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async articlePagination(
    args: ArticlePaginationArgs,
  ): Promise<ArticlePagination> {
    const qb = this.articleRepository.createQueryBuilder('article');
    qb.take(args.take);
    qb.skip(args.skip);
    if (args.sortBy) {
      console.log(args.sortBy.createdAt !== null);
      if (
        args.sortBy.createdAt !== null &&
        args.sortBy.createdAt !== undefined
      ) {
        console.log('createdat');
        qb.addOrderBy(
          'article.createdAt',
          args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.title !== null && args.sortBy.title !== undefined) {
        qb.addOrderBy(
          'article.title',
          args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
    }
    const [nodes, totalCount] = await qb.getManyAndCount();
    // const [nodes, totalCount] = await this.articleRepository.findAndCount({
    //   skip: args.skip,
    //   take: args.take,
    //   order: {
    //     createdAt: args.sortBy.createdAt===SortDirection.ASC ? 'ASC':'DESC' ,
    //     // title: args.sortBy.title===SortDirection.ASC ? 'ASC' : 'DESC'
    //     // le premier ou le deuxieme pas les autres oubien il y aura conflit
    //   }
    // })
    return { nodes, totalCount };
  }

  async articleCommentsPagination(articleId: Article['id'],args: PaginationArgs):Promise<ArticleCommentsPaginnation>{
 const [nodes, totalCount] = await this.commentRepository.findAndCount({
      skip: args.skip,
      take: args.take,
      where:{
        article: {id: articleId}
      },
      order: {
        createdAt: args.sortBy.createdAt===SortDirection.ASC ? 'ASC':'DESC' ,
        // title: args.sortBy.title===SortDirection.ASC ? 'ASC' : 'DESC'
        // le premier ou le deuxieme pas les autres oubien il y aura conflit
      }
    })
    return {nodes, totalCount}
  }
}
