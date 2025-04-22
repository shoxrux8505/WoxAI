# AI Business Optimizer

This project is a web application built using the Quasar Framework and Vue.js, designed to optimize business processes with the help of artificial intelligence (AI). The application allows users to select a business process, input a description of their current situation, upload CSV files, and receive AI-generated recommendations.

## Features

- **User Interface**: Utilizes Quasar components for a responsive and user-friendly interface.
- **Business Process Selection**: Users can select from various business processes (Sales, Customer Service, Marketing, Finance, HR, Logistics) using a dropdown menu.
- **Description Input**: A text area for users to describe their current business situation.
- **CSV File Upload**: Users can upload CSV files containing business details for analysis.
- **AI Recommendations**: A button to fetch recommendations from the OpenAI API based on user input.
- **PDF Download**: Users can download the generated recommendations as a PDF document.
- **Request History**: Displays a history of requests, including timestamps, selected processes, and received recommendations.
- **Email Reports**: Functionality to send reports via EmailJS, with notifications for successful sends.

## Technologies Used

- **Quasar Framework**: For building the user interface.
- **Vue.js**: For managing application state and logic.
- **Axios**: For making HTTP requests to the OpenAI API.
- **jsPDF**: For generating PDF files.
- **EmailJS**: For sending reports via email.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd ai-business-optimizer
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key
   EMAILJS_USER_ID=your_emailjs_user_id
   EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   EMAILJS_SERVICE_ID=your_emailjs_service_id
   ```

4. **Run the Application**:
   ```bash
   quasar dev
   ```

## Usage

- Navigate to the application in your web browser.
- Select a business process from the dropdown menu.
- Enter a description of your current business situation.
- Upload a CSV file if needed.
- Click the "Get AI Recommendations" button to receive suggestions.
- View the recommendations and download them as a PDF if desired.
- Check the history of your requests and send reports via email.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.