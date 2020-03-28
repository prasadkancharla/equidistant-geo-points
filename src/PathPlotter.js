
const ProviderFactory = require('./services/RoutesAPI/ProviderFactory');
const PathInterpolationUtil = require('../lib/PathInterpolation');
const Config = require('../config/Config');
const Utils = require('../lib/Utils');

class PathPlotter
{
    async getPath(origin, destination, interval) {
        let provider = ProviderFactory.get(Config.mapsApiProvider);
        const points = await provider.getRouteCoordinates(origin, destination);

        return this._getEqualDistancePoints(points, interval);
    }

    _getEqualDistancePoints(points, interval) {
        if (points.length <= 1) {
            return points;
        }

        let finalPoints = [points[0]], lastPoint = points[0]; //, totalDistance = 0;
        let pathInterpolationUtil= new PathInterpolationUtil();

        for (var i = 1; i < (points.length - 1); i++) {
            let lat1 = lastPoint[0], lng1 = lastPoint[1], lat2 = points[i][0], lng2 = points[i][1];
            let dist = Math.round(Utils.getDistance(lat1, lng1, lng1, lng2, 'K') * 1000, 2);
            if (dist > interval) {
                let nextPoints = pathInterpolationUtil.getCoordinates(lat1, lng1, lat2, lng2, interval);

                for (let j = 1; j < nextPoints.length; j++) {
                    let nextStepDistance = Math.round(Utils.getDistance(lastPoint[0], lastPoint[1], nextPoints[j][0], nextPoints[j][1], 'K') * 1000, 2);
 
                    if (nextStepDistance == interval) {
                        finalPoints.push(nextPoints[j]);
                        lastPoint = nextPoints[j];
                    }
                }
            }
        }

        return finalPoints;
    }
}

module.exports = PathPlotter;