export function normalizeGeojson(geojson) {
  // Array of features
  if (Array.isArray(geojson)) {
    return {
      type: 'FeatureCollection',
      features: geojson
    };
  }
  // A single feature
  if (geojson.type !== 'FeatureCollection') {
    return {
      type: 'FeatureCollection',
      features: [geojson]
    };
  }
  return geojson;
}
