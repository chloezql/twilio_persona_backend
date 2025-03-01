import { OpenAI } from 'openai';
import { buildGrandmotherPrompt } from './utils/promptBuilder.js';

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default {
  async fetch(request, env, ctx) {
    console.log('Received request:', request.method);
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const formData = await request.formData();
    console.log('Speech input:', formData.get('SpeechResult'));
    const userSpeech = formData.get('SpeechResult');
    
    if (!userSpeech) {
      return generateTwiMLResponse('I couldn\'t hear you clearly, dear. Could you please repeat that?');
    }

    try {
      const openai = new OpenAI({
        apiKey: env.OPENAI_API_KEY
      });

      // Get text response from ChatGPT
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { 
            role: "system", 
            content: buildGrandmotherPrompt() 
          },
          { 
            role: "user", 
            content: userSpeech 
          }
        ],
        max_tokens: 150
      });

      const textResponse = completion.choices[0].message.content;
      console.log('OpenAI text response:', textResponse);

      // // Generate speech using OpenAI's TTS
      // const mp3Response = await openai.audio.speech.create({
      //   model: "tts-1",
      //   voice: "alloy",
      //   input: textResponse,
      // });

      // // Convert the audio to base64
      // const audioBuffer = await mp3Response.arrayBuffer();
      // const base64Audio = arrayBufferToBase64(audioBuffer);

      // Return TwiML with audio playback
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
   <Say voice="alice" language="en-US">${escapeXml(textResponse)}</Say>
  <Gather input="speech" language="en-US" speechTimeout="auto"/>
</Response>`;

      return new Response(twiml, {
        headers: { 'Content-Type': 'text/xml' }
      });
      
    } catch (error) {
      console.error('Error details:', error);
      return generateTwiMLResponse('I\'m having trouble hearing you, dear. Let\'s try again in a moment.');
    }
  }
};

function generateTwiMLResponse(message) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-US">${escapeXml(message)}</Say>
  <Gather input="speech" language="en-US" speechTimeout="auto"/>
</Response>`;

  return new Response(twiml, {
    headers: { 'Content-Type': 'text/xml' }
  });
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
} 