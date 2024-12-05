// cesiumConfig.ts
import { Ion, createWorldTerrainAsync } from 'cesium';

(window as any).CESIUM_BASE_URL = './cesium';

Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_ION_ACCESS_TOKEN || '';

export const terrainProvider = createWorldTerrainAsync();
