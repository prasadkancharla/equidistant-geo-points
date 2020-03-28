class AbstractProvider
{
    constructor(options) {
        this.options = options;
    }

    // abstract
    async getRouteCoordinates(origin, destination) {}
}

module.exports = AbstractProvider;