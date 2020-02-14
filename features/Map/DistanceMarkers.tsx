import React, { useEffect, useState } from 'react';
import * as turf from '@turf/turf';
import styled from 'styled-components';
import { Marker } from 'react-map-gl';

interface Props {
  lines: number[][][];
  units: string;
}

const DistanceMarkers: React.FC<Props> = ({ lines, units }) => {
  const [distanceMarkers, setDistanceMarkers] = useState<number[][]>([]);

  useEffect(() => {
    // calculate distance markers
    if (lines.length > 0) {
      const line = turf.lineString(lines.flat());
      // @ts-ignore
      let routeDistance = turf.length(line, { units });
      routeDistance = Math.floor(routeDistance);
      const markers = [];

      if (routeDistance !== 0) {
        for (let i = 0; i < routeDistance + 1; i++) {
          // @ts-ignore
          const segment = turf.along(line, i, { units });

          if (i !== 0) {
            markers.push(segment.geometry.coordinates);
          }
        }
        setDistanceMarkers(markers);
      } else {
        setDistanceMarkers([]);
      }
    } else if (lines.length === 0 && distanceMarkers.length > 0) {
      // clear points
      setDistanceMarkers([]);
    }
  }, [lines, units]);

  return (
    <>
      {distanceMarkers.map((point, i) => (
        <Marker key={i} longitude={point[0]} latitude={point[1]}>
          <DistanceMarker>{i + 1}</DistanceMarker>
        </Marker>
      ))}
    </>
  );
};

const DistanceMarker = styled.div`
  font-size: 1rem;
  line-height: 1;
  background-color: #fff;
  padding: 1px 2px;
  border-radius: 2px;
  border: 2px solid ${props => props.theme.colors.indigo[500]};
  transform: translate3d(-50%, -50%, 0);
`;

export default DistanceMarkers;
