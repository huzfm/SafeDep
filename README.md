# SafeDep Package Insight App

##  Requirements

Before installing, make sure you have:

- Node.js 18 or higher
- npm installed
- SafeDep API key
- SafeDep Tenant ID


You can check the deployed application here:  
 **https://safedep.vercel.app**


## ⚙️ Installation Guide

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

### 3. Environment setup

Create a file named `.env` in the project root and add:

```env
SAFEDEP_API_KEY=your_api_key_here
SAFEDEP_TENANT_ID=your_tenant_id_here
```


### 4. Run the development server

```bash
npm run dev
```


Open your browser at:

```
http://localhost:3000
```

---

## Usage

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


RubyGems:

```
http://localhost:3000/p/rubygems/rails/7.1.3
```


