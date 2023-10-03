import { InputType, ObjectType } from '@nestjs/graphql';
import { ArticleCreateInput, ArticleCreateOutput } from './article-create.dto';

@InputType() // objet d'entrée
export class ArticleUpdateInput extends ArticleCreateInput {
 
}

@ObjectType() //objet de sortie
export class ArticleUpdateOutput extends ArticleCreateOutput {
 
}