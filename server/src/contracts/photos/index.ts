import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotBlank } from 'src/interceptors/exts/isBlank';

export interface SplashPhoto {
  total: number;
  total_pages: number;
  results: SplashPhotoResult[];
  error?: any;
}

export type SplashPhotoResult = {
  id: string;
  color: string;
  blur_hash: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };

  user: {
    name: string;
    links: {
      html: string;
    };
  };
};

export type WordPhoto = {
  color: string | null;
  blurHash: string;
  url: string;
  userName: string;
  userLink: string;
};

export class WordPhotoModel {
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  wordId!: string;
}
