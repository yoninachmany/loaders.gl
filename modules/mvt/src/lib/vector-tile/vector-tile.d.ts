export type VectorTileType = 'Unknown' | 'Point' | 'LineString' | 'Polygon';

export type VectorTileFeature = {

  properties: object;
  extent: any;
  type: number;

	loadGeometry(); any;
  bbox(): [number, number, number, number];
	toGeoJSON(x, y, z): object;
}

export type VectorTileLayer = {
  // Public
  // version?: number;
  // name?: string;
  // extent?: number;
  version: number;
  name: string;
  extent: number;
  length: number;

  constructor(pbf, end);

	/** return feature `i` from this layer as a `VectorTileFeature` */
	feature(i: number): VectorTileFeature;
}

export type VectorTile = {
  layers: {[key: string]: VectorTileLayer};
}
