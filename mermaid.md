graph TD
    %% Frontend Subgraph
    subgraph "Frontend"
        FE_Main["React Application"]:::frontend
        F_UI["React UI Components"]:::frontend
        F_PAGES["Pages/Screens"]:::frontend
        F_AUTH["Authentication Module"]:::frontend
        F_TX["Transactions Module"]:::frontend
        F_USERS["Users Module"]:::frontend
        F_API["API Layer"]:::frontend
        F_STATE["State Management"]:::frontend
    end

    %% Backend Subgraph
    subgraph "Backend"
        B["Spring Boot Application"]:::backend
        B_CONFIG["Configuration & Properties"]:::backend
        B_TEST["Testing"]:::backend
        B_BUILD["Build & Dependency Management"]:::backend
    end

    %% External Component
    DB["Database"]:::database

    %% Frontend internal relationships
    FE_Main -->|"includes"| F_UI
    F_UI -->|"renders"| F_PAGES
    F_UI -->|"integrates"| F_AUTH
    F_UI -->|"integrates"| F_TX
    F_UI -->|"integrates"| F_USERS
    FE_Main -->|"uses"| F_API
    F_STATE -->|"manages"| F_AUTH
    F_STATE -->|"manages"| F_TX
    F_STATE -->|"manages"| F_USERS

    %% Communication between Frontend and Backend
    F_API -->|"REST_API"| B

    %% Backend internal relationships
    B -->|"configured_by"| B_CONFIG
    B -->|"validated_by"| B_TEST
    B -->|"built_with"| B_BUILD

    %% Backend and External Database
    B -->|"Data_Persistence"| DB

    %% Click Events for Frontend Components
    click FE_Main "https://github.com/youssefchehata/budgetease/tree/main/frontend/src"
    click F_PAGES "https://github.com/youssefchehata/budgetease/tree/main/frontend/src/pages"
    click F_AUTH "https://github.com/youssefchehata/budgetease/tree/main/frontend/src/features/auth"
    click F_TX "https://github.com/youssefchehata/budgetease/tree/main/frontend/src/features/transactions"
    click F_USERS "https://github.com/youssefchehata/budgetease/tree/main/frontend/src/features/users"
    click F_API "https://github.com/youssefchehata/budgetease/tree/main/frontend/src/api"
    click F_STATE "https://github.com/youssefchehata/budgetease/tree/main/frontend/src/app"

    %% Click Events for Backend Components
    click B "https://github.com/youssefchehata/budgetease/blob/main/backend/src/main/java/com/budgetease/BackendApplication.java"
    click B_CONFIG "https://github.com/youssefchehata/budgetease/blob/main/backend/src/main/resources/application.properties"
    click B_TEST "https://github.com/youssefchehata/budgetease/blob/main/backend/src/test/java/com/budgetease/BackendApplicationTests.java"
    click B_BUILD "https://github.com/youssefchehata/budgetease/blob/main/backend/pom.xml"

    %% Styles
    classDef frontend fill:#ADD8E6,stroke:#000,stroke-width:2px;
    classDef backend fill:#98FB98,stroke:#000,stroke-width:2px;
    classDef database fill:#F4A460,stroke:#000,stroke-width:2px;