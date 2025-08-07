# Food Facility Finder

## Description

### Problem Statement

This is for the **Food Facilities Challenge**, which is to build an application around the data set about Mobile Food Facilities in San Francisco (https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data). I opted to go for the Frontend Focused Version, where the ask was the following:

Your application should have the following features:

-  Search by name of applicant. Include optional filter on "Status" field.
-  Search by street name. The user should be able to type just part of the address. Example: Searching for "SAN" should return food trucks on "SANSOME ST"
-  Build a UI using a frontend framework like React. You have creative freedom to design the UI however you would like.

_Bonus points:_

-  Write automated tests
-  Use an API documentation tool
-  Build the other features listed in the Backend Focused Version

### Solution Overview

From the user's perspective, the solution has a search bar at the top, where the user can search food facilities by name, address, or both fields, and can also filter by statuses. The user can also clear all filters to reset the search. The application lists the number of facilities found and the individual facilities and their information in cards as a grid list.

Behind the scenes, there is a service that loads and parses the CSV data and a custom React hook to handle the filtering. There are tests written for both of these.

## Technical & Architectural Decisions

### Technology Stack

-  **Frontend Framework**: React with TypeScript
-  **Build Tool**: Vite
-  **Testing Framework**: Vitest

### Architecture Decisions

#### Component Structure

I adopted a component-based architecture with clear separation of concerns:

-  **App**: Main container component that orchestrates state and coordinates between search and display components
-  **SearchBar**: Reusable search component with field selection and status filtering capabilities
-  **FacilityList**: Container component that handles the list rendering and empty/error states
-  **FacilityCard**: Individual facility display component that shows name, address, and status

#### Data Management

I implemented a service layer pattern with the following architecture:

-  **FoodFacilityService**: Handles CSV data loading, parsing, and transformation. I utilized the PapaParse library for CSV parsing to save some time.
-  **useFoodFacilities Hook**: Custom React hook that manages application state and search logic
-  **Local State Management**: Used React's useState for component-level state management

The service layer abstracts data operations from UI components, making the codebase more testable and maintainable. The custom hook encapsulates all facility-related logic, providing a clean API for components to consume.

**Data Flow**: CSV → Service (parse/transform) → Hook (state management) → Components (UI rendering)

#### Performance Considerations

-  **Data Strategy**: CSV loaded once at startup and cached in memory for instant search operations
-  **Search Implementation**: Real-time filtering on keystroke using client-side array methods (suitable for ~500 record dataset)
-  **Rendering**: Optimized component structure to prevent unnecessary re-renders during search

For the current scope, client-side filtering satisfies the user requirements with instant search results.

#### Testing Strategy

I implemented testing using Vitest and React Testing Library:

-  **Unit Tests**: Service layer functions for data parsing and transformation
-  **Hook Tests**: Custom hook behavior including search functionality and error handling
-  **Component Tests**: TBD as I did not have the time to get to it

#### AI Use

I utilized Claude and Github Copilot for troubleshooting, minor CSS assistance, and creating a template for this README.

## Critique Section

### What Would You Have Done Differently with More Time?

I would have completed the component testing and fleshed out the tests I do have for useFoodFacilities and foodFacilityService a bit more. I would have invested a little more time in the user interface to make it a little more user-friendly (eg. converting status values from all-caps to proper case (APPROVED -> Approved)).

### Trade-offs Made

I chose to focus on core functionality over advanced features like maps integration, detailed facility information, or complex filtering options. This allowed me to deliver a working solution within the time constraints. I also prioritized unit and hook tests over component tests to ensure core logic was reliable, accepting that UI testing would need to be completed later.

### What Was Left Out

I completed the core requirements but as mentioned, I didn't complete the component testing suite. I did not complete any of the other bonus requirements.

### Current Issues + Scaling Challenges / Proposed Solutions

**Memory Usage/Search Performance**: Loading the entire dataset into memory isn't sustainable for larger datasets and could cause performance issues on low-end devices. Also linear search through arrays becomes inefficient with larger datasets - O(n) complexity doesn't scale well.

-  Can implement a database with proper indexing and backend with search endpoints and pagination to solve memory usage and search performance issues.

**No Caching Strategy**: There's no persistence of search results.

-  Can implement client-side cashing with browser localStorage or server-side caching for common queries.

**Data Validation**: Data validation and sanitization could be fleshed out more beyond basic type checking.

-  Could add comprehensive server-side validation and input sanitization.

**Concurrent Users**: There's no consideration for multiple users or concurrent access patterns.

-  Can implement proper session management, request rate limiting, database connection pooling, and horizontal scaling with load balancers.

**Accessibility**: I didn't implement comprehensive accessibility features like keyboard navigation, screen reader support, or ARIA labels.

-  Can add ARIA labels, keyboard navigation support, screen reader compatibility, focus management, and semantic HTML structure following WCAG 2.1 guidelines.

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Running Tests

```bash
npm test
```

### Data Source

The `Mobile_Food_Facility_Permit.csv` is located in the `public/` directory.

## Project Structure

```
src/
├── components/         # React components
├── hooks/              # Custom React hooks
├── services/           # API and data services
├── types/              # TypeScript type definitions
└── test/               # Test setup and utilities
```
