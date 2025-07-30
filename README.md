# Payments App

A full-stack payment processing application built with NestJS (backend) and React (frontend) that supports multiple payment providers including Stripe and PayPal.

## 🚀 Features

- **Multi-Provider Support**: Seamlessly handle payments through Stripe and PayPal
- **Strategy Pattern Implementation**: Extensible architecture for adding new payment providers
- **Modern Tech Stack**: NestJS backend with React/TypeScript frontend
- **Real-time Processing**: Instant payment processing and order capture
- **Responsive UI**: Beautiful, responsive interface built with Tailwind CSS
- **Type Safety**: Full TypeScript implementation across the stack

## 📁 Project Structure

```
payments-app/
├── api/                    # NestJS Backend API
│   ├── src/
│   │   ├── payments/       # Payment module
│   │   │   ├── strategies/ # Payment provider strategies
│   │   │   ├── factory/    # Payment strategy factory
│   │   │   ├── dtos/       # Data transfer objects
│   │   │   └── types/      # Type definitions
│   │   └── config/         # Configuration module
│   └── package.json
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   └── payments/   # Payment-specific components
│   │   ├── pages/          # Application pages
│   │   ├── api/            # API client
│   │   └── types/          # Type definitions
│   └── package.json
└── readme.md
```

## 🛠️ Technology Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Stripe SDK** - Stripe payment processing
- **PayPal SDK** - PayPal payment processing
- **dotenv** - Environment variable management

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **@stripe/react-stripe-js** - Stripe React components
- **@paypal/react-paypal-js** - PayPal React components

## 🚦 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **pnpm** (recommended package manager)
- **Stripe Account** with API keys
- **PayPal Developer Account** with API credentials

## ⚙️ Environment Configuration

### Backend (.env file in `/api` directory)

Create a `.env` file in the `api` directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
```

### Frontend Environment Configuration

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# PayPal Configuration
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/chrxsdev/payments-pattern.git
cd payments-app
```

### 2. Install Backend Dependencies

```bash
cd api
pnpm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
pnpm install
```

### 4. Set Up Environment Variables

- Create `.env` files in both `api` and `client` directories
- Add your Stripe and PayPal credentials as shown above

## 🏃‍♂️ Running the Application

### Development Mode

#### Start the Backend API

```bash
cd api
pnpm run start:dev
```

The API will be available at `http://localhost:3000`

#### Start the Frontend

```bash
cd client
pnpm run dev
```

The frontend will be available at `http://localhost:5173`

### Production Mode

#### Build and Start Backend

```bash
cd api
pnpm run build
pnpm run start:prod
```

#### Build and Start Frontend

```bash
cd client
pnpm run build
pnpm run preview
```

## 📚 API Documentation

### Payment Endpoints

#### Create Payment
- **POST** `/payments/pay`
- **Body**: 
  ```json
  {
    "paymentMethod": "stripe" | "paypal",
    "amount": 100,
    "metadata": {
      "products": [...]
    }
  }
  ```

#### Capture Payment
- **POST** `/payments/capture/:orderId/:paymentMethod`
- **Params**: 
  - `orderId`: Order ID to capture
  - `paymentMethod`: Payment method used

#### Get Payment Configuration
- **GET** `/payments/config/:paymentMethod`
- **Params**: 
  - `paymentMethod`: Payment method to get config for

## 🏗️ Architecture Overview

### Strategy Pattern Implementation

The application uses the Strategy Pattern to handle different payment providers:

1. **Payment Strategy Interface**: Defines common methods for all payment providers
2. **Concrete Strategies**: Stripe and PayPal implementations
3. **Strategy Factory**: Creates appropriate strategy instances
4. **Payment Service**: Orchestrates payment processing

### Key Components

- **PaymentStrategyFactory**: Creates payment strategy instances
- **StripeStrategy**: Handles Stripe payment processing
- **PaypalStrategy**: Handles PayPal payment processing
- **PaymentsController**: Exposes payment endpoints
- **PaymentsService**: Business logic for payment processing

## 🧪 Testing

### Backend Tests

```bash
cd api
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

### Frontend Tests

```bash
cd client
pnpm run test
```

## 🔧 Available Scripts

### Backend Scripts
- `pnpm run start` - Start the application
- `pnpm run start:dev` - Start in development mode with hot reload
- `pnpm run start:debug` - Start in debug mode
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run test` - Run unit tests

### Frontend Scripts
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the UNLICENSED License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/chrxsdev/payments-pattern/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🌟 Acknowledgments

- [NestJS](https://nestjs.com/) for the powerful backend framework
- [React](https://reactjs.org/) for the flexible frontend library
- [Stripe](https://stripe.com/) for payment processing
- [PayPal](https://developer.paypal.com/) for payment processing
- [Tailwind CSS](https://tailwindcss.com/) for styling