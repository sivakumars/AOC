const fs = require("fs");

const gridOrigin = {
  x: 1000,
  y: 1000
};

const getIntCodeProgram = () => {
  try {
    const data = fs.readFileSync("./input.txt", "utf8");
    const wiresDataList = [];
    data.split("\n").forEach(wireData => {
      wiresDataList.push(wireData.split(","));
    });
    return wiresDataList;
  } catch (err) {
    console.error(err);
  }
};

const getSegmentCoordinates = (segmentData, from) => {
  const direction = segmentData[0];
  const distance = parseInt(segmentData[1]);
  const to = {};
  switch (direction) {
    case "R":
      to["x"] = from["x"] + distance;
      to["y"] = from["y"];
      break;
    case "U":
      to["y"] = from["y"] + distance;
      to["x"] = from["x"];
      break;
    case "L":
      to["x"] = from["x"] - distance;
      to["y"] = from["y"];
      break;
    case "D":
      to["y"] = from["y"] - distance;
      to["x"] = from["x"];
      break;
    default:
      break;
  }
  const segmentCoordinates = {
    from: from,
    to: to,
    direction,
    distance
  };
  return segmentCoordinates;
};

const parseWireSegmentLocation = locationData => {
  return locationData.match(/[a-z]+|[0-9]+/gi);
};

const traceWirePath = wireData => {
  let from = { ...gridOrigin };
  const parsedWireData = wireData.map(segmentLocation => {
    return parseWireSegmentLocation(segmentLocation);
  });
  const wireSegmentCoordinates = parsedWireData.map(segment => {
    let segmentCoordinates = getSegmentCoordinates(segment, from);
    from = segmentCoordinates["to"];
    return segmentCoordinates;
  });
  //console.log("Wire segment coordinates", wireSegmentCoordinates);
  return wireSegmentCoordinates;
};

const getTracedWirePaths = wireDataList => {
  return wireDataList.map(wireData => {
    return traceWirePath(wireData);
  });
};

const calculateIntersectionPointBetweenSegments = (segmentOne, segmentTwo) => {
  const segmentOneStartPoint = segmentOne["from"];
  const segmentOneEndPoint = segmentOne["to"];
  const segmentTwoStartPoint = segmentTwo["from"];
  const segmentTwoEndPoint = segmentTwo["to"];
  let intersectionPoint = {};

  if (
    segmentTwoStartPoint["x"] > segmentOneStartPoint["x"] &&
    segmentTwoStartPoint["x"] < segmentOneEndPoint["x"]
  ) {
    intersectionPoint["x"] = segmentTwoStartPoint["x"];
    intersectionPoint["y"] = segmentOneStartPoint["y"];
  } else if (
    segmentTwoStartPoint["y"] > segmentOneStartPoint["y"] &&
    segmentTwoStartPoint["y"] < segmentTwoEndPoint["y"]
  ) {
    intersectionPoint["x"] = segmentOneStartPoint["x"];
    intersectionPoint["y"] = segmentTwoStartPoint["y"];
  } else {
    intersectionPoint = null;
  }
  return intersectionPoint;
};

const getIntersectionPoints = tracedWirePaths => {
  const totalNoOfWires = tracedWirePaths.length;
  const intersectionPointsList = [];
  for (
    let tracedWirePathIndex = 0;
    tracedWirePathIndex <= totalNoOfWires - 2;
    tracedWirePathIndex++
  ) {
    tracedWirePaths[tracedWirePathIndex].forEach(WireOneSegment => {
      let indexOfWireToBeCheckedForIntersection = tracedWirePathIndex + 1;
      tracedWirePaths[indexOfWireToBeCheckedForIntersection].forEach(
        WireTwoSegment => {
          let intersectionPoint = calculateIntersectionPointBetweenSegments(
            WireOneSegment,
            WireTwoSegment
          );
          if (intersectionPoint) {
            intersectionPointsList.push(intersectionPoint);
          }
        }
      );
    });
  }

  return intersectionPointsList;
};

const computeManhattanDistance = (x1, y1, x2, y2) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

const getClosestPointFromOrigin = intersectionPoints => {
  let minimumValue = Number.MAX_SAFE_INTEGER;
  intersectionPoints.map(intersectionPoint => {
    let distance = computeManhattanDistance(
      gridOrigin["x"],
      gridOrigin["y"],
      intersectionPoint["x"],
      intersectionPoint["y"]
    );
    minimumValue = Math.min(minimumValue, distance);
  });
  console.log("Minimum Distance", minimumValue);
  return minimumValue;
};

const wireDataList = getIntCodeProgram();
const tracedWirePaths = getTracedWirePaths(wireDataList);

const intersectionPointsList = getIntersectionPoints(tracedWirePaths);

const closestPointFromOrigin = getClosestPointFromOrigin(
  intersectionPointsList
);
