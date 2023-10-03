import { Field, ObjectType } from "@nestjs/graphql";
import { Comment } from "src/comment/models/comment.model";
import { Node } from "src/paginnation/models/node.model";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from "typeorm";
import { UserEntity } from '../../user/models/user.model';

@Entity()
@ObjectType()
export class Article extends Node {

  @Field(()=> String)
  @Column()
  title: string
  
  @Field(()=> String)
  @Column()
  description: string

  @Field(()=> String)
  @Column()
  image: string

  @ManyToOne(()=>UserEntity, (user)=>user.articles)
  @JoinColumn()
  author: UserEntity

  @RelationId((self: Article) => self.author)
  readonly authorId: UserEntity['id']
  
  @OneToMany(()=>Comment, (comment)=>comment.author)
  @JoinColumn()
  comments: Comment[]

  // @RelationId((self:Comment)=> self.article)
  // readonly articleId: Article["id"]
}