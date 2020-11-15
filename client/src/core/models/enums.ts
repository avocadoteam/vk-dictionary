export enum Skeys {
  appUser = 'appUser',
}

export enum AppUser {
  Yes = 'yes',
  No = 'no',
}

export enum FetchingStateName {
  Ads = 'ads',
  UserSKeys = 'user_storage_keys',
  SearchExpDict = 'search_exp_dict',
  MostFrequentWords = 'most_frequent_words',
  ToggleFavourite = 'toggleFavourite',
  UserFavourites = 'user_favourites',
}

export enum FetchingStatus {
  Updating = 1,
  Ready,
  Error,
}

export enum MainView {
  Home = 'home',
  Word = 'word',
  Offline = 'offline',
}
