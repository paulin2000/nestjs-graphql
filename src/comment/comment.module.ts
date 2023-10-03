import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './models/comment.model';
import { ArticleModule } from '../article/article.module';
import { UserModule } from '../user/user.module';
import { CommentMutationsResolver } from './resolvers/comment.mutations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ArticleModule, UserModule],
  providers: [CommentService,CommentMutationsResolver],
  exports:[CommentService]
})
export class CommentModule { }
