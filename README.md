# EZBOB - React Search Engine Client

This project is a lightweight search engine client built with React using Vite that implements a functional search bar with autocomplete and paginated results. The application is designed to mimic Google search behavior in a simplified manner.

## Features

### Core Functionality
1. **Search Input**:
   - Allows users to type search queries.
   - Autofocuses on load for better user experience.
   - Triggers autocomplete suggestions based on the input.

2. **Autocomplete**:
   - Suggests matching entries from a local "database".
   - Highlights items from the user's search history.
   - Supports a maximum of 10 autocomplete items.

3. **Search Results**:
   - Displays a list of search results matching the query.
   - Includes metadata such as the total number of results and search duration.
   - Each result includes:
     - Clickable title as a link.
     - Short description.
   - Pagination for navigating through multiple pages of results.

4. **Pagination**:
   - Dynamically displays page numbers based on the total results.
   - Allows users to navigate to specific pages or move to the next set of results.

### Additional Features
- **Search History Management**:
  - Maintains a history of user searches.
  - Items in the history can be removed, changing their color to indicate removal.
- **Dynamic Routing**:
  - `/` - Home page with the search input and results.
  - `/post/:id` - Detailed view of individual results.

### Design
- Clean and responsive UI.
- Styled using CSS for modular design consistency.

