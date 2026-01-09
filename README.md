# SafeDep Package Insight App

This project is a Next.js application that integrates with the SafeDep API to fetch and display security insights for open-source packages across multiple ecosystems.

The application supports dynamic routes to analyze packages from npm, PyPI, Maven, Go, RubyGems, and more.

---

## 📦 Requirements

Before installing, make sure you have:

- Node.js 18 or higher
- npm or pnpm installed
- SafeDep API key
- SafeDep Tenant ID

---

## ⚙️ Installation Guide

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

---

### 2. Install dependencies

Using npm:

```bash
npm install
```

or using pnpm:

```bash
pnpm install
```

---

### 3. Environment setup

Create a file named `.env.local` in the project root and add:

```env
SAFEDEP_API_KEY=your_api_key_here
SAFEDEP_TENANT_ID=your_tenant_id_here
```

⚠️ Do not commit this file to version control.

---

### 4. Run the development server

```bash
npm run dev
```

or

```bash
pnpm dev
```

Open your browser at:

```
http://localhost:3000
```

---

## 🔎 Usage

The app uses dynamic routes:

```
/p/{ecosystem}/{package}/{version}
```

### Examples

npm:

```
http://localhost:3000/p/npm/react/18.2.0
```

PyPI:

```
http://localhost:3000/p/pypi/requests/2.31.0
```

Maven:

```
http://localhost:3000/p/maven/org.apache.logging.log4j/log4j-core/2.14.1
```

Go:

```
http://localhost:3000/p/go/github.com/gin-gonic/gin/v1.9.1
```

RubyGems:

```
http://localhost:3000/p/rubygems/rails/7.1.3
```

---

## 🏗️ Build for production

```bash
npm run build
npm run start
```

---

## ✅ Setup Complete

The application is now ready to fetch and display SafeDep package insights.
