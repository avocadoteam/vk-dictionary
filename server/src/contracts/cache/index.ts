export const cacheKey = {
  hasPremium: (userId: number) => `${userId}_premium`,
  mostFreqWords: (dict: string) => `mostFreqWords_${dict}`,
  splashAttemptsToFetchPhotos: 'splashAttemptsToFetchPhotos',
  wordPhotoOfTheDay: 'wordPhotoOfTheDay',
};

export const minuteTTL = 60;
export const hourTTL = minuteTTL * 60;
export const dayTTL = hourTTL * 24;
