import { point, lineString, featureCollection, Feature, LineString, feature } from "@turf/turf";

function convertToGeoJSON(coordinates: number[][]) {
  const points = coordinates.map(coord => point(coord));
	const line = lineString(coordinates);
	const combined = { ...points, line};
	// @ts-ignore
	return featureCollection([...points, line]);
}

export default convertToGeoJSON;


/*
* https://deck.gl/docs/api-reference/layers/geojson-layer
// */
// const {DeckGL, GeoJsonLayer} = deck;

// const layer = new GeoJsonLayer({
//   id: 'GeoJsonLayer',
//   data: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[105.84212921674695,21.005859155053443]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[105.84140586853027,21.006549352114526]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[105.84110736846924,21.0062066988205]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[105.8420147895813,21.005987019085254]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[105.84219789505005,21.00645791598784]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[105.84212921674695,21.005859155053443],[105.84140586853027,21.006549352114526],[105.84110736846924,21.0062066988205],[105.8420147895813,21.005987019085254],[105.84219789505005,21.00645791598784]]}}]},
  
//   /* props from GeoJsonLayer class */
  
//   // elevationScale: 1,
//   extruded: true,
//   filled: true,
//   getElevation: 20,
//   getFillColor: [160, 160, 180, 200],
//   // getIconAngle: 0,
//   // getIconColor: [0, 0, 0, 255],
//   // getIconPixelOffset: [0, 0],
//   // getIconSize: 1,
//   getLineColor: f => {
//     const hex = f.properties.color;
//     // convert to RGB
//     return hex ? hex.match(/[0-9a-f]{2}/g).map(x => parseInt(x, 16)) : [0, 0, 0];
//   },
//   getLineWidth: 8,
//   getPointRadius: 12,
//   getText: f => f.properties.name,
//   // getTextAlignmentBaseline: 'center',
//   // getTextAnchor: 'middle',
//   // getTextAngle: 0,
//   // getTextBackgroundColor: [255, 255, 255, 255],
//   // getTextBorderColor: [0, 0, 0, 255],
//   // getTextBorderWidth: 0,
//   // getTextColor: [0, 0, 0, 255],
//   // getTextPixelOffset: [0, 0],
//   getTextSize: 12,
//   // iconAlphaCutoff: 0.05,
//   // iconAtlas: null,
//   // iconBillboard: true,
//   // iconMapping: {},
//   // iconSizeMaxPixels: Number.MAX_SAFE_INTEGER,
//   // iconSizeMinPixels: 0,
//   // iconSizeScale: 1,
//   // iconSizeUnits: 'pixels',
//   // lineBillboard: false,
//   // lineCapRounded: false,
//   // lineJointRounded: false,
//   // lineMiterLimit: 4,
//   // lineWidthMaxPixels: Number.MAX_SAFE_INTEGER,
//   lineWidthMinPixels: 2,
//   // lineWidthScale: 1,
//   // lineWidthUnits: 'meters',
//   // material: true,
//   // pointAntialiasing: true,
//   // pointBillboard: false,
//   // pointRadiusMaxPixels: Number.MAX_SAFE_INTEGER,
//   // pointRadiusMinPixels: 0,
//   // pointRadiusScale: 1,
//   pointRadiusUnits: 'pixels',
//   pointType: 'circle+text',
//   stroked: false,
//   // textBackground: false,
//   // textBackgroundPadding: [0, 0, 0, 0],
//   // textBillboard: true,
//   // textCharacterSet: [' ', '!', '"', '#', '$', '%', '&', ''', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', ''],
//   // textFontFamily: 'Monaco, monospace',
//   // textFontSettings: {},
//   // textFontWeight: 'normal',
//   // textLineHeight: 1,
//   // textMaxWidth: -1,
//   // textOutlineColor: [0, 0, 0, 255],
//   // textOutlineWidth: 0,
//   // textSizeMaxPixels: Number.MAX_SAFE_INTEGER,
//   // textSizeMinPixels: 0,
//   // textSizeScale: 1,
//   // textSizeUnits: 'pixels',
//   // textWordBreak: 'break-word',
//   // wireframe: false,
  
//   /* props inherited from Layer class */
  
//   autoHighlight: true,
//   // coordinateOrigin: [0, 0, 0],
//   // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
//   // highlightColor: [0, 0, 128, 128],
//   // modelMatrix: null,
//   // opacity: 1,
//   pickable: true,
//   // visible: true,
//   // wrapLongitude: false,
// });

// new DeckGL({
//   mapStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
//   initialViewState: {
//     longitude: 105.84212921674695,
//     latitude: 21.005859155053443,
//     zoom: 17,
//     maxZoom: 20,
//     pitch: 30,
//     bearing: 0
//   },
//   controller: true,
//   getTooltip: ({object}) => object && (object.properties.name || object.properties.station),
//   layers: [layer]
// });
  