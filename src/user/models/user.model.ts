import { Field, ObjectType } from "@nestjs/graphql";
import { Comment } from "src/comment/models/comment.model";
import { Node } from "src/paginnation/models/node.model";
import { Column, Entity, OneToMany } from "typeorm";
import { Article } from '../../article/models/article.model';

@Entity()
@ObjectType() // decorateur obligatoire afin de récuper les données avec graphql
export class UserEntity extends Node{

  @Field(()=>String)
  @Column({unique:true})
  email: string;
  
  @Field(()=>String)
  @Column()
  password: string;

  @Field(()=>String)
  @Column()
  firstName: string;
  
  @Field(()=>String)
  @Column()
  lastName: string;
  
  @Field(()=>String,{nullable:true})
  @Column({nullable:true})
  avatar: string;

  @OneToMany(()=>Article, (target)=>target.author)
  articles: Article[]
  
  @OneToMany(()=>Comment, (target)=>target.author)
  comments: Comment[]
}