export interface Product {
  id: string;
  description: string;
  imageUrl: string;
}

export const productsMock: Product[] = [
  {
    id: '1',
    description: 'Fencing Gloves',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '2',
    description: 'Fencing Mask',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '3',
    description: 'Epee',
    imageUrl: 'https://source.unsplash.com/random',
  },
];
