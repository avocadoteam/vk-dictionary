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
