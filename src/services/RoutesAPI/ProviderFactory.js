const GoogleDirectionsProvider = require('./providers/GoogleDirectionsProvider')

class ProviderFactory
{
    static get(providerConfig) {
        switch (providerConfig.provider) {
            case 'GoogleAPI':
                return new GoogleDirectionsProvider(providerConfig.options);
        }
        
        throw new Exception("Invalid Provider");
    }
}

module.exports = ProviderFactory;