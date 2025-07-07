# 🧾 Product Specification: Universal MCP Front End

## 1. Overview

**Product Name:** Universal MCP Front End  
**Purpose:**  
To provide a single, user-friendly interface that enables users to interact with multiple Model Context Protocol (MCP) servers using natural language queries. The front end supports natural language input, SQL and ML execution via BigQuery, dynamic visualization rendering, and access control via unique keys.

## 2. Goals & Objectives

- Deliver a **flexible, elegant playground interface** for users to explore data using natural language.
- Support **multiple MCP servers**, each with their own custom branding, data sources, and logic.
- Ensure **secure, lightweight access control** using human-readable API keys.
- Enable **visualization of structured query results**, auto-generated when appropriate.
- Provide a **seamless developer and user onboarding** experience.

## 3. Target Users

- Analysts, coaches, and ops staff working with sports data (e.g., NWSL, SEC teams).
- Non-technical users seeking insights from complex datasets.
- Internal product or data science teams using different MCP instances.

## 4. Key Features

### 4.1 Multi-Server Selection
- Dropdown or route-based selector for different MCP instances (e.g., `/sec`, `/nwsl`)
- Each instance can have:
  - Custom system prompt
  - Theme and logo
  - Unique dataset connections

### 4.2 Query Interface
- Natural language input with support for:
  - Follow-up questions
  - Clarifications
  - System-level instructions
- Editable system prompt per session
- Display of agent reasoning (optional, toggle)

### 4.3 Visualization Output
- Automatic detection of when a visualization would help
- Support for:
  - Bar, line, pie, scatter charts
  - Tables with pagination
- Rendered using Chart.js, D3.js, or Looker Studio embeds

### 4.4 API Key Authentication
- Lightweight API key entry at launch
- Keys prefixed by server identity (e.g., `SEC-xxxxx`)
- Keys mapped to user email and allowed services
- Key storage in local/session storage

### 4.5 Usage History & Debugging (Admin)
- Optional admin panel with:
  - Query logs
  - Tool usage heatmaps
  - OpenAI Agent inspector visualization
- Per-user or per-key usage insights

## 5. Technical Stack

| Layer | Technology |
|------|-------------|
| Frontend | Next.js (React) hosted on Vercel |
| Backend | MCP Servers (Node.js or Python with OpenAI SDK) |
| Data | Google BigQuery |
| Auth | Custom key-based auth service (GCP SQL) |
| Visualizations | Chart.js / D3.js / Looker Studio (embeds) |
| Observability | GCP Logs + Admin dashboard |

## 6. UX Requirements

- **Minimal onboarding:** API key, optional name/email input
- **Fast feedback loop:** Queries return within 5s whenever possible
- **Clarity over complexity:** Always show fallback plain-language summaries
- **Mobile responsive:** Works on tablets, limited mobile support

## 7. Future Considerations

- ✨ Support for unstructured data (via vector search integration)
- ✨ Voice input and audio responses
- ✨ Fine-grained user permissions (key scopes)
- ✨ Visual query builder for power users
- ✨ Webhooks or alerts based on saved queries
