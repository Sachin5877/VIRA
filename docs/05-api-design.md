# API Design

## 1. Overview

VIRA follows a RESTful API architecture where the React frontend communicates with the FastAPI backend through HTTP requests. Each API endpoint performs a specific operation such as user authentication, log management, AI analysis, MITRE ATT&CK mapping, and report generation.

---

## 2. API Endpoints

### 2.1 Authentication

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| POST   | /login   | Authenticate user   |
| POST   | /logout  | Logout current user |

---

### 2.2 Log Management

| Method | Endpoint   | Description                 |
| ------ | ---------- | --------------------------- |
| POST   | /upload    | Upload CSV or JSON log file |
| GET    | /logs      | Retrieve uploaded logs      |
| GET    | /logs/{id} | Retrieve a specific log     |

---

### 2.3 Alert Analysis

| Method | Endpoint     | Description                   |
| ------ | ------------ | ----------------------------- |
| POST   | /analyze     | Analyze uploaded security log |
| GET    | /alerts      | Retrieve all detected alerts  |
| GET    | /alerts/{id} | Retrieve alert details        |

---

### 2.4 MITRE ATT&CK Mapping

| Method | Endpoint          | Description                                |
| ------ | ----------------- | ------------------------------------------ |
| GET    | /mitre/{alert_id} | Retrieve MITRE ATT&CK mapping for an alert |

---

### 2.5 Incident Response

| Method | Endpoint             | Description                                             |
| ------ | -------------------- | ------------------------------------------------------- |
| GET    | /response/{alert_id} | Retrieve AI-generated incident response recommendations |

---

### 2.6 Reports

| Method | Endpoint     | Description                   |
| ------ | ------------ | ----------------------------- |
| POST   | /report      | Generate incident report      |
| GET    | /report/{id} | Download generated PDF report |

---

## 3. API Workflow

1. User logs into the platform.
2. User uploads a security log file.
3. Backend validates and parses the log.
4. AI engine analyzes the parsed data.
5. MITRE ATT&CK mapping is generated.
6. Incident response recommendations are created.
7. Results are stored in the database.
8. Dashboard displays the analysis.
9. User downloads the generated PDF report.

---

## 4. Response Format

All APIs return responses in JSON format.

### Success Response

```json
{
  "status": "success",
  "message": "Operation completed successfully"
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Invalid request"
}
```

---

## 5. API Security

* User authentication is required before accessing protected endpoints.
* Input validation is performed for all uploaded files.
* Invalid requests return appropriate HTTP status codes.
* Passwords are never exposed through API responses.
* Backend handles all AI processing securely.
