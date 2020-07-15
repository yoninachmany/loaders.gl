export type KnownLoadOptions = {
  nothrow: boolean;
  metadata: boolean;
  /** @deprecated no longer needed */
  dataType?: string;
  /** @deprecated use 'baseUri' */
  uri?: string;
  /**  */
  fetch?: {
    method?: string;
    headers?: object | Headers;
    body?: ReadableStream;
    mode?: any;
    credentials?: any;
    cache?: any;
    redirect?: any;
    referrer?: any;
    referrerPolicy?: any;
    integrity?: any;
    keepalive?: any;
    signal?: any;
  };
  imagebitmap?: {
    /** Specifies whether the image should be presented as is or flipped vertically. Either none (default) or flipY. */
    imageOrientation: 'none' | 'flipY';
    /** Specifies whether the bitmap's color channels should be premultiplied by the alpha channel. */
    premultiplyAlpha: 'none' | 'premultiply' | 'default';
    /** Specifies whether the image should be decoded using color space conversion. Either none or default (default).
     * The value default indicates that implementation-specific behavior is used. */
    colorSpaceConversion: 'none' | 'default';
    /** A long integer that indicates the output width. */
    resizeWidth: number;
    /** A long integer that indicates the output height. */
    resizeHeight: number;
    /** Specifies the algorithm to be used for resizing the input to match the output dimensions. One of pixelated, low (default), medium, or high. */
    resizeQuality: 'pixelated' | 'low' | 'medium' | 'high';
  };
  // Warn if fetch options are used on top-level
  method?: string;
  headers?: object | Headers;
  body?: ReadableStream;
  mode?: any;
  credentials?: any;
  cache?: any;
  redirect?: any;
  referrer?: any;
  referrerPolicy?: any;
  integrity?: any;
  keepalive?: any;
  signal?: any;
};

export type LoadOptions = Exclude<{[key: string]: object}, keyof KnownLoadOptions>;
