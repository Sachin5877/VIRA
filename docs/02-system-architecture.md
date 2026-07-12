# System Architecture

## 1. Architecture Overview


VIRA (An AI-Assisted Platform for Security Alert Investigation and Incident Response) is designed as a modular web-based cybersecurity application that assists security analysts in investigating security alerts and responding to incidents. The system follows a three-tier architecture consisting of a React-based frontend, a FastAPI backend, and a SQLite database. Artificial intelligence capabilities are provided through a locally hosted large language model using Ollama with Llama 3.1 8B, enabling intelligent alert analysis and response recommendations. Security log files uploaded by users are processed by the backend, analyzed by the AI engine, mapped to the MITRE ATT&CK framework, and presented through an interactive dashboard. The modular architecture ensures scalability, maintainability, and easy integration of future cybersecurity features.


## 2. System Components


The VIRA platform consists of the following major components:

* **Frontend (React + Vite):** Provides the user interface for authentication, dashboard, log upload, alert visualization, and report generation.

* **Backend (FastAPI):** Handles API requests, processes uploaded logs, communicates with the AI engine, performs MITRE ATT&CK mapping, and manages incident response workflows.

* **SQLite Database:** Stores user credentials, uploaded logs, alert records, incident details, and generated reports.

* **AI Engine (Ollama + Llama 3.1 8B):** Analyzes security alerts, explains suspicious activities, identifies possible threats, and recommends response actions.

* **MITRE ATT&CK Knowledge Base:** Uses an offline MITRE ATT&CK dataset to map detected activities to relevant tactics and techniques.

* **PDF Report Generator:** Generates professional incident investigation reports containing alert details, AI analysis, MITRE mappings, and response recommendations.


## 3. Architecture Diagram

                    +----------------------+
                    |        User          |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    | React Frontend (UI)  |
                    +----------+-----------+
                               |
                      REST API (HTTPS)
                               |
                               v
                    +----------------------+
                    |  FastAPI Backend     |
                    +----------+-----------+
                               |
          +----------+---------+----------+-----------+
          |          |                    |           |
          v          v                    v           v
   +-----------+ +-----------+    +---------------+ +------------------+
   | SQLite DB | | AI Engine |    | MITRE ATT&CK | | PDF Report Engine |
   |           | | Ollama +  |    | Offline Data | |                  |
   |           | | Llama 3.1 |    |              | |                  |
   +-----------+ +-----------+    +---------------+ +------------------+
```

## 4. Data Flow

## 4. Data Flow

The data processing workflow in VIRA follows a structured sequence to ensure efficient security alert investigation and incident response.

1. The user logs into the VIRA platform using valid credentials.
2. The user uploads a security log file in CSV or JSON format.
3. The FastAPI backend validates and parses the uploaded log.
4. The processed log data is stored in the SQLite database.
5. The AI engine (Ollama with Llama 3.1 8B) analyzes the log to identify suspicious activities and potential security threats.
6. The backend maps the detected attack patterns to the offline MITRE ATT&CK knowledge base.
7. The system generates recommended incident response actions based on the AI analysis.
8. The dashboard displays the alert details, AI findings, MITRE mappings, and recommended actions.
9. The user can generate and download a PDF incident investigation report for documentation and future reference.


## 5. Component Responsibilities


| Component                         Responsibility                                                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| React Frontend                    | Provides the user interface for authentication, dashboard, log upload, alert visualization, and report generation.                  |
| FastAPI Backend                   | Processes user requests, manages APIs, parses logs, communicates with the AI engine, and coordinates system operations.             |
| SQLite Database                   | Stores user information, uploaded logs, alert records, incident details, and generated reports.                                     |
| AI Engine (Ollama + Llama 3.1 8B) | Analyzes security alerts, explains suspicious activities, identifies possible threats, and recommends appropriate response actions. |
| MITRE ATT&CK Knowledge Base       | Maps detected attack patterns to MITRE tactics and techniques using an offline dataset.                                             |
| PDF Report Generator              | Generates downloadable incident investigation reports containing alert analysis, MITRE mappings, and response recommendations.      |

## 6. Security Considerations

VIRA is designed with fundamental security practices to protect user data and system integrity. User authentication restricts unauthorized access to the platform. Uploaded log files are validated before processing to reduce the risk of malicious input. Passwords are securely stored using hashing techniques instead of plain text. All communication between the frontend and backend is performed through REST APIs, and sensitive information is processed within the backend without exposing internal logic to the client. The AI model and MITRE ATT&CK dataset are hosted locally, reducing dependency on external cloud services and improving data privacy.


## 7. Architecture Benefits

The proposed architecture provides a modular, scalable, and maintainable foundation for cybersecurity operations. The separation of frontend, backend, database, AI engine, and MITRE knowledge base allows each component to be developed and maintained independently. The use of open-source technologies minimizes deployment costs while ensuring flexibility for future enhancements. The architecture also supports the integration of additional log formats, threat intelligence sources, and advanced AI models without major structural changes.
