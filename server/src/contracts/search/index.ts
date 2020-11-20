import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsNotBlank } from 'src/interceptors/exts/isBlank';

export const languageConfig = 'english';

export type Shape = {
  name: string;
  defenition: string;
  plainDefenition: string;
};

export type SearchResult = {
  id: string;
  definition: string;
};

export class SearchModel {
  @IsString()
  @IsNotEmpty()
  @Length(3, 35)
  @IsNotBlank()
  query!: string;
}
