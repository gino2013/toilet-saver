// Global variables
let map;
let currentLocation = null;
let currentLanguage = 'zh';
let toiletMarkers = [];
let userMarker = null;
let currentToilets = [];

// Background options
const backgroundOptions = {
    'forest-path': {
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        name: { zh: '森林小徑', en: 'Forest Path' }
    },
    'mountain-lake': {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        name: { zh: '山湖景色', en: 'Mountain Lake' }
    },
    'soft-meadow': {
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        name: { zh: '柔和草地', en: 'Soft Meadow' }
    },
    'misty-forest': {
        url: 'https://images.unsplash.com/photo-1418489098061-ce87b5dc3aee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        name: { zh: '薄霧森林', en: 'Misty Forest' }
    },
    'sunny-park': {
        url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        name: { zh: '陽光公園', en: 'Sunny Park' }
    },
    'animated-nature': {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        name: { zh: '動態自然', en: 'Animated Nature' },
        animated: true
    }
};

// Language translations
const translations = {
    zh: {
        'Find Nearest Public Toilets': '找到最近的公廁',
        'Use My Location': '使用我的位置',
        'Enter address or location...': '輸入地址或地點...',
        'Nearby Public Toilets': '附近的公廁',
        'results': '個結果',
        'Wheelchair Accessible': '無障礙設施',
        'Free to Use': '免費使用',
        'Open Now': '現在開放',
        'Searching for nearby toilets...': '正在搜尋附近的公廁...',
        'Getting your location...': '正在取得您的位置...',
        'Error': '錯誤',
        'OK': '確定',
        'Location access denied': '位置存取被拒絕',
        'Please enable location access to find nearby toilets': '請啟用位置存取功能以找到附近的公廁',
        'Location not available': '無法取得位置',
        'Your browser does not support geolocation': '您的瀏覽器不支援地理位置功能',
        'Failed to get location': '無法取得位置',
        'No toilets found': '找不到公廁',
        'No public toilets found in this area': '此區域內找不到公廁',
        'Try searching in a different location': '請嘗試搜尋其他位置',
        'Network error': '網路錯誤',
        'Failed to fetch toilet data': '無法取得廁所資料',
        'Public Toilet': '公廁',
        'Distance': '距離',
        'Accessible': '無障礙',
        'Free': '免費',
        'Open 24/7': '24小時開放',
        'Unknown': '未知',
        'Manual Location Input': '手動輸入位置',
        'Location access denied. Please enter your location manually:': '位置存取被拒絕，請手動輸入您的位置：',
        'Enter city, address or landmark...': '輸入城市、地址或地標...',
        'Examples: Taipei 101, Tokyo Station, New York City': '例如：台北101、東京車站、紐約市',
        'Cancel': '取消',
        'Search': '搜尋',
        'Likely Open': '可能開放'
    },
    en: {
        'Find Nearest Public Toilets': 'Find Nearest Public Toilets',
        'Use My Location': 'Use My Location',
        'Enter address or location...': 'Enter address or location...',
        'Nearby Public Toilets': 'Nearby Public Toilets',
        'results': 'results',
        'Wheelchair Accessible': 'Wheelchair Accessible',
        'Free to Use': 'Free to Use',
        'Open Now': 'Open Now',
        'Searching for nearby toilets...': 'Searching for nearby toilets...',
        'Getting your location...': 'Getting your location...',
        'Error': 'Error',
        'OK': 'OK',
        'Location access denied': 'Location access denied',
        'Please enable location access to find nearby toilets': 'Please enable location access to find nearby toilets',
        'Location not available': 'Location not available',
        'Your browser does not support geolocation': 'Your browser does not support geolocation',
        'Failed to get location': 'Failed to get location',
        'No toilets found': 'No toilets found',
        'No public toilets found in this area': 'No public toilets found in this area',
        'Try searching in a different location': 'Try searching in a different location',
        'Network error': 'Network error',
        'Failed to fetch toilet data': 'Failed to fetch toilet data',
        'Public Toilet': 'Public Toilet',
        'Distance': 'Distance',
        'Accessible': 'Accessible',
        'Free': 'Free',
        'Open 24/7': 'Open 24/7',
        'Unknown': 'Unknown',
        'Manual Location Input': 'Manual Location Input',
        'Location access denied. Please enter your location manually:': 'Location access denied. Please enter your location manually:',
        'Enter city, address or landmark...': 'Enter city, address or landmark...',
        'Examples: Taipei 101, Tokyo Station, New York City': 'Examples: Taipei 101, Tokyo Station, New York City',
        'Cancel': 'Cancel',
        'Search': 'Search',
        'Likely Open': 'Likely Open'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
    updateLanguage();
    loadSavedBackground();
});

// Initialize Leaflet map
function initializeMap() {
    map = L.map('map').setView([25.0330, 121.5654], 13); // Default to Taipei

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Setup event listeners
function setupEventListeners() {
    // Language toggle
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    
    // Background selector
    document.getElementById('backgroundSelect').addEventListener('change', changeBackground);
    
    // Find nearby button
    document.getElementById('findNearby').addEventListener('click', findNearbyToilets);
    
    // Search button
    document.getElementById('searchBtn').addEventListener('click', searchLocation);
    
    // Search input enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchLocation();
        }
    });
    
    // Recenter button
    document.getElementById('recenterBtn').addEventListener('click', recenterMap);
    
    // Error modal close
    document.getElementById('closeErrorModal').addEventListener('click', closeErrorModal);
    document.getElementById('errorOkBtn').addEventListener('click', closeErrorModal);
    
    // Filter checkboxes
    document.getElementById('accessibleFilter').addEventListener('change', applyFilters);
    document.getElementById('freeFilter').addEventListener('change', applyFilters);
    document.getElementById('openNowFilter').addEventListener('change', applyFilters);
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    updateLanguage();
    
    // Update button text
    const langToggle = document.getElementById('langToggle');
    langToggle.querySelector('span').textContent = currentLanguage === 'zh' ? 'EN' : '中文';
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-TW' : 'en';
}

// Update all text based on current language
function updateLanguage() {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    elements.forEach(element => {
        const text = currentLanguage === 'zh' ? element.getAttribute('data-zh') : element.getAttribute('data-en');
        element.textContent = text;
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-placeholder-zh][data-placeholder-en]');
    placeholderElements.forEach(element => {
        const placeholder = currentLanguage === 'zh' ? 
            element.getAttribute('data-placeholder-zh') : 
            element.getAttribute('data-placeholder-en');
        element.placeholder = placeholder;
    });
    
    // Update background selector options
    updateBackgroundSelectorLanguage();
}

// Update background selector option text based on language
function updateBackgroundSelectorLanguage() {
    const select = document.getElementById('backgroundSelect');
    const options = select.querySelectorAll('option');
    
    options.forEach(option => {
        const value = option.value;
        if (backgroundOptions[value]) {
            option.textContent = backgroundOptions[value].name[currentLanguage];
        }
    });
}

// Change background based on selection
function changeBackground() {
    const selectedBg = document.getElementById('backgroundSelect').value;
    const bgOption = backgroundOptions[selectedBg];
    
    if (bgOption) {
        const body = document.body;
        
        // Remove existing animated classes
        body.classList.remove('animated-bg');
        
        // Set new background
        body.style.background = `
            linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
            url('${bgOption.url}') center/cover fixed
        `;
        
        // Add animated class if needed
        if (bgOption.animated) {
            body.classList.add('animated-bg');
        }
        
        // Save preference to localStorage
        localStorage.setItem('selectedBackground', selectedBg);
    }
}

// Load saved background on page load
function loadSavedBackground() {
    const savedBg = localStorage.getItem('selectedBackground') || 'forest-path';
    document.getElementById('backgroundSelect').value = savedBg;
    changeBackground();
}

// Get user's current location
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error(translate('Your browser does not support geolocation')));
            return;
        }
        
        showLoadingOverlay();
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                hideLoadingOverlay();
                resolve(location);
            },
            (error) => {
                hideLoadingOverlay();
                let errorMessage;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        // Instead of just showing error, offer manual location input
                        showManualLocationInput();
                        return;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = translate('Location not available');
                        break;
                    case error.TIMEOUT:
                        errorMessage = translate('Failed to get location');
                        break;
                    default:
                        errorMessage = translate('Failed to get location');
                        break;
                }
                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    });
}

// Find nearby toilets using current location
async function findNearbyToilets() {
    try {
        currentLocation = await getCurrentLocation();
        updateUserLocationOnMap(currentLocation);
        await searchToiletsNearby(currentLocation.lat, currentLocation.lng);
    } catch (error) {
        showErrorModal(translate('Error'), error.message);
    }
}

// Search for location using input
async function searchLocation() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;
    
    try {
        showLoadingOverlay();
        
        // Use Nominatim API for geocoding
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
        const data = await response.json();
        
        hideLoadingOverlay();
        
        if (data.length === 0) {
            showErrorModal(translate('Error'), 'Location not found');
            return;
        }
        
        const location = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
        };
        
        currentLocation = location;
        updateUserLocationOnMap(location);
        await searchToiletsNearby(location.lat, location.lng);
        
    } catch (error) {
        hideLoadingOverlay();
        showErrorModal(translate('Network error'), translate('Failed to fetch toilet data'));
    }
}

// Search for toilets near a location using Overpass API
async function searchToiletsNearby(lat, lng, radius = 2000) {
    try {
        showResultsLoading();
        
        const overpassQuery = `
            [out:json][timeout:25];
            (
                node["amenity"="toilets"](around:${radius},${lat},${lng});
                way["amenity"="toilets"](around:${radius},${lat},${lng});
                relation["amenity"="toilets"](around:${radius},${lat},${lng});
            );
            out geom;
        `;
        
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: overpassQuery,
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch data from Overpass API');
        }
        
        const data = await response.json();
        
        // Process and display results
        const toilets = processToiletData(data.elements, { lat, lng });
        currentToilets = toilets;
        
        displayToilets(toilets);
        displayToiletsOnMap(toilets);
        
        hideResultsLoading();
        
    } catch (error) {
        hideResultsLoading();
        showErrorModal(translate('Network error'), translate('Failed to fetch toilet data'));
    }
}

// Process toilet data from Overpass API
function processToiletData(elements, userLocation) {
    return elements.map(element => {
        const toilet = {
            id: element.id,
            type: element.type,
            tags: element.tags || {},
            lat: element.lat || (element.center ? element.center.lat : null),
            lng: element.lon || (element.center ? element.center.lon : null)
        };
        
        // Calculate distance
        if (toilet.lat && toilet.lng && userLocation) {
            toilet.distance = calculateDistance(
                userLocation.lat, userLocation.lng,
                toilet.lat, toilet.lng
            );
        }
        
        // Extract useful information
        toilet.name = toilet.tags.name || translate('Public Toilet');
        toilet.accessible = toilet.tags.wheelchair === 'yes';
        toilet.fee = toilet.tags.fee === 'no' || !toilet.tags.fee;
        toilet.openingHours = toilet.tags.opening_hours;
        toilet.operator = toilet.tags.operator;
        
        // Determine if toilet is likely open now
        toilet.isOpenNow = isToiletOpenNow(toilet.tags);
        
        return toilet;
    }).filter(toilet => toilet.lat && toilet.lng)
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}

// Calculate distance between two points
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Determine if toilet is likely open now based on various indicators
function isToiletOpenNow(tags) {
    const openingHours = tags.opening_hours;
    
    // If explicitly marked as 24/7
    if (openingHours === '24/7' || openingHours === 'Mo-Su 00:00-24:00') {
        return true;
    }
    
    // If no opening hours info, make educated guesses
    if (!openingHours) {
        // Public toilets in parks, stations, hospitals are often open
        const location = tags.location || '';
        const amenity = tags.amenity || '';
        const access = tags.access || '';
        const operator = tags.operator || '';
        const name = tags.name || '';
        
        // Check for indicators of 24/7 availability
        const always_open_indicators = [
            'hospital', 'station', 'airport', 'highway', 'motorway',
            'gas_station', 'petrol', 'service_area', 'rest_area',
            '24', 'hour', '小時', '全天'
        ];
        
        const text_to_check = `${location} ${operator} ${name}`.toLowerCase();
        
        if (always_open_indicators.some(indicator => 
            text_to_check.includes(indicator))) {
            return true;
        }
        
        // Public access toilets are more likely to be open
        if (access === 'public' || access === 'yes' || !access) {
            return true;
        }
        
        // Default assumption for public toilets without specific hours
        return true;
    }
    
    // Try to parse opening hours (simplified)
    if (openingHours) {
        const now = new Date();
        const currentHour = now.getHours();
        
        // Simple patterns
        if (openingHours.includes('24/7')) return true;
        if (openingHours.includes('00:00-24:00')) return true;
        
        // Pattern like "06:00-22:00"
        const hourMatch = openingHours.match(/(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/);
        if (hourMatch) {
            const openHour = parseInt(hourMatch[1]);
            const closeHour = parseInt(hourMatch[3]);
            
            if (closeHour > openHour) {
                return currentHour >= openHour && currentHour < closeHour;
            } else {
                // Crosses midnight
                return currentHour >= openHour || currentHour < closeHour;
            }
        }
    }
    
    // Default to assuming it's open if we can't determine
    return true;
}

// Display toilets in the results list
function displayToilets(toilets) {
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');
    
    resultsCount.textContent = toilets.length;
    
    if (toilets.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h4>${translate('No toilets found')}</h4>
                <p>${translate('No public toilets found in this area')}</p>
                <p>${translate('Try searching in a different location')}</p>
            </div>
        `;
        return;
    }
    
    resultsList.innerHTML = toilets.map(toilet => `
        <div class="toilet-item" data-toilet-id="${toilet.id}" onclick="selectToilet('${toilet.id}')">
            <div class="toilet-header">
                <div class="toilet-name">${toilet.name}</div>
                ${toilet.distance ? `<div class="toilet-distance">${(toilet.distance * 1000).toFixed(0)}m</div>` : ''}
            </div>
            ${toilet.operator ? `<div class="toilet-address">${toilet.operator}</div>` : ''}
            <div class="toilet-features">
                ${toilet.accessible ? `<span class="feature-tag accessible"><i class="fas fa-wheelchair"></i> ${translate('Accessible')}</span>` : ''}
                ${toilet.fee ? `<span class="feature-tag free"><i class="fas fa-coins"></i> ${translate('Free')}</span>` : ''}
                ${toilet.isOpenNow ? `<span class="feature-tag open"><i class="fas fa-clock"></i> ${toilet.openingHours === '24/7' ? translate('Open 24/7') : translate('Likely Open')}</span>` : ''}
                ${toilet.openingHours && toilet.openingHours !== '24/7' ? `<span class="feature-tag hours"><i class="fas fa-calendar-alt"></i> ${toilet.openingHours}</span>` : ''}
            </div>
        </div>
    `).join('');
}

// Display toilets on map
function displayToiletsOnMap(toilets) {
    // Clear existing markers
    toiletMarkers.forEach(marker => map.removeLayer(marker));
    toiletMarkers = [];
    
    toilets.forEach(toilet => {
        const marker = L.marker([toilet.lat, toilet.lng], {
            icon: L.divIcon({
                className: 'toilet-marker',
                html: '<i class="fas fa-toilet" style="color: #4f46e5; font-size: 20px;"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            })
        });
        
        // Create popup content
        const popupContent = `
            <div class="popup-title">${toilet.name}</div>
            ${toilet.operator ? `<div class="popup-address">${toilet.operator}</div>` : ''}
            <div class="popup-features">
                ${toilet.accessible ? `<span class="popup-feature">${translate('Accessible')}</span>` : ''}
                ${toilet.fee ? `<span class="popup-feature">${translate('Free')}</span>` : ''}
                ${toilet.distance ? `<span class="popup-feature">${translate('Distance')}: ${(toilet.distance * 1000).toFixed(0)}m</span>` : ''}
            </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.addTo(map);
        toiletMarkers.push(marker);
    });
    
    // Fit map to show all markers
    if (toilets.length > 0) {
        const group = new L.featureGroup([...toiletMarkers, userMarker].filter(Boolean));
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Select a toilet from the list
function selectToilet(toiletId) {
    // Remove previous selection
    document.querySelectorAll('.toilet-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selection to clicked item
    const selectedItem = document.querySelector(`[data-toilet-id="${toiletId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
    
    // Find and center map on selected toilet
    const toilet = currentToilets.find(t => t.id.toString() === toiletId);
    if (toilet) {
        map.setView([toilet.lat, toilet.lng], 17);
        
        // Open popup for the corresponding marker
        const marker = toiletMarkers.find(m => 
            Math.abs(m.getLatLng().lat - toilet.lat) < 0.0001 && 
            Math.abs(m.getLatLng().lng - toilet.lng) < 0.0001
        );
        if (marker) {
            marker.openPopup();
        }
    }
}

// Update user location on map
function updateUserLocationOnMap(location) {
    if (userMarker) {
        map.removeLayer(userMarker);
    }
    
    userMarker = L.marker([location.lat, location.lng], {
        icon: L.divIcon({
            className: 'user-marker',
            html: '<i class="fas fa-location-dot" style="color: #dc2626; font-size: 24px;"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        })
    });
    
    userMarker.bindPopup('Your Location').addTo(map);
    map.setView([location.lat, location.lng], 15);
}

// Recenter map to user location
function recenterMap() {
    if (currentLocation) {
        map.setView([currentLocation.lat, currentLocation.lng], 15);
    }
}

// Apply filters to toilet results
function applyFilters() {
    const accessibleFilter = document.getElementById('accessibleFilter').checked;
    const freeFilter = document.getElementById('freeFilter').checked;
    const openNowFilter = document.getElementById('openNowFilter').checked;
    
    let filteredToilets = currentToilets.filter(toilet => {
        if (accessibleFilter && !toilet.accessible) return false;
        if (freeFilter && !toilet.fee) return false;
        if (openNowFilter && !toilet.isOpenNow) return false;
        return true;
    });
    
    displayToilets(filteredToilets);
    
    // Update map markers
    toiletMarkers.forEach(marker => map.removeLayer(marker));
    toiletMarkers = [];
    displayToiletsOnMap(filteredToilets);
}

// Show/hide loading overlay
function showLoadingOverlay() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoadingOverlay() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

// Show/hide results loading
function showResultsLoading() {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = `
        <div class="loading-message">
            <i class="fas fa-spinner fa-spin"></i>
            <span>${translate('Searching for nearby toilets...')}</span>
        </div>
    `;
}

function hideResultsLoading() {
    // Results will be replaced by displayToilets function
}

// Show error modal
function showErrorModal(title, message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorModal').classList.remove('hidden');
}

// Close error modal
function closeErrorModal() {
    document.getElementById('errorModal').classList.add('hidden');
}

// Show manual location input modal when geolocation is denied
function showManualLocationInput() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${translate('Manual Location Input')}</span>
                </h3>
                <button id="closeManualModal" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>${translate('Location access denied. Please enter your location manually:')}</p>
                <input type="text" id="manualLocationInput" placeholder="${translate('Enter city, address or landmark...')}" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px;">
                <p style="font-size: 12px; color: #666; margin-top: 10px;">
                    ${translate('Examples: Taipei 101, Tokyo Station, New York City')}
                </p>
            </div>
            <div class="modal-footer">
                <button id="cancelManualInput" class="btn-secondary">${translate('Cancel')}</button>
                <button id="confirmManualInput" class="btn-primary">${translate('Search')}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners
    document.getElementById('closeManualModal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('cancelManualInput').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('confirmManualInput').addEventListener('click', async () => {
        const location = document.getElementById('manualLocationInput').value.trim();
        if (location) {
            document.body.removeChild(modal);
            // Use the search location function
            document.getElementById('searchInput').value = location;
            await searchLocation();
        }
    });
    
    // Enter key support
    document.getElementById('manualLocationInput').addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const location = e.target.value.trim();
            if (location) {
                document.body.removeChild(modal);
                document.getElementById('searchInput').value = location;
                await searchLocation();
            }
        }
    });
    
    // Focus on input
    setTimeout(() => {
        document.getElementById('manualLocationInput').focus();
    }, 100);
}

// Translation helper
function translate(key) {
    return translations[currentLanguage][key] || key;
}