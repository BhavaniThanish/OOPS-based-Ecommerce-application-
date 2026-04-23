# ⚡ OOPS-Based Ecommerce Application

A full-stack ecommerce application demonstrating all core **Object-Oriented Programming (OOP)** concepts using **Spring Boot + MongoDB** backend and **React.js** frontend.

## 🎯 OOP Concepts Demonstrated

| Concept | Where |
|---|---|
| **Abstraction** | `BaseProduct` — abstract class with `abstract calculateDiscount()` |
| **Inheritance** | `Electronics`, `Clothing`, `FoodProduct` extend `BaseProduct` |
| **Polymorphism** | Each product type overrides `calculateDiscount()` differently |
| **Encapsulation** | All model fields `private` with getters/setters |
| **Interfaces** | `Discountable`, `Shippable` interfaces |
| **Design Pattern** | **Factory Pattern** — `ProductFactory` creates correct product type |

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot 3.x, Java 21 |
| Database | MongoDB (local) |
| Frontend | React.js + Vite |
| Testing | JUnit 5 + Mockito |
| Security | JWT Authentication |

## 📂 Project Structure

```
oops-project/
├── backend/                    Spring Boot application
│   └── src/main/java/com/example/ecommerce/
│       ├── model/              BaseProduct, Electronics, Clothing, FoodProduct
│       ├── interfaces/         Discountable, Shippable
│       ├── factory/            ProductFactory (Design Pattern)
│       ├── repository/         MongoDB repositories
│       ├── service/            Business logic
│       ├── controller/         REST APIs
│       └── security/           JWT auth
├── frontend/                   React + Vite application
│   └── src/
│       ├── pages/              Home, Products, Cart, Admin, Orders
│       ├── components/         Navbar, ProductCard
│       └── context/            AuthContext, CartContext
└── README.md
```

## 🚀 How to Run

### Prerequisites
- Java 21
- MongoDB running locally on port 27017
- Node.js 18+

### Backend
```bash
cd backend
mvn spring-boot:run
# Runs on http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Load Sample Data
Visit `http://localhost:5173` and click **"Load Sample Data"** to seed products.

### Run Tests
```bash
cd backend
mvn test
```

## 📊 Discount Polymorphism

| Product Type | Subclass | Discount |
|---|---|---|
| Electronics | `Electronics extends BaseProduct` | 10% |
| Clothing | `Clothing extends BaseProduct` | 20% |
| Food | `FoodProduct extends BaseProduct` | 5% (7% if organic) |

Same method `calculateDiscount()` — different behaviour! That's **Polymorphism**.

## 🧪 JUnit Tests

- `ElectronicsTest` — Tests 10% discount, shipping, encapsulation
- `ClothingTest` — Tests 20% discount, polymorphism comparison
- `FoodProductTest` — Tests organic bonus, expiry date logic
- `ProductFactoryTest` — Tests Factory Pattern creates correct subclass
- `ProductServiceTest` — Tests CRUD with Mockito

## 👤 Author

Bhavani Thanish — [GitHub](https://github.com/BhavaniThanish)