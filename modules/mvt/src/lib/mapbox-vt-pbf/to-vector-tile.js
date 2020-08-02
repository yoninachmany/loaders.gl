// Forked from https://github.com/mapbox/vt-pbf under MIT License Copyright (c) 2015 Anand Thakker

import Pbf from 'pbf';
import writeTile from './write-tile';
import GeoJSONWrapper from './geojson-wrapper';
import {normalizeGeojson} from '../utils/geojson-utils';

/**
 * Serialize a map of geojson layers
 * loaders.gl addition
 *
 * @param {object | object[]} geojson
 * @param {object} [options] - An object specifying the vector-tile specification version and extent that were used to create `layers`.
 * @param {number} [options.extent=4096] - Extent of the vector tile
 * @return {ArrayBuffer} uncompressed, pbf-serialized tile data
 */
export function fromGeojson(geojson, options) {
  options = options || {};
  geojson = normalizeGeojson(geojson);
  const layer = new GeoJSONWrapper(geojson.features);

  return fromVectorTileJs({layers: {geojsonLayer: layer}});
}

/**
 * Serialized a geojson-vt-created tile to pbf.
 *
 * @param {object} vtLayers - An object mapping layer names to geojson-vt-created vector tile objects
 * @param {object} [options] - An object specifying the vector-tile specification version and extent that were used to create `layers`.
 * @param {number} [options.version=1] - Version of vector-tile spec used
 * @param {number} [options.extent=4096] - Extent of the vector tile
 * @return {ArrayBuffer} uncompressed, pbf-serialized tile data
 */
export function fromGeojsonVt(vtLayers, options) {
  options = options || {};
  const layers = {};
  for (const key in vtLayers) {
    layers[key] = new GeoJSONWrapper(vtLayers[key].features, options);
    layers[key].name = key;
    layers[key].version = options.version;
    layers[key].extent = options.extent;
  }
  return fromVectorTileJs({layers});
}

/**
 * Serialize a vector-tile-js-created tile to pbf
 *
 * @param {object} tile
 * @return {ArrayBuffer} uncompressed, pbf-serialized tile data
 */
export function fromVectorTileJs(tile) {
  const pbf = new Pbf();
  writeTile(tile, pbf);
  const uint8Array = pbf.finish();
  // TODO - make sure no byteOffsets/byteLenghts are used?
  return uint8Array.buffer.slice(uint8Array.byteOffset, uint8Array.byteOffset + uint8Array.byteLength);
}
