import { Viewer } from "resium";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { PointEntity, PolygonEntity, SplineEntity, RadarSweepEntity, DomeEntity, TargetInSightEntity, DashedLineEntity, RhumbLineEntity } from "./entities";
import React from "react";
import { Cesium3DTileset } from "resium";
import { IonResource } from "cesium";


interface CesiumViewerProps {
  coordinates: Array<{ latitude: string; longitude: string }>;
  terrainProvider: Promise<any>;
  activeTilesetId: number | null;
}

const CesiumViewer = forwardRef(
  ({ coordinates, terrainProvider, activeTilesetId }: CesiumViewerProps, ref: ForwardedRef<any>) => {
    const [tilesetUrl, setTilesetUrl] = useState<string | null>(null);


    useEffect(() => {
      if (activeTilesetId) {
        IonResource.fromAssetId(activeTilesetId)
          .then((resource) => {
            setTilesetUrl(resource.url);
          })
          .catch((error) => console.error("Error loading tileset:", error));
      }
    }, [activeTilesetId]);


    return (
      <Viewer full terrainProvider={terrainProvider} ref={ref}>
     {tilesetUrl && <Cesium3DTileset key={tilesetUrl} url={tilesetUrl} />}
        <PointEntity coordinates={coordinates} />
        <PolygonEntity coordinates={coordinates} />
        <SplineEntity />
        <RadarSweepEntity />
        <DomeEntity />
        <TargetInSightEntity />
        <DashedLineEntity />
        <RhumbLineEntity />
      </Viewer>
    );
  }
);

export default CesiumViewer;
