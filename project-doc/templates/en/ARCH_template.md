# ARCH-NNN: [Architecture Design Title]

## Basic Information
- **Document ID**: ARCH-NNN
- **Created**: YYYY-MM-DD
- **Owner**: [Owner Name]

## System Overview

[Describe the overall architecture and core components]

## Technology Stack

| Domain | Choice | Reason |
|:---------|:-----|:-----|
| Backend Framework | [Framework Name] | [Selection Reason] |
| Database | [Database Name] | [Selection Reason] |

## Core Component Design

### Component 1: [Component Name]
- **Responsibility**: [Component Responsibility]
- **Interface**: [Key Interfaces]

## Data Flow Diagram

```mermaid
graph LR
    A[User] --> B[Frontend]
    B --> C[API Gateway]
    C --> D[Backend Service]
    D --> E[Database]
```

## Deployment Topology

```mermaid
graph TB
    A[User] --> B[Load Balancer]
    B --> C[Server 1]
    B --> D[Server 2]
```

## Related Documents

- Requirement Document: [Link]
- API Specification: [Link]