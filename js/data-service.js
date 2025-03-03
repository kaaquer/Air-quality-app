// Mock data for Kumasi Adum
const KUMASI_DATA = {
    location: {
        name: "Adum",
        city: "Kumasi",
        country: "Ghana",
        coordinates: {
            latitude: 6.6885,
            longitude: -1.6244
        }
    },
    current: {
        aqi: 78,
        pm25: 23.5,
        pm10: 45.2,
        temperature: 31,
        humidity: 75,
        timestamp: new Date().toISOString(),
        description: "Moderate",
        pollutants: {
            no2: 15.2,
            so2: 8.4,
            o3: 35.1,
            co: 0.8
        }
    },
    forecast: {
        daily: [
            { date: "2024-03-20", aqi: 75, pm25: 22.1, temperature: 32 },
            { date: "2024-03-21", aqi: 82, pm25: 24.8, temperature: 31 },
            { date: "2024-03-22", aqi: 68, pm25: 19.5, temperature: 30 },
        ]
    },
    nearbyStations: [
        {
            name: "Adum Central",
            distance: 0.2,
            aqi: 78,
            lastUpdated: "2 mins ago"
        },
        {
            name: "Kejetia Market",
            distance: 1.1,
            aqi: 82,
            lastUpdated: "5 mins ago"
        },
        {
            name: "Kumasi Cultural Centre",
            distance: 1.8,
            aqi: 71,
            lastUpdated: "7 mins ago"
        }
    ],
    patterns: {
        weekday: {
            average: 81,
            peak: "2PM - 5PM",
            best: "5AM - 8AM"
        },
        weekend: {
            average: 72,
            peak: "11AM - 2PM",
            best: "6AM - 9AM"
        },
        seasonal: {
            current: "Harmattan",
            impact: "Higher dust levels during morning hours"
        }
    },
    healthRecommendations: [
        {
            type: "general",
            text: "Air quality is moderate. Consider reducing prolonged outdoor activities during peak market hours.",
            icon: "fas fa-exclamation-circle"
        },
        {
            type: "sensitive",
            text: "Dust levels may affect sensitive groups. Wear a mask when visiting market areas.",
            icon: "fas fa-mask"
        },
        {
            type: "activity",
            text: "Best time for outdoor activities is early morning between 5 AM and 8 AM.",
            icon: "fas fa-clock"
        }
    ],
    airQuality: {
        current: {
            aqi: 78,
            level: "Moderate",
            pollutants: {
                pm25: {
                    value: 23.5,
                    unit: "µg/m³",
                    level: "Moderate"
                },
                pm10: {
                    value: 45.2,
                    unit: "µg/m³",
                    level: "Good"
                }
            },
            weather: {
                temperature: 31,
                humidity: 75,
                windSpeed: 3.2,
                windDirection: "SW"
            },
            timestamp: new Date().toISOString()
        },
        stations: [
            {
                id: "KMA-001",
                name: "Adum Central",
                distance: 0.2,
                aqi: 78,
                lastUpdated: "2 mins ago",
                status: "active"
            },
            {
                id: "KMA-002",
                name: "Kejetia Market",
                distance: 1.1,
                aqi: 82,
                lastUpdated: "5 mins ago",
                status: "active"
            },
            {
                id: "KMA-003",
                name: "Kumasi Cultural Centre",
                distance: 1.8,
                aqi: 71,
                lastUpdated: "7 mins ago",
                status: "active"
            }
        ],
        alerts: [
            {
                type: "info",
                icon: "fas fa-info-circle",
                text: "Moderate air quality due to increased market activity. Consider wearing a mask during peak hours."
            },
            {
                type: "recommendation",
                icon: "fas fa-clock",
                text: "Best time for outdoor activities: Early morning (5 AM - 8 AM) when air quality is optimal."
            },
            {
                type: "weather",
                icon: "fas fa-sun",
                text: "High temperature may affect air quality. Stay hydrated and limit prolonged outdoor exposure."
            }
        ]
    }
};

// Simulated API calls
class AirQualityService {
    async getCurrentData() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return KUMASI_DATA.current;
    }

    async getLocationInfo() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return KUMASI_DATA.location;
    }

    async getNearbyStations() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return KUMASI_DATA.nearbyStations;
    }

    async getHealthRecommendations() {
        await new Promise(resolve => setTimeout(resolve, 600));
        return KUMASI_DATA.healthRecommendations;
    }

    async getPatterns() {
        await new Promise(resolve => setTimeout(resolve, 1200));
        return KUMASI_DATA.patterns;
    }

    async getForecast() {
        await new Promise(resolve => setTimeout(resolve, 900));
        return KUMASI_DATA.forecast;
    }
}

export const airQualityService = new AirQualityService(); 