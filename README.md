Project Overview

This project is a task management application that consists of both a Frontend and a Backend component, allowing users to manage their tasks with ease and flexibility.

Features:

Frontend (Next.js):

-Interactive and Responsive Table: Displays tasks in a clean and responsive table layout, optimized for various screen sizes.
-User-Friendly Controls: Allows users to add tasks easily with intuitive controls.
-Intuitive Design: The design is crafted to enhance the user experience, providing a smooth and engaging interface.

Backend (NestJS):

-API Endpoints for CRUD Operations: Provides the necessary API endpoints for Create, Read, Update, and Delete operations on tasks.

Additional Features:

-Drag-and-Drop Row Reordering:
Users can reorder tasks by dragging a row and dropping it in a specific position within the table.
Example: Moving "Design Mockup" below "Code Review" will change the order of tasks in the table.

-Resizable Columns:
Users can change the width of a column by dragging the edges of its header.
Example: Adjusting the "Task Name" column to be wider or narrower based on user preference.

-Column Filtering and Sorting
Filtering: Allows users to filter tasks based on a specific column, such as filtering tasks by "Assignee" (e.g., show only tasks assigned to Jane Doe).
Sorting: Users can sort tasks based on columns like "Due Date" to quickly see tasks in chronological order.

-Integration with Dummy Database
The application integrates with a dummy database for testing purposes.

Issue with Saving Updated Task Order!

Currently, the functionality to persist the updated task order to the backend is not implemented.
Current Solution: The task order is saved in the Redux store, meaning that while the order can be reordered within the application, the changes will not persist after a page refresh (i.e., the order will return to its initial state).
Future Work(Upon Request): Implement the functionality to save the reordered tasks to the backend so that the order remains consistent even after a refresh.
