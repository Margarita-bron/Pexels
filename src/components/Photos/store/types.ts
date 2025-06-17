export interface IPhotoSize {
  original: string;
  //large2x: string;
  large: string;
  medium: string;
  //small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface IPhoto {
  src: IPhotoSize;
  photographer: string | undefined;
  id: string;
  author: string;
  download_url: string;
  width: number;
  height: number;
  url: string;
}

export interface PhotoImage {
  photo: IPhoto;
  size: keyof IPhotoSize;
  aspectRatio?: string;
}

export interface IPhotosState {
  photos: IPhoto[];
  loading: boolean;
  error: string | null;
  page: number;
}

export interface PexelsResponse {
  photos: IPhoto[];
  total_results: number;
  page: number;
  per_page: number;
  next_page: string;
}

export interface FetchPhotosParameters {
  query?: string;
  page?: number;
}
export interface FetchPhotosPayload {
  photos: IPhoto[];
  page: number;
}
