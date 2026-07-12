# Module Design

## 1. Overview

VIRA is designed using a modular architecture in which each module performs a specific responsibility within the system. This approach improves maintainability, scalability, and code reusability while allowing future enhancements without affecting the overall architecture.

---

## 2. Module List

The VIRA platform consists of the following modules:

1. User Authentication
2. Dashboard
3. Log Upload
4. Log Parser
5. AI Alert Analysis
6. MITRE ATT&CK Mapping
7. Incident Response Recommendation
8. Report Generation

---

## 3. Module Description

### 3.1 User Authentication

**Purpose**

Provides secure access to the VIRA platform.

**Functions**

* User login
* User logout
* Password verification
* Session management

**Input**

* Username
* Password

**Output**

* User authentication status
* Dashboard access

---

### 3.2 Dashboard

**Purpose**

Displays an overview of uploaded logs, detected alerts, AI analysis, and generated reports.

**Functions**

* Alert summary
* Incident overview
* Recent uploads
* Navigation to system modules

**Input**

* Alert data
* Incident information

**Output**

* Interactive dashboard

---

### 3.3 Log Upload

**Purpose**

Allows users to upload security log files.

**Functions**

* Upload CSV logs
* Upload JSON logs
* Validate file format
* Store uploaded files

**Input**

* CSV
* JSON

**Output**

* Stored log file

---

### 3.4 Log Parser

**Purpose**

Extracts useful information from uploaded log files.

**Functions**

* Parse CSV
* Parse JSON
* Extract security events
* Normalize log fields

**Input**

* Uploaded logs

**Output**

* Structured security events

---

### 3.5 AI Alert Analysis

**Purpose**

Uses a local AI model to analyze security events.

**Functions**

* Threat explanation
* Alert analysis
* Severity estimation
* AI recommendations

**Input**

* Parsed logs

**Output**

* AI analysis

---

### 3.6 MITRE ATT&CK Mapping

**Purpose**

Maps detected activities to MITRE ATT&CK tactics and techniques.

**Functions**

* Technique mapping
* Tactic identification
* Attack description

**Input**

* AI findings

**Output**

* MITRE ATT&CK mapping

---

### 3.7 Incident Response Recommendation

**Purpose**

Provides recommended response actions for detected threats.

**Functions**

* Containment suggestions
* Investigation guidance
* Mitigation recommendations

**Input**

* AI analysis
* MITRE mapping

**Output**

* Response recommendations

---

### 3.8 Report Generation

**Purpose**

Generates a professional incident investigation report.

**Functions**

* PDF generation
* Incident summary
* AI findings
* MITRE mapping
* Response recommendations

**Input**

* Incident data

**Output**

* PDF report

---

## 4. Module Interaction

The modules communicate in the following sequence:

User Authentication
→ Dashboard
→ Log Upload
→ Log Parser
→ AI Alert Analysis
→ MITRE ATT&CK Mapping
→ Incident Response Recommendation
→ Report Generation

---

## 5. Design Benefits

* Modular architecture
* Easy maintenance
* Independent development
* Scalable implementation
* High code reusability
* Easy integration of future features
* Improved testing and debugging
