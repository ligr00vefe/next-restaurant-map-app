import { ILocationType, IStoreType } from '@/interface';
import { atom } from 'recoil';

const DEFAULT_LAT = 35.176448;
const DEFAULT_LNG = 129.079661;
const DEFAULT_ZOOM = 3;

export const mapState = atom({
  key: "map",
  default: null,
  dangerouslyAllowMutability: true,
})

export const currentStoreState = atom<IStoreType | null>({
  key: "store",
  default: null,
})

export const locationState = atom<ILocationType>({
  key: "location",
  default: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
  dangerouslyAllowMutability: true,
})