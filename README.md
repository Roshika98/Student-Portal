# Student Portal
## This project is conducted as part of the requirements for BCS HEQ Professional Graduate Diploma Level
The Student Portal is a web-based system designed to streamline administrative and academic tasks for students at Wayamba University of Sri Lanka being developed as part of the requirements of BCS HEQ Professional Graduate Diploma. It provides a centralized platform for students to manage their course registrations, exams, grades, and other related activities throughout their degree program.

## Key Features

- **Course Registration**: Students can easily register for their desired course modules at the beginning of each academic year. The system verifies eligibility and availability of modules, ensuring a smooth registration process.

- **Exam Management**: The portal facilitates hassle-free exam registration, allowing students to select exams corresponding to their registered course modules and choose suitable exam slots. Exam schedules are automatically generated and provided to the students.

- **Grade Tracking**: Students can conveniently access their grades for completed course modules and track their overall GPA. The system calculates GPA based on exam scores, assignments, and other assessments.

- **Course Information**: The portal provides detailed information about each course module, including descriptions, objectives, prerequisites, and credit values. This helps students make informed decisions when selecting modules.

- **Notifications**: Students receive important updates, deadlines, and announcements through the portal's notification system. They stay informed about registration periods, exam schedules, academic events, and other university-related information.

## Technologies Used

The Student Portal is built using modern web technologies, including:

- **Front-end**: HTML5, CSS with Bootstrap 5
- **Back-end**: Node.js with Express framework
- **Database**: MongoDB (mongo Atlas)

## Getting Started

To get started with the Student Portal, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/student-portal.git`
2. Install the required dependencies: `npm install`
3. Configure the database connection in `.env` file.
4. Start the server: `npm run dev`
5. Access the Student Portal in your web browser at `http://localhost:3000`

Please refer to the project documentation for more detailed information on system requirements, installation, and usage.

## Configuration

The Student Portal project utilizes a configuration file for easy management of essential settings. To configure the system, follow these steps:

1. create the `.env` file at the root of the project.
2. Open the `.env` file in a text editor.
3. Set the following keys with their respective values:

```
DATABASE_URL=<database_url>
SERVER_PORT=<server_port>   # Default value: 3000
SESSION_SECRET=<session_secret>
SESSION_NAME=<session_name>
SESSION_IDLE_TIMEOUT=<session_idle_timeout>
```

- `DATABASE_URL`: Specify the URL or connection string for the MongoDB database.
- `SERVER_PORT`: Define the desired port number for the server to run on. If not specified, the default value is set to 3000.
- `SESSION_SECRET`: Provide a secret key for session encryption and security.
- `SESSION_NAME`: Enter the name of the session cookie used for user authentication and session management.
- `SESSION_IDLE_TIMEOUT`: Set the idle timeout duration for user sessions, after which the session will expire.

4. Save the changes to the `.env` file.



## License

The Student Portal is released under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions regarding the Student Portal, please feel free to [contact us](mailto:pereraroshika98@gmail.com). We appreciate your feedback and support!

This README file provides an overview of the Student Portal, highlighting its key features, technologies used, and instructions for getting started. It also includes information on contributing to the project, the license under which it is released, and contact details for further inquiries. Feel free to customize and expand upon this content as per your project's specific requirements.
