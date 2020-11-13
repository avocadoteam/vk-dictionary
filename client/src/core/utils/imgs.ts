export const getImage = (src: string) =>
  new Promise<HTMLImageElement>((res, rej) => {
    const image = new Image();

    image.onload = () => res(image);
    image.crossOrigin = 'anonymous';
    image.onstalled = (e) => {
      console.log('Failed to fetch data, but trying.', e);
      rej(e);
    };
    image.onerror = (e) => {
      console.log('Failed to fetch data, error.', e);
      rej(e);
    };
    image.src = src;
  });
