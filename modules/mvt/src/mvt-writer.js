import encodeMVT from './lib/encode-mvt';

export const MVTWriter = {
  name: 'Images',
  extensions: ['jpeg'],
  options: {
    image: {
      mimeType: 'image/png',
      jpegQuality: null
    }
  },
  encode: encodeMVT
};
