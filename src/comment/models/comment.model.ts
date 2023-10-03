import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/paginnation/models/node.model';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { UserEntity } from '../../user/models/user.model';
import { Article } from '../../article/models/article.model';

@Entity()
@ObjectType()
export class Comment extends Node {
  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn()
  author: UserEntity;

  @RelationId((self: Comment) => self.author)
  readonly authorId: UserEntity['id'];

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn()
  article: Article;

  @RelationId((self: Comment) => self.author)
  readonly articleId: Article['id'];

  @Column()
  @Field()
  message: string;
}
