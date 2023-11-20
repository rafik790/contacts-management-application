# Contacts Management Application (CMA)

This is a CMA(Contacts Management Application) built by following SOA Architecture. I used Angular 16.1.0 for building front-end and .NET Core 6.0 to build backend.

## Design Decisions and Application Structure

### Angular App
- The front-end(Angular) follows Layered architecture with modular structure.
- We have two layers - components,services and models
- **Conponent Layer** - This layer called Service Layer to communicate with backend. I have built seperate compontent for each features like contact-list for listing, add edit contacts for adding/updating a contact
- **Sevice Layer** - This Layer helps components to retieve data from backend and add/update data in backend. Her I used angular in-build HttpClient to call back-end services
- **Models** - All models will be created in this Layer

- Also built some resuable compontents like pagination, confirmation box, and toaster

- I used following package to build the application
- **Bootstrap for Layout Design**: The application leverages Bootstrap for creating a responsive and visually appealing layout, ensuring a consistent and user-friendly design.

- **ng-bootstrap for Popups**: Popups for adding and editing contacts are implemented using ng-bootstrap. This library provides Bootstrap components written in Angular, allowing for easy integration of Bootstrap features into Angular applications. The use of modals enhances the user experience when interacting with contact details.

- **Reactive Forms with Validations**: Reactive forms are used to handling user input in a structured and efficient manner. Angular's reactive forms offer powerful features, including built-in validation capabilities. This ensures that the data entered by users meets the specified criteria, providing a smoother and error-resistant user experience.

### .NET Core App

- The .NET Core app also follows a layered architecture with separate namespace for controllers, services, repositories, models and dto(data transfer object).
- Dependency Injection feature of .Net Core is used to inject services into controllers and repositories into services.
- Service Layer - This layer is used to implement business logic.
- Repositoy Layer - This layer is used to persist data and communicate with storage  
- Error handling is implemented using standard try catch in each layer.


## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [.NET Core SDK](https://dotnet.microsoft.com/download)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rafik790/contacts-management-application.git
   ```

2. Navigate to the project root directory:

   ```bash
   cd contacts-management-application
   ```

3. Install npm packages for the Angular app:

   ```bash
   cd CMAFrontEnd
   npm install
   ```

4. Restore NuGet packages for the .NET Core app:

   ```bash
   cd ..
   cd CMABackEnd
   dotnet restore
   ```

## How to Run the Application

### Angular App

1. Navigate to the `CMAFrontEnd` directory:

   ```bash
   cd CMAFrontEnd
   ```

2. Run the Angular development server:

   ```bash
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200/` to access the Angular app.

### .NET Core App

1. Navigate to the project root directory:

   ```bash
   cd CMABackEnd
   ```

2. Run the .NET Core application:

   ```bash
   dotnet run
   ```

3. Open your browser and navigate to `https://localhost:7115/` to access the .NET Core API.


### Performance & Handling Large Scale Data
To enhance the performance and handling large data we can consider following techics

1. **Caching Strategies**: As we all know caching is a crucial technique in software development that plays a vital role in improving application performance, scalability, and efficiency. By storing frequently accessed data in a temporary storage space, caching can significantly reduce the load on databases, APIs, and other external resources. 
In .NET Core, various caching strategies are available to optimize data retrieval and enhance application responsiveness.

2. **Database Indexing**: Database indexing is a technique that enhances the performance of database operations by creating a data structure that facilitates faster retrieval of specific data records. So we should ensure that database tables are properly indexed.

3. **Asynchronous Programming**: Asynchronous programming is a programming paradigm that allows execution of multiple tasks concurrently, without blocking the main thread. This is particularly beneficial for I/O-bound operations, such as network requests, file access, and database interactions. 

4. **Database Query Optimization**: Optimize database queries to retrieve only the necessary data. We should ensure that our database query do not use `SELECT *` and `IN(SELECT id )` when fetching data from database.

5. **Pagination**: By retrieving only a subset of data at a time, pagination significantly reduces the response time for retrieving large datasets. This is because the server only needs to process and transfer a smaller amount of data, resulting in faster loading times.

6. **Connection Pooling**:  Connection pooling eliminates the need to create new connections for each request, saving time and resources. It allows an application to handle more concurrent requests without encountering connection bottlenecks.

7. **Performance Monitoring**: Performance monitoring tools(Azure Application Insights, AWS XRAY) help to identify and resolve performance bottlenecks, leading to a faster and more responsive application.

