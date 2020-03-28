const Client = require("@googlemaps/google-maps-services-js").Client;
const polyline = require('@mapbox/polyline');
const AbstractProvider = require('../AbstractProvider');

class GoogleDirectionsProvider extends AbstractProvider
{
    constructor(options) {
        super(options);
        this.client = new Client({});
    }

    async getRouteCoordinates(origin, destination) {
        const route = await this.getRoute(origin, destination);
        let points = [];

        if (route.legs && route.legs.length > 0) {
            let steps = route.legs[0].steps;
            for (let i = 0; i < steps.length; i++) {
                points = points.concat(polyline.decode(steps[i].polyline.points))
            }
        }

        return points;
    }

    async getRoute(origin, destination) {
        try {
            const response = await this.client.directions({
                params: {
                    origin: origin,
                    destination: destination,
                    key: this.options.key
                },
                timeout: 1000 // milliseconds
            })

            //console.log(response);
            if (response.data.routes.length > 0) {
                return response.data.routes[0];
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
        }

        return false;
    }
}

module.exports = GoogleDirectionsProvider;
