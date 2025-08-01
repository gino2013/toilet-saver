# 🚽 Toilet Saver

> A modern, bilingual public restroom finder with beautiful UI and real-time data

## 🌟 Features

### 🗺️ Smart Location Services
- **GPS Location Detection** - Automatically find your current location
- **Manual Location Input** - Search by address, landmark, or city name
- **Interactive Map** - Powered by Leaflet.js with custom markers
- **Distance Calculation** - Shows exact distance to each restroom

### 🔍 Advanced Filtering
- **Wheelchair Accessible** - Filter for disability-friendly facilities
- **Free Access** - Find restrooms that don't require payment
- **Open Now** - Smart detection of currently available facilities
- **Opening Hours** - Real-time availability based on current time

### 🌍 Bilingual Support
- **Chinese (Traditional)** - 繁體中文介面
- **English** - Full English interface
- **Dynamic Translation** - Seamless language switching
- **Localized Content** - All text and labels adapt to selected language

### 🎨 Beautiful Design
- **Glassmorphism UI** - Modern glass-effect design
- **6 Nature Backgrounds** - High-resolution images from Unsplash
- **Animated Effects** - Smooth transitions and hover effects
- **Responsive Layout** - Optimized for mobile and desktop

### ⚡ Real-time Data
- **OpenStreetMap Integration** - Uses Overpass API for live data
- **Comprehensive Database** - Access to thousands of public restrooms
- **Rich Information** - Operator details, accessibility features, and more

## 🚀 Demo

Visit the live demo: **[https://gino2013.github.io/toilet-saver](https://gino2013.github.io/toilet-saver)**

## 📱 Screenshots

### Desktop View
- Clean, modern interface with interactive map
- Side panel with detailed facility information
- Advanced filtering options

### Mobile View
- Fully responsive design
- Touch-optimized controls
- Compact layout for small screens

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Mapping**: Leaflet.js
- **API**: OpenStreetMap Overpass API
- **Geolocation**: HTML5 Geolocation API
- **Geocoding**: Nominatim API
- **Icons**: Font Awesome
- **Images**: Unsplash (high-resolution backgrounds)

## ⚡ Quick Start

### Option 1: Direct Usage
Simply open `index.html` in your web browser:
```bash
open index.html
```

### Option 2: Local Server
For full functionality (location services), run a local server:

**Python 3:**
```bash
python3 -m http.server 8000
```

**Node.js:**
```bash
npx serve .
```

**PHP:**
```bash
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Option 3: HTTPS Server (Recommended)
For location services to work properly, use the included HTTPS server:

```bash
python3 server.py
```

Visit `https://localhost:8443` (accept the security warning)

## 🏗️ Project Structure

```
toilet-saver/
├── index.html              # Main HTML file
├── styles.css              # Primary stylesheet
├── script.js               # JavaScript functionality
├── alt-backgrounds.css     # Alternative background options
├── server.py              # HTTPS development server
├── server.crt             # SSL certificate (auto-generated)
├── server.key             # SSL private key (auto-generated)
└── README.md              # This file
```

## 🎯 Usage Guide

### Finding Restrooms

1. **Automatic Location**:
   - Click "Use My Location" button
   - Allow location access when prompted
   - View nearby restrooms on the map

2. **Manual Search**:
   - Enter address or landmark in search box
   - Press Enter or click search button
   - Browse results in the side panel

3. **Filtering Results**:
   - Use checkboxes to filter by accessibility, cost, or availability
   - Results update automatically

4. **Background Themes**:
   - Select from 6 beautiful nature backgrounds
   - Preferences are saved automatically

### Language Switching
- Click the language toggle (EN/中文) in the top-right corner
- All interface elements update automatically
- Language preference is remembered

## 🔧 Configuration

### Background Options
Modify `backgroundOptions` in `script.js` to add new backgrounds:

```javascript
const backgroundOptions = {
    'custom-bg': {
        url: 'https://your-image-url.jpg',
        name: { zh: '自定義背景', en: 'Custom Background' },
        animated: false
    }
};
```

### API Endpoints
The app uses these free APIs:
- **Overpass API**: `https://overpass-api.de/api/interpreter`
- **Nominatim**: `https://nominatim.openstreetmap.org/search`

## 🌐 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Reporting Issues
Please use the [GitHub Issues](https://github.com/gino2013/toilet-saver/issues) page to report bugs or request features.

## 🙏 Acknowledgments

- **OpenStreetMap** - For providing comprehensive public restroom data
- **Leaflet.js** - For the excellent mapping library
- **Unsplash** - For beautiful, high-quality background images
- **Font Awesome** - For the icon library
- **Claude AI** - For development assistance

## 📞 Contact

- **GitHub**: [@gino2013](https://github.com/gino2013)
- **Repository**: [toilet-saver](https://github.com/gino2013/toilet-saver)

---

## 🌟 Star this project

If you find this project helpful, please consider giving it a star ⭐ on GitHub!

**Built with ❤️ and modern web technologies**