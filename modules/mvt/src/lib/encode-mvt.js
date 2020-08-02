import {fromGeojson} from './mapbox-vt-pbf/to-vector-tile';

export default function encodeMVT(data, options) {
  return fromGeojson(data, options);
}
