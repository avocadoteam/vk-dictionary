import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotBlank } from 'src/interceptors/exts/isBlank';

export class FavouriteModel {
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  wordId!: string;
}
