export enum Skeys {
  appUser = 'appUser',
}

export enum AppUser {
  Yes = 'yes',
  No = 'no',
}

export enum FetchingStateName {
  CheckAds = 'check_ads',
  UserSKeys = 'user_storage_keys',
  SearchExpDict = 'search_exp_dict',
  MostFrequentWords = 'most_frequent_words',
  ToggleFavourite = 'toggleFavourite',
  UserFavourites = 'user_favourites',
  WordPhotos = 'word_photos',
  WordInfo = 'word_info',
  WordOfDay = 'word_of_day',
  Premium = 'premium',
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

export enum SelectedHomeSlide {
  Favourites = 0,
  ExpDictionary = 1,
}
