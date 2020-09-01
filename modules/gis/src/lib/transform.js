/**
 * Apply transformation to every coordinate of binary features
 *
 * @param  binaryFeatures binary features or a binary geometry
 * @param  fn       Function to call on each coordinate
 * @return          Transformed binary features
 */
export function transformBinaryCoords(binaryFeatures, fn) {
  // binary features object has points, lines, and polygons keys; binary
  // geometry object has a top-level positions key
  const isFeature = binaryFeatures.points || binaryFeatures.lines || binaryFeatures.polygons;

  if (isFeature) {
    for (let binaryFeature of Object.values(binaryFeatures)) {
      binaryFeature = transformBinaryGeometry(binaryFeature, fn);
    }
  } else {
    binaryFeatures = transformBinaryGeometry(binaryFeatures);
  }

  return binaryFeatures;
}

function transformBinaryGeometry(binaryGeometry, fn) {
  const {positions} = binaryGeometry;
  for (let i = 0; i < positions.value.length; i += positions.size) {
    const coord = Array.from(positions.value.subarray(i, i + positions.size));
    const transformedCoord = fn(coord);
    positions.value.set(transformedCoord, i);
  }

  return binaryGeometry;
}

/**
 * Apply transformation to every coordinate of GeoJSON features
 *
 * @param  features Array of GeoJSON features or geometries
 * @param  fn       Function to call on each coordinate
 * @return          Transformed GeoJSON features
 */
export function transformGeoJsonCoords(features, fn) {
  if (!features || features.length === 0) {
    return features;
  }

  const isFeature = features[0] && features[0].geometry;

  if (isFeature) {

  }

  for (const feature of features) {
    feature.geometry.coordinates = coordMap(feature.geometry.coordinates, fn);
  }
  return features;
}

function coordMap(array, fn) {
  if (isCoord(array)) {
    return fn(array);
  }

  return array.map(item => {
    return coordMap(item, fn);
  });
}

function isCoord(array) {
  return Number.isFinite(array[0]) && Number.isFinite(array[1]);
}
