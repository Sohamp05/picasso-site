export interface Product {
  _id: string;
  title: string;
  category: string;
  description?: string;
  slug: {
    current: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  featured?: boolean;
}
