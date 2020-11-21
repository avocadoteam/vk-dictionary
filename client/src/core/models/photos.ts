export type WordPhoto = {
  color: string;
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
