import { Field, ObjectType } from "@nestjs/graphql";
import { Pagination } from '../../paginnation/dto/paginnation.dto';
import { Comment } from '../../comment/models/comment.model';

@ObjectType()
 export class ArticleCommentsPaginnation extends Pagination{
  @Field(()=>Comment)
  nodes: Comment[]
 }