# _Wish You Were Here_ - Twilio Backend

This project is a backend application that integrates Twilio with OpenAI's Realtime API to create an AI voice agent that shared the persona you created of the loved one. In our case, it will be my passed Grandma. 
The agent will have the core memory they share with you and could talk with you with a similar personality in real-time. 




### _Live Demo_ ###
Call 9525928166 to chat with my grandma. If it's not working, let me know, it might be that I'm not running the server locally. 

I'd also recommand to set up the server yourself if the live demo doesn't work. 

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node package manager, comes with Node.js)
- A Twilio account (for handling calls)
- An OpenAI account (for accessing the Realtime API)

## Getting Started

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```
git clone https://github.com/yourusername/twilio_persona_backend.git
cd twilio_persona_backend
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add your OpenAI API key and Twilio credentials. The file should look like this:

```
OPENAI_API_KEY=your_openai_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
PORT=5050
```

### 4.Set up server and ngrok locally
You can start the application by running:

```
node index.js
```

The server will start and listen on the specified port (default is 5050).

Then to get a website that could be used by Twilio, I'm using ngrok: 

```
ngrok 5050
```

This will give you a temporary url like `https://the-link.ngrok-free.app`


### 5. Test the Application

You can test the application by making a call to your Twilio phone number. 

Setup Twilio account and get a free phone number. 

In the Voice COnfiguration section, add the url above in the webhook section for `A call comes in` with the route to `incoming-call`

e.g. ```https://the-link.ngrok-free.app/incoming-call```
<img width="1194" alt="Screenshot 2025-03-01 at 10 18 16 AM" src="https://github.com/user-attachments/assets/80d0602a-3ad1-4ac9-b3ef-67b3910b0c84" />


Congrats! You are ready to go. Call the number and you should be able to chat. 


### 6. Access the API

You can access the root route to check if the server is running by navigating to:

http://localhost:5050/

You should see a message indicating that the Twilio Media Stream Server is running.

## Additional Information

- The AI voice assistant is configured to use the `coral` voice for text-to-speech.
- You can modify the `grandmaPrompt` in `promptBuilder.js` to change the assistant's behavior and responses.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Twilio](https://www.twilio.com/) for their communication APIs.
- [OpenAI](https://openai.com/) for their AI models and APIs.
