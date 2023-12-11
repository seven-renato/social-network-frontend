# Social Network Application - Frontend with React JS

## Project Creators
- Paulo Renato Neto - [GitHub](https://github.com/seven-renato/)
- Nairo Elsner - [GitHub](https://github.com/nairoelsner/)

## Project Description

This project was developed as part of the 4th semester of the Data Structures and Languages course, taught by Prof. Dr. Eduardo Nunes Borges, at the Federal University of Rio Grande. The main goal is to implement a social network application that simulates loading, manipulation, and verification operations of a set of in-memory data structures.

## Functional Requirements

The application meets the following functional requirements:

- Individuals or organizations can create profiles on the network and are users of the application.
- Individuals can choose to keep certain profile information private.
- Individuals can relate to other individuals in different ways: friendship (bidirectional), family (bidirectional), or acquaintance (unidirectional).
- Individuals or organizations can be clients of other organizations.
- Users can search for individuals or organizations based on any information recorded in the profiles. The search should be performed in levels, meaning first those connected to the user and then those connected to the connected ones and so on.
- It should be possible to visualize the social network graph centered on the user, with at least two levels.

## Non-functional Requirements

- The application must have a graphical interface to perform all functionalities.
- The interface can be desktop-dependent on the operating system or web-based.

## Instructions for the Frontend

This directory contains the source code for the frontend of the application developed with React JS and Ant Design.

### Execution

Visit [social-network-graphs-url] to view the application in the browser.

### Project Structure

- `src/`: Contains the source code of the application.
- `public/`: Contains public files, such as the main HTML.
- `src/pages`: Contains all pages in the project, including Home, Login, Profile, and Register. In each one, in the "documentation" branch, there is an explanation of each method and its functionalities.
- `src/components`: Contains components related to the visualization of the social network graph centered on the user, with at least two levels, using BREADTH-FIRST SEARCH.

### Technologies Used

- React JS
- Ant Design for Components

## API with Flask Application for Social Network based on OOP and Graph Utilization
https://github.com/nairoelsner/social-network

### Contribution

Feel free to contribute to code improvements or bug fixes. Open an [issue](https://github.com/seu-usuario/nome-do-repositorio/issues) to discuss major changes.

### License

This project is distributed under the [MIT license](https://opensource.org/licenses/MIT). Refer to the `LICENSE` file for details.
