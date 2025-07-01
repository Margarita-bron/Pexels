export interface IPhotoSize {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
  square: string;
}

export interface IPhotoSizeValues {
  large: string;
  medium: string;
  small: string;
}

export interface IPhotoOrientationValues {
  portrait: string;
  landscape: string;
  square: string;
}

export interface IPhoto {
  src: IPhotoSize;
  photographer: string | undefined;
  photographer_url: string;
  id: string;
  author: string;
  download_url: string;
  width: number;
  height: number;
  url: string;
  avg_color: string;
  size: keyof IPhotoSize;
}

export interface IParameters {
  query?: string;
  page?: number;
  per_page?: number;
  orientation: keyof IPhotoOrientationValues | '';
  size: keyof IPhotoSizeValues | '';
  color: string;
}

export interface ISearchParameters {
  query: string;
  page?: number;
  per_page?: number;
  orientation: keyof IPhotoOrientationValues | '';
  size: keyof IPhotoSizeValues | '';
  color: string;
}

export interface IPatch {
  id: string;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  [key: string]: unknown;
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
