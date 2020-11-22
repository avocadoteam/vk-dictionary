import { IsNotEmpty, IsString } from 'class-validator';
import { IsBigInt } from 'src/interceptors/exts/isBigInt';
import { IsNotBlank } from 'src/interceptors/exts/isBlank';

export class FavouriteModel {
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsBigInt()
  wordId!: string;
}
