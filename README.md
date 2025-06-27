# BuilderForge AI - Xano Backend

A modern AI-powered website builder with Xano backend integration.

## 🚀 Features

- **AI Website Generation** - Create full-stack websites using GPT-4o and Claude models
- **Unified Token System** - One token system across all AI models
- **Xano Backend** - No-code backend with authentication and database
- **Admin Dashboard** - User management and analytics
- **Responsive Design** - Works on all devices

## 🛠️ Setup Instructions

### 1. Xano Backend Setup

Create the following in your Xano instance:

#### Tables:
1. **users** table:
   - `id` (Auto-increment)
   - `email` (Text, unique)
   - `password` (Text, hashed)
   - `isAdmin` (Boolean, default: false)
   - `token_balance` (Integer, default: 2000000)
   - `created_at` (Datetime)

2. **token_usage** table:
   - `id` (Auto-increment)
   - `user_id` (Integer, foreign key to users)
   - `model` (Text)
   - `tokens_used` (Integer)
   - `timestamp` (Datetime)

#### API Endpoints:
1. `POST /auth/signup` - User registration
2. `POST /auth/login` - User authentication
3. `GET /user/me` - Get current user info
4. `GET /wallet/balance` - Get user token balance
5. `POST /wallet/deduct` - Deduct tokens from user balance

### 2. Frontend Setup

1. **Clone and install**:
   ```bash
   git clone <repository>
   cd builderforge-ai
   npm install
   ```

2. **Environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your Xano instance URL
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

- `REACT_APP_XANO_BASE_URL` - Your Xano instance API URL

### Xano Authentication

The app uses Xano's built-in authentication system:
- JWT tokens stored in localStorage
- Automatic token refresh
- Secure API calls with Bearer token

### Token System

- **Builder Tokens** - Universal tokens with model multipliers
- **Model Multipliers**:
  - GPT-4o: 15x
  - Claude Sonnet 4: 12x
  - Claude Opus 4: 25x

## 📱 Usage

1. **Sign up** - Get 2M free Builder Tokens
2. **Choose AI model** - Select from GPT-4o or Claude models
3. **Generate website** - Describe your vision and let AI build it
4. **Download code** - Get complete HTML, CSS, and JavaScript

## 🔐 Admin Features

Admin users can:
- View platform analytics
- Manage user accounts
- Monitor token usage
- Access system settings

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

## 📊 Architecture

```
Frontend (React) ↔ Xano Backend ↔ Database
     ↓                    ↓
Token Management    User Authentication
AI Model Selection  Data Persistence
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.