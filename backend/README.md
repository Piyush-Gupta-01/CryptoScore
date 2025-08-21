# CryptoScore Backend API

Spring Boot backend for the CryptoScore blockchain-based credit scoring platform.

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Running the Application

1. **Using the startup script (Windows):**
```bash
start-backend.bat
```

2. **Using Maven directly:**
```bash
mvn spring-boot:run
```

3. **Using Java (after building):**
```bash
mvn clean package
java -jar target/cryptoscore-backend-0.0.1-SNAPSHOT.jar
```

The backend will be available at: `http://localhost:8082/api`

## 📊 Database

The application uses H2 in-memory database for demo purposes.

- **H2 Console**: `http://localhost:8082/api/h2-console`
- **JDBC URL**: `jdbc:h2:mem:cryptoscore`
- **Username**: `sa`
- **Password**: `password`

## 🔐 Demo Users

The application automatically creates demo users on startup:

| Email | Password | Credit Score | Role |
|-------|----------|--------------|------|
| john.doe@example.com | password123 | 780 | USER, BORROWER |
| jane.smith@example.com | password123 | 720 | USER, BORROWER, LENDER |
| alice.johnson@example.com | password123 | 650 | USER, BORROWER |

## 🛠 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/wallet-connect` - Wallet connection

### Credit Score
- `GET /api/credit/score` - Get current credit score (requires auth)
- `GET /api/credit/history` - Get score history (requires auth)
- `GET /api/credit/recommendations` - Get improvement recommendations (requires auth)

### Test Endpoints
- `GET /api/test/all` - Public health check
- `GET /api/test/health` - Backend health status

## 🔧 Configuration

Key configuration in `application.yml`:

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

jwt:
  secret: [base64-encoded-secret]
  expiration: 86400000 # 24 hours

spring:
  datasource:
    url: jdbc:h2:mem:cryptoscore
```

## 🔒 Security

- JWT-based authentication
- CORS enabled for frontend integration
- Password encryption using BCrypt
- Role-based access control

## 📝 Sample API Calls

### Login
```bash
curl -X POST http://localhost:8082/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Get Credit Score (with JWT token)
```bash
curl -X GET http://localhost:8082/api/credit/score \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Register New User
```bash
curl -X POST http://localhost:8082/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🏗 Architecture

```
src/main/java/com/cryptoscore/
├── config/          # Configuration classes
├── controller/      # REST controllers
├── dto/            # Data Transfer Objects
├── model/          # JPA entities
├── repository/     # Data repositories
└── security/       # Security configuration
    ├── jwt/        # JWT utilities
    └── services/   # Security services
```

## 🔄 Development

### Adding New Endpoints
1. Create controller in `controller/` package
2. Add `@CrossOrigin` and `@RestController` annotations
3. Use `@PreAuthorize` for secured endpoints

### Database Changes
- Modify entities in `model/` package
- Update repositories in `repository/` package
- H2 will auto-create tables on startup

### Security
- JWT tokens expire in 24 hours
- All `/auth/**` endpoints are public
- Other endpoints require authentication

## 🚀 Production Deployment

For production deployment:

1. **Change to persistent database:**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/cryptoscore
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
```

2. **Update JWT secret:**
```yaml
jwt:
  secret: ${JWT_SECRET}
```

3. **Configure CORS for production:**
```yaml
spring:
  security:
    cors:
      allowed-origins: "https://your-frontend-domain.com"
```

## 📦 Dependencies

- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- H2 Database
- JWT (jsonwebtoken)
- Bean Validation

## 🐛 Troubleshooting

### Common Issues

1. **Port 8080 already in use:**
   - Change port in `application.yml`
   - Or kill process using port 8080

2. **JWT token errors:**
   - Check if token is properly formatted
   - Verify token hasn't expired

3. **CORS errors:**
   - Verify frontend URL in CORS configuration
   - Check if preflight requests are handled

### Logs
- Application logs show in console
- Debug level enabled for security and application packages
- H2 SQL queries are logged for debugging

---

**Backend is ready for the CryptoScore hackathon demo! 🚀**