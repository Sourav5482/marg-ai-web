# Marg-AI - Smart Public Transport Management System

A modern, responsive web application built with **React 18**, **Vite 7**, **TailwindCSS**, and **GSAP** for revolutionizing public transportation in small and mid-sized cities.

## 🚀 Features

### Core Features
- **Real-time Bus Tracking** - Live GPS tracking with accurate ETAs
- **Smart Digital Ticketing** - QR/NFC enabled contactless tickets
- **Crowd Density Estimation** - Know bus occupancy before boarding
- **Multi-language Support** - English, Hindi (हिंदी), Bengali (বাংলা)
- **Driver Behavior Monitoring** - Safety alerts and performance tracking
- **Emergency SOS System** - Quick access to emergency services
- **Route Fare Calculation** - Dynamic pricing based on distance
- **Passenger Rating System** - Feedback and service improvement

### Technical Features
- **GSAP Animations** - Smooth scroll-based animations on Features page
- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Real-time Updates** - Simulated IoT data updates every 5 seconds
- **Glass Morphism UI** - Modern design with backdrop blur effects
- **PWA Ready** - Progressive Web App capabilities
- **Performance Optimized** - Built with Vite for fast development and builds

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 3.4
- **Routing**: React Router DOM 6.8
- **Animations**: GSAP 3.12 with ScrollTrigger
- **Icons**: Unicode Emojis (no external icon dependencies)
- **Development**: ESLint, PostCSS, Autoprefixer

## 📁 Project Structure

```
marg-ai-web/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── FeaturesPage.jsx       # GSAP animations
│   │   ├── BusTrackerPage.jsx     # Real-time tracking
│   │   ├── BookingPage.jsx        # Ticket booking
│   │   ├── DashboardPage.jsx      # Control dashboard
│   │   └── ContactPage.jsx        # Contact form
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/marg-ai.git
cd marg-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📱 Pages Overview

### 1. Home Page (`/`)
- Hero section with call-to-action buttons
- Statistics overview (routes, passengers, performance)
- Feature previews with modern UI cards

### 2. Features Page (`/features`)
- **GSAP Animations**: Scroll-triggered animations for feature cards
- Comprehensive feature list with icons and descriptions
- Technical specifications section

### 3. Bus Tracker (`/tracker`)
- Interactive map placeholder for real-time locations
- Live bus list with filtering options
- Detailed bus information with driver and route data
- Emergency contact section

### 4. Ticket Booking (`/booking`)
- Multi-step booking form with validation
- Route-based fare calculation
- Digital ticket generation with QR code
- Payment method selection

### 5. Dashboard (`/dashboard`)
- Fleet management overview
- Real-time alerts and notifications system
- Route performance analytics
- Emergency control center

### 6. Contact (`/contact`)
- Multi-category contact form
- Emergency support information
- FAQ section and office hours
- Social media integration

## 🎨 Design System

### Colors
- **Primary**: `#3B82F6` (Blue)
- **Secondary**: `#1E40AF` (Dark Blue)  
- **Accent**: `#F59E0B` (Amber)
- **Background**: Gradient from `#667eea` to `#764ba2`

### Components
- **Glass Morphism**: `backdrop-filter: blur(10px)` with transparency
- **Responsive Grid**: Mobile-first design with breakpoints
- **Typography**: Inter font family for modern readability

## 🔧 Configuration Files

### Vite Configuration (`vite.config.js`)
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### TailwindCSS Configuration (`tailwind.config.js`)
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1E40AF', 
        accent: '#F59E0B',
      }
    }
  }
}
```

## 🧪 Mock Data & IoT Simulation

The application includes comprehensive mock data for:
- **Bus Fleet Data**: Location, speed, crowd levels, driver info
- **Route Information**: Stops, fares, schedules
- **Alert System**: Delays, overspeeding, maintenance alerts
- **Passenger Data**: Bookings, ratings, feedback

Real-time updates are simulated using `setInterval` to mimic IoT sensor data.

## 🌐 Multi-language Support

Currently supports:
- **English** (EN) - Default
- **Hindi** (हिं) - Hindi interface
- **Bengali** (বাং) - Bengali interface

Language switching implemented in Navbar component.

## 📊 Performance Features

- **Code Splitting**: React.lazy() for route-based splitting
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Analysis**: Built-in Vite bundle analyzer
- **CSS Purging**: TailwindCSS removes unused styles
- **Minification**: Production builds are optimized

## 🔒 Security Considerations

- **Form Validation**: Client-side validation with HTML5 and JavaScript
- **XSS Prevention**: Proper input sanitization
- **HTTPS Ready**: Production builds support HTTPS
- **No Sensitive Data**: All demo data is mock/placeholder

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from dist/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:
- **Email**: support@marg-ai.com
- **Emergency**: +91 98765 43210
- **GitHub Issues**: [Create an issue](https://github.com/your-username/marg-ai/issues)

## 🔮 Future Enhancements

- [ ] Real IoT sensor integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered route optimization
- [ ] Integration with city traffic systems
- [ ] Blockchain-based ticketing
- [ ] Advanced accessibility features

---

**Built with ❤️ for smarter cities and better public transportation.**