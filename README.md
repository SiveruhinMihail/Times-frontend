# Times-Frontend

![Nuxt](https://img.shields.io/badge/Nuxt-4-green)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

Modern, responsive frontend application for Times project built with Nuxt 4, Vue 3, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Framework**: Nuxt 4 with Vue 3 Composition API
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: Pinia for state management
- **Containerization**: Docker with multi-stage builds
- **Development**: Hot reload with Docker development environment

## 📦 Project Structure

```
times-frontend/
├── .nuxt/                 # Nuxt build directory (auto-generated)
├── assets/               # Static assets (images, fonts)
├── components/           # Vue components
├── composables/          # Composable functions
├── pages/                # Application pages
├── plugins/              # Nuxt plugins
├── public/               # Public assets
├── stores/               # Pinia stores
├── types/                # TypeScript type definitions
├── docker-compose.yml    # Production Docker configuration
├── docker-compose.dev.yml # Development Docker configuration
├── Dockerfile            # Multi-stage Dockerfile
└── nuxt.config.ts        # Nuxt configuration
```

## 🛠️ Prerequisites

- **Node.js** 20+ (required for Nuxt 4)
- **Docker** & **Docker Compose**
- **npm** or **yarn**

## ⚡ Quick Start

### Development with Docker (Recommended)

1. **Clone and setup:**

   ```bash
   git clone <repository-url>
   cd times-frontend
   ```

2. **Start development environment:**

   ```bash
   npm run docker:dev
   ```

   The application will be available at: **http://localhost:3000**

### Development without Docker

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Open http://localhost:3000**

## 🐳 Docker Commands

### Development (Hot Reload)

```bash
# Start development with hot reload
npm run docker:dev

# Start in background
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development services
docker-compose -f docker-compose.dev.yml down
```

### Production

```bash
# Build and start production
npm run docker:prod

# Build only
docker-compose build

# Stop production
docker-compose down
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run generate         # Generate static site
npm run preview          # Preview production build

# Docker Development
npm run docker:dev       # Start development with Docker (hot reload)

# Docker Production
npm run docker:prod      # Build and start production

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type check
```

## 🏗️ Build for Production

### With Docker

```bash
npm run docker:prod
```

### Without Docker

```bash
npm run build
npm run preview
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

```env
# API Configuration
NUXT_PUBLIC_API_URL=http://localhost:3001/api/
NUXT_PUBLIC_FILES_URL=http://localhost:8080

# Server Configuration
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
```

### Backend Services

For full functionality, ensure these services are running:

- **Backend API**: http://localhost:3001
- **Files Service**: http://localhost:8080

## 🛣️ API Integration

The frontend integrates with:

- **Main API**: `/api/*` → Backend service (port 3001)
- **Files API**: `/files/*` → Files service (port 8080)

## 🐛 Troubleshooting

### Common Issues

**Port conflicts:**

```bash
# Change port in docker-compose files
ports:
  - '3001:3000'  # host:container
```

**Hot reload not working:**

- Ensure volumes are properly mounted in docker-compose.dev.yml
- Check that `CHOKIDAR_USEPOLLING=true` is set in development

**API connection issues:**

- Verify backend services are running
- Check environment variables
- Ensure CORS is configured on backend services

### Logs

```bash
# Development logs
docker-compose -f docker-compose.dev.yml logs -f

# Production logs
docker-compose logs -f
```

## 🤝 Development Workflow

### Daily Development

```bash
npm run docker:dev  # Fast development with hot reload
```

### Testing with Full Stack

```bash
# Ensure backend services are running, then:
npm run docker:dev
```

### Production Testing

```bash
npm run docker:prod  # Test production build
```

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Nuxt.js team for the amazing framework
- Vue.js ecosystem
- Tailwind CSS for utility-first approach

---

<div align="center">

**Built with ❤️ using Nuxt 4 & Docker**

**Happy coding!** 🎉

</div>
