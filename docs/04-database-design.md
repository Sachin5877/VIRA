# Database Design

## 1. Overview

VIRA uses SQLite as its primary database to store user information, uploaded security logs, detected alerts, incident response details, and generated reports. SQLite was selected because it is lightweight, open source, serverless, and suitable for standalone cybersecurity applications and academic projects.

---

## 2. Database Tables

The VIRA database consists of the following tables:

1. Users
2. Logs
3. Alerts
4. MITRE_Mapping
5. Reports

---

## 3. Table Design

### 3.1 Users

| Field      | Data Type | Description           |
| ---------- | --------- | --------------------- |
| id         | INTEGER   | Primary Key           |
| username   | TEXT      | Username              |
| password   | TEXT      | Hashed Password       |
| created_at | DATETIME  | Account Creation Date |

---

### 3.2 Logs

| Field       | Data Type | Description        |
| ----------- | --------- | ------------------ |
| id          | INTEGER   | Primary Key        |
| filename    | TEXT      | Uploaded File Name |
| file_type   | TEXT      | CSV or JSON        |
| upload_time | DATETIME  | Upload Timestamp   |
| status      | TEXT      | Processing Status  |

---

### 3.3 Alerts

| Field       | Data Type | Description                 |
| ----------- | --------- | --------------------------- |
| id          | INTEGER   | Primary Key                 |
| log_id      | INTEGER   | Reference to Logs Table     |
| severity    | TEXT      | Low, Medium, High, Critical |
| threat_name | TEXT      | Detected Threat             |
| ai_analysis | TEXT      | AI Explanation              |
| created_at  | DATETIME  | Detection Time              |

---

### 3.4 MITRE_Mapping

| Field        | Data Type | Description               |
| ------------ | --------- | ------------------------- |
| id           | INTEGER   | Primary Key               |
| alert_id     | INTEGER   | Reference to Alerts Table |
| tactic       | TEXT      | MITRE Tactic              |
| technique    | TEXT      | MITRE Technique           |
| technique_id | TEXT      | Technique Identifier      |

---

### 3.5 Reports

| Field        | Data Type | Description               |
| ------------ | --------- | ------------------------- |
| id           | INTEGER   | Primary Key               |
| alert_id     | INTEGER   | Reference to Alerts Table |
| report_name  | TEXT      | PDF File Name             |
| generated_at | DATETIME  | Report Generation Time    |

---

## 4. Entity Relationship

Users
│
├── Uploads
│
▼
Logs
│
▼
Alerts
│
▼
MITRE Mapping
│
▼
Reports

---

## 5. Database Relationships

* One user can upload multiple log files.
* One log file can generate multiple alerts.
* One alert is associated with one MITRE ATT&CK mapping.
* One alert can generate one PDF investigation report.

---

## 6. Database Benefits

* Lightweight and serverless architecture.
* Easy integration with FastAPI.
* Efficient storage for cybersecurity log analysis.
* Supports future migration to PostgreSQL if required.
* Simple backup and maintenance.
