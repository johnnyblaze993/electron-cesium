import { Viewer } from "resium";
import { ForwardedRef, forwardRef } from "react";
import { PointEntity, PolygonEntity, SplineEntity, RadarSweepEntity } from "./entities";
import React from "react";

interface CesiumViewerProps {
  coordinates: Array<{ latitude: string; longitude: string }>;
  terrainProvider: Promise<any>;
}

const CesiumViewer = forwardRef(
  ({ coordinates, terrainProvider }: CesiumViewerProps, ref: ForwardedRef<any>) => {
    return (
      <Viewer full terrainProvider={terrainProvider} ref={ref}>
        <PointEntity coordinates={coordinates} />
        <PolygonEntity coordinates={coordinates} />
        <SplineEntity />
        <RadarSweepEntity />
      </Viewer>
    );
  }
);

export default CesiumViewer;
