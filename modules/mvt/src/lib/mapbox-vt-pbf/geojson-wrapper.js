// Forked from https://github.com/mapbox/vt-pbf under MIT License Copyright (c) 2015 Anand Thakker

import Point from '@mapbox/point-geometry';
import VectorTileFeature from '../mapbox-vector-tile-js/vector-tile-feature';

class FeatureWrapper {
  constructor(feature, extent) {
    this.id = typeof feature.id === 'number' ? feature.id : undefined;
    this.type = feature.type;
    this.rawGeometry = feature.type === 1 ? [feature.geometry] : feature.geometry;
    this.properties = feature.tags;
    this.extent = extent || 4096;
    this.geometry = [];
  }

  loadGeometry() {
    const rings = this.rawGeometry;
    this.geometry = [];

    for (const ring of rings) {
      const newRing = [];
      for (const coord of ring) {
        newRing.push(new Point(coord[0], coord[1]));
      }
      this.geometry.push(newRing);
    }
    return this.geometry;
  }

  bbox() {
    if (!this.geometry) {
      this.loadGeometry();
    }

    const rings = this.geometry;
    let x1 = Infinity;
    let x2 = -Infinity;
    let y1 = Infinity;
    let y2 = -Infinity;

    for (const ring of rings) {
      for (const coord of ring) {
        x1 = Math.min(x1, coord.x);
        x2 = Math.max(x2, coord.x);
        y1 = Math.min(y1, coord.y);
        y2 = Math.max(y2, coord.y);
      }
    }

    return [x1, y1, x2, y2];
  }

  toGeoJSON(x, y, z) {
    return VectorTileFeature.prototype.toGeoJSON.call(this, x, y, z);
  }
}

// conform to vectortile api
export default class GeoJSONWrapper {
  constructor(features, options) {
    this.options = options || {};
    this.features = features;
    this.length = features.length;
  }

  feature(index) {
    return new FeatureWrapper(this.features[index], this.options.extent);
  }
}
