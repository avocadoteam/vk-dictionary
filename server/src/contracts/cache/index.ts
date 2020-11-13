export const cacheKey = {
  hasPremium: (userId: number) => `${userId}_premium`,
};

export const dayTTL = 60 * 60 * 24;
