export const cacheKey = {
  hasPremium: (userId: number) => `${userId}_premium`,
  mostFreqWords: (dict: string) => `mostFreqWords_${dict}`,
  splashAttemptsToFetchPhotos: 'splashAttemptsToFetchPhotos',
  wordPhotoOfTheDay: 'wordPhotoOfTheDay',
  charTranslatesInMonth: 'charTranslatesInMonth',
};

export const minuteTTL = 60;
export const hourTTL = minuteTTL * 60;
export const dayTTL = hourTTL * 24;
export const monthTTL = dayTTL * 30;
