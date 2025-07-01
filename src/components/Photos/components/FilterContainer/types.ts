import { IPhotoOrientationValues, IPhotoSizeValues } from '../../store/types';

export interface IFiltersProperties {
  orientation: keyof IPhotoOrientationValues | '';
  size: keyof IPhotoSizeValues | '';
  color: string;
}
