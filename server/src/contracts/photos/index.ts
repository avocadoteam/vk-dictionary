import { IsNotEmpty, IsString } from 'class-validator';
import { IsBigInt } from 'src/interceptors/exts/isBigInt';
import { IsNotBlank } from 'src/interceptors/exts/isBlank';

export interface SplashPhoto {
  total: number;
  total_pages: number;
  results: SplashPhotoResult[];
  error?: any;
}
export interface Translation {
  translations: [
    {
      translation: string;
    },
  ];
  word_count: number;
  character_count: number;
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
export type WordPhotoOfTheDay = {
  photo: WordPhoto;
  name: string;
  wordId: string;
};

export class WordPhotoModel {
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsBigInt()
  wordId!: string;
}
