import { airQualityService } from './data-service.js';

// Constants for AQI level classification
const AQI_LEVELS = {
    good: { max: 50, text: 'Good', className: 'good' },
    moderate: { max: 100, text: 'Moderate', className: 'moderate' },
    unhealthy: { max: 150, text: 'Unhealthy for Sensitive Groups', className: 'unhealthy' },
    veryUnhealthy: { max: 200, text: 'Unhealthy', className: 'very-unhealthy' },
    hazardous: { max: 300, text: 'Hazardous', className: 'hazardous' }
};

// Helper function to determine AQI level
function getAQILevel(aqi) {
    if (aqi <= AQI_LEVELS.good.max) return { text: AQI_LEVELS.good.text, className: AQI_LEVELS.good.className };
    if (aqi <= AQI_LEVELS.moderate.max) return { text: AQI_LEVELS.moderate.text, className: AQI_LEVELS.moderate.className };
    if (aqi <= AQI_LEVELS.unhealthy.max) return { text: AQI_LEVELS.unhealthy.text, className: AQI_LEVELS.unhealthy.className };
    if (aqi <= AQI_LEVELS.veryUnhealthy.max) return { text: AQI_LEVELS.veryUnhealthy.text, className: AQI_LEVELS.veryUnhealthy.className };
    return { text: AQI_LEVELS.hazardous.text, className: AQI_LEVELS.hazardous.className };
}

// DOM Elements
const locationNameEl = document.getElementById('locationName');
const aqiValueEl = document.getElementById('aqiValue');
const pm25ValueEl = document.getElementById('pm25Value');
const pm10ValueEl = document.getElementById('pm10Value');
const tempValueEl = document.getElementById('tempValue');
const humidityValueEl = document.getElementById('humidityValue');
const lastUpdatedEl = document.getElementById('lastUpdated');
const healthAlertsEl = document.getElementById('healthAlerts');
const refreshLocationBtn = document.getElementById('refreshLocation');

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeApp);
refreshLocationBtn.addEventListener('click', refreshLocation);

async function initializeApp() {
    try {
        // Show loading states
        document.getElementById('aqiValue').innerHTML = `
            <span class="number">--</span>
            <span class="label">Loading...</span>
        `;
        document.getElementById('locationName').innerHTML = `
            <i class="fas fa-spinner fa-spin"></i> Loading...
        `;

        // Get and display location info
        const locationInfo = await airQualityService.getLocationInfo();
        document.getElementById('locationName').textContent = 
            `${locationInfo.name}, ${locationInfo.city}`;

        // Get and display current air quality data
        const currentData = await airQualityService.getCurrentData();
        updateUIWithAirQualityData(currentData);
        
        // Update recommendations and nearby stations
        await Promise.all([
            updateHealthRecommendations(),
            updateNearbyStations()
        ]);

    } catch (error) {
        console.error('Error initializing app:', error);
        document.getElementById('locationName').innerHTML = `
            <i class="fas fa-exclamation-circle"></i> Error loading data
        `;
    }
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
        }
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function reverseGeocode(lat, lon) {
    // Implement reverse geocoding using your preferred service
    // Return formatted location name
}

async function fetchAirQualityData(lat, lon) {
    // Implement API call to get air quality data
    // Return processed air quality data
}

function updateUIWithAirQualityData(data) {
    const { aqi, pm25, pm10, temperature, humidity } = data;
    
    // Update AQI display
    const aqiLevel = getAQILevel(aqi);
    const aqiValueEl = document.getElementById('aqiValue');
    aqiValueEl.innerHTML = `
        <span class="number">${aqi}</span>
        <span class="label">${aqiLevel.text}</span>
    `;
    aqiValueEl.className = `aqi-value ${aqiLevel.className}`;
    
    // Update pollutant values with animation
    animateValue('pm25Value', 0, pm25, 1000, 1);
    animateValue('pm10Value', 0, pm10, 1000, 1);
    animateValue('tempValue', 0, temperature, 1000, 0);
    animateValue('humidityValue', 0, humidity, 1000, 0);
    
    // Update timestamp
    document.getElementById('lastUpdated').textContent = 
        `Updated: ${new Date().toLocaleTimeString()}`;
}

// Add value animation function
function animateValue(elementId, start, end, duration, decimals) {
    const element = document.getElementById(elementId);
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    
    let current = start;
    const step = range / (duration / stepTime);
    
    function updateValue() {
        current += step;
        if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
            current = end;
        }
        
        const formattedValue = decimals > 0 ? current.toFixed(decimals) : Math.round(current);
        
        if (elementId === 'tempValue') {
            element.textContent = `${formattedValue}°C`;
        } else if (elementId === 'humidityValue') {
            element.textContent = `${formattedValue}%`;
        } else {
            element.textContent = `${formattedValue} µg/m³`;
        }
        
        if (current !== end) {
            requestAnimationFrame(updateValue);
        }
    }
    
    updateValue();
}

async function updateHealthRecommendations() {
    const recommendations = await airQualityService.getHealthRecommendations();
    const alertList = document.getElementById('healthAlerts');
    
    alertList.innerHTML = recommendations.map(rec => `
        <div class="alert-item ${rec.type}">
            <i class="${rec.icon}"></i>
            <div class="alert-content">
                <p>${rec.text}</p>
                ${rec.type === 'weather' ? `<span class="weather-info">
                    <i class="fas fa-thermometer-half"></i> ${KUMASI_DATA.current.temperature}°C
                    <i class="fas fa-tint"></i> ${KUMASI_DATA.current.humidity}%
                </span>` : ''}
            </div>
        </div>
    `).join('');
}

async function updateNearbyStations() {
    const stations = await airQualityService.getNearbyStations();
    const stationList = document.getElementById('stationList');
    
    stationList.innerHTML = stations.map(station => `
        <div class="station-card">
            <div class="station-header">
                <h3>${station.name}</h3>
                <span class="status ${station.status}"></span>
            </div>
            <div class="station-details">
                <span class="aqi-badge ${getAQILevel(station.aqi).className}">
                    AQI ${station.aqi}
                </span>
                <span class="distance">
                    <i class="fas fa-map-marker-alt"></i> ${station.distance} km
                </span>
                <span class="updated">
                    <i class="fas fa-clock"></i> ${station.lastUpdated}
                </span>
            </div>
        </div>
    `).join('');
}

function handleError(error) {
    console.error('Error:', error);
    // Update UI to show error state
}

async function refreshLocation() {
    const refreshBtn = document.getElementById('refreshLocation');
    refreshBtn.classList.add('rotating');
    await initializeApp();
    refreshBtn.classList.remove('rotating');
} 