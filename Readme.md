
# Voice Over AI Agent

This project is a web application that converts text to speech using the ElevenLabs API and places a phone call to play the generated audio using the Exotel telephony API.

## Features

- **Text-to-Speech**: Converts user-provided text into natural-sounding speech.
- **Voice Selection**: Allows users to choose from a list of available voices from ElevenLabs.
- **Telephony Integration**: Places a real phone call to a specified number to deliver the audio message.
- **Call Simulation**: Includes a simulation mode for development without making actual calls.
- **Simple UI**: A clean and easy-to-use interface built with React.

## Tech Stack

- **Frontend**: React (with Vite), Axios
- **Backend**: Node.js, Express
- **APIs Used**:
  - **Voice Generation**: ElevenLabs TTS API
  - **Telephony**: Exotel Connect Call API

## Prerequisites

- Node.js (v18+)
- An ElevenLabs Account (for API Key)
- An Exotel Account (for API credentials and a virtual number)
- Ngrok (to expose the local server to the internet)

## How to Run the Project

1.  **Clone the Repository**
    ```bash
    git clone <your-repo-url>
    cd voice-ai-agent
    ```

2.  **Install Dependencies**
    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

3.  **Configure Environment Variables**

    - **Backend**: In the `server` directory, create a `.env` file and add your credentials:
      ```env
      PORT=3001
      ELEVENLABS_API_KEY="YOUR_ELEVENLABS_API_KEY"
      EXOTEL_API_KEY="YOUR_EXOTEL_API_KEY"
      EXOTEL_API_TOKEN="YOUR_EXOTEL_API_TOKEN"
      EXOTEL_ACCOUNT_SID="YOUR_EXOTEL_ACCOUNT_SID"
      EXOTEL_VIRTUAL_NUMBER="YOUR_EXOTEL_VIRTUAL_NUMBER"
      BASE_URL="YOUR_NGROK_PUBLIC_URL"
      SIMULATE_CALL="false" 
      ```
    - **Frontend**: In the `client` directory, create a `.env.local` file:
      ```env
      VITE_API_BASE_URL=http://localhost:3001
      ```

4.  **Start the Backend Server**
    ```bash
    # From the server/ directory
    node index.js
    ```

5.  **Expose the Server with Ngrok**
    
    In a new terminal, run:
    ```bash
    ngrok http 3001
    ```
    Copy the public `https` URL provided by ngrok and paste it as the `BASE_URL` value in `server/.env`. **Restart the backend server** after updating the URL.

6.  **Start the Frontend App**
    ```bash
    # From the client/ directory
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Demo Video

[Watch the Demo Video](https://drive.google.com/file/d/1kg0cjRSE179dZAuy6tTQcMmGx2Vd1VlC/view?usp=sharing)

## Limitations and Assumptions

-   **Public URL Required**: The Exotel integration requires the backend server to be publicly accessible. This is why `ngrok` is necessary for local development. In a production environment, the backend would be deployed on a server with a public IP or domain name.
-   **Audio Storage**: Generated audio files are stored temporarily on the server's file system. In a production environment, a more robust solution like an S3 bucket should be used for storing and serving these files.
-   **Error Handling**: The error handling is basic and provides messages to the UI. It could be expanded with more specific error states and user feedback.
-   **Security**: The current setup does not have advanced security measures. Phone number inputs are not strictly validated beyond basic checks. API keys are stored in `.env` files, which is standard practice but should be managed securely in production (e.g., using a secret manager).
-


# Voice Over AI Agent

[cite_start]This project is a web application that converts text to speech using the ElevenLabs API and places a phone call to play the generated audio using the Exotel telephony API[cite: 2].

## Features

- [cite_start]**Text-to-Speech**: Converts user-provided text into natural-sounding speech[cite: 9].
- [cite_start]**Voice Selection**: Allows users to choose from a list of available voices from ElevenLabs[cite: 7].
- [cite_start]**Telephony Integration**: Places a real phone call to a specified number to deliver the audio message.
- [cite_start]**Call Simulation**: Includes a simulation mode for development without making actual calls[cite: 31].
- [cite_start]**Simple UI**: A clean and easy-to-use interface built with React[cite: 5, 43].

## Tech Stack

- [cite_start]**Frontend**: React (with Vite), Axios [cite: 34]
- [cite_start]**Backend**: Node.js, Express [cite: 35]
- [cite_start]**APIs Used**[cite: 13]:
  - [cite_start]**Voice Generation**: ElevenLabs TTS API [cite: 35]
  - [cite_start]**Telephony**: Exotel Connect Call API [cite: 36]

## Prerequisites

- Node.js (v18+)
- An ElevenLabs Account (for API Key)
- An Exotel Account (for API credentials and a virtual number)
- Ngrok (to expose the local server to the internet)

## [cite_start]How to Run the Project [cite: 12]

1.  **Clone the Repository**
    ```bash
    git clone <your-repo-url>
    cd voice-ai-agent
    ```

2.  **Install Dependencies**
    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

3.  **Configure Environment Variables**

    - **Backend**: In the `server` directory, create a `.env` file and add your credentials:
      ```env
      PORT=3001
      ELEVENLABS_API_KEY="YOUR_ELEVENLABS_API_KEY"
      EXOTEL_API_KEY="YOUR_EXOTEL_API_KEY"
      EXOTEL_API_TOKEN="YOUR_EXOTEL_API_TOKEN"
      EXOTEL_ACCOUNT_SID="YOUR_EXOTEL_ACCOUNT_SID"
      EXOTEL_VIRTUAL_NUMBER="YOUR_EXOTEL_VIRTUAL_NUMBER"
      BASE_URL="YOUR_NGROK_PUBLIC_URL"
      SIMULATE_CALL="false" 
      ```
    - **Frontend**: In the `client` directory, create a `.env.local` file:
      ```env
      VITE_API_BASE_URL=http://localhost:3001
      ```

4.  **Start the Backend Server**
    ```bash
    # From the server/ directory
    node index.js
    ```

5.  **Expose the Server with Ngrok**
    
    In a new terminal, run:
    ```bash
    ngrok http 3001
    ```
    Copy the public `https` URL provided by ngrok and paste it as the `BASE_URL` value in `server/.env`. **Restart the backend server** after updating the URL.

6.  **Start the Frontend App**
    ```bash
    # From the client/ directory
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## [cite_start]Limitations and Assumptions [cite: 14]

-   **Public URL Required**: The Exotel integration requires the backend server to be publicly accessible. This is why `ngrok` is necessary for local development. In a production environment, the backend would be deployed on a server with a public IP or domain name.
-   **Audio Storage**: Generated audio files are stored temporarily on the server's file system. In a production environment, a more robust solution like an S3 bucket should be used for storing and serving these files.
-   **Error Handling**: The error handling is basic and provides messages to the UI. It could be expanded with more specific error states and user feedback.
-   **Security**: The current setup does not have advanced security measures. Phone number inputs are not strictly validated beyond basic checks. API keys are stored in `.env` files, which is standard practice but should be managed securely in production (e.g., using a secret manager).
