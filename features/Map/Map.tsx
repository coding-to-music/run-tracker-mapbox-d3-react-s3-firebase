import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import styled from 'styled-components';
import WebMercatorViewport from 'viewport-mercator-project';
import * as turfHelpers from '@turf/helpers';
// import center from '@turf/center';
import bbox from '@turf/bbox';

import { RootState } from '../../app/rootReducer';
import { AppDispatch } from '../../app/store';
// import { addPoint, addRoute } from './routeReducer';
import {
  addPoint,
  addRoute,
  updateRouteAfterDrag,
  updateStartAfterDrag,
  fetchSinglePoint,
} from './routeSlice';

import PolylineOverlay from './PolylineOverlay';
import SvgOverlay from './SvgOverlay';
import Controls from './Controls';
import Pin from './Pin';

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

const Map = () => {
  const [clipPath, setClipPath] = useState<boolean>(false);
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 34.105999576,
    longitude: -117.718497126,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  const dispatch: AppDispatch = useDispatch();
  const { points } = useSelector((state: RootState) => ({
    points: state.route.present.points,
  }));
  const { lines } = useSelector((state: RootState) => ({
    lines: state.route.present.lines,
  }));

  const handleClick = event => {
    // if (event.target.classList.contains("mapboxgl-ctrl-icon")) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     updateViewport({
    //       ...viewport,
    //       longitude: position.coords.longitude,
    //       latitude: position.coords.latitude
    //     });
    //   });
    //   return;
    // }

    const [newLong, newLat] = event.lngLat;

    if (points.length) {
      const newPoint = [newLong, newLat];
      const [startLong, startLat] = points.length
        ? points[points.length - 1]
        : [null, null];

      dispatch(
        addRoute({
          newPoint,
          newLat,
          newLong,
          startLat,
          startLong,
          clipPath,
        })
      );
    } else {
      dispatch(fetchSinglePoint([newLong, newLat]));
    }
  };

  const onMarkerDragEnd = (
    newLngLat: number[],
    point: number[],
    pointIndex: number
  ) => {
    const waypoints: number[][] = [];
    const lineIndices: number[] = [];

    // If only one point, update that points position
    if (points.length === 1) {
      dispatch(updateStartAfterDrag(newLngLat));
      // else handle cases for for multiple points, beginning, middle, and end
    } else {
      if (pointIndex === 0) {
        // If you drag deginning point
        waypoints.push(newLngLat, points[1]);
        lineIndices.push(0);
      } else if (pointIndex === lines.length) {
        // If you drag the end point
        waypoints.push(points[points.length - 2], newLngLat);
        lineIndices.push(pointIndex);
      } else {
        // if you drag a middle point
        waypoints.push(
          points[pointIndex - 1],
          newLngLat,
          points[pointIndex + 1]
        );
        lineIndices.push(pointIndex - 1, pointIndex);
      }

      dispatch(
        updateRouteAfterDrag(
          newLngLat,
          point,
          pointIndex,
          waypoints,
          lineIndices
        )
      );
    }
  };

  const onMarkerDrag = (event, index: number) => {
    // console.log(event.lngLat);
  };

  return (
    <MapContainer>
      <Controls {...{ setClipPath, clipPath }} />
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        reuseMap={true}
        width={'100%'}
        height={'100%'}
        style={{ display: 'flex', flex: '1' }}
        onClick={handleClick}
        onViewportChange={viewport => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/outdoors-v10"
      >
        <PolylineOverlay points={lines} />
        {points.map((point, i) => (
          <Marker
            key={i}
            longitude={point[0]}
            latitude={point[1]}
            offsetTop={-20}
            offsetLeft={-10}
            draggable
            onDragStart={() => {}}
            onDrag={event => onMarkerDrag(event, i)}
            onDragEnd={event => onMarkerDragEnd(event.lngLat, point, i)}
          >
            <Pin size={20} />
          </Marker>
        ))}
      </ReactMapGL>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default Map;