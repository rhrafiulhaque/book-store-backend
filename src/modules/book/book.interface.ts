import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  reviews: IReview[];
};

export type IReview = {
  reviewerName: string;
  review: string;
};

export type BookModel = Model<IBook>;
