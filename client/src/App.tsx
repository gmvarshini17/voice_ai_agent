import React, { useState, useEffect, JSX } from 'react';
import axios from 'axios';
import './App.css';

// Define the structure for a single voice object from the API
interface Voice {
  voice_id: string;
  name: string;
}

// Define the structure of the API response that contains the list of voices
interface VoicesResponse {
  voices: Voice[];
}



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App(): JSX.Element {
  // State variables with explicit types
  const [text, setText] = useState<string>('Hello! This is a test call from the AI voice agent.');
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Fetch available voices on component mount
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        setStatusMessage('Fetching voices...');
        // Type the expected response from the axios GET request
        const response = await axios.get<VoicesResponse>(`${API_BASE_URL}/api/voices`);
        setVoices(response.data.voices);
        if (response.data.voices.length > 0) {
          setSelectedVoice(response.data.voices[0].voice_id);
        }
        setStatusMessage('');
      } catch (error) {
        console.error('Error fetching voices:', error);
        setStatusMessage('Error: Could not fetch voices.');
      }
    };
    fetchVoices();
  }, []);

  // Event handler for form submission with typed event object
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phoneNumber) {
      setStatusMessage('Please enter a phone number.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Generating voice and initiating call...');

    try {
      const response = await axios.post<{ message: string }>(`${API_BASE_URL}/api/call`, {
        text,
        voiceId: selectedVoice,
        phoneNumber,
      });
      setStatusMessage(response.data.message);
    } catch (error: unknown) {
      console.error('Error placing call:', error);
      if (axios.isAxiosError(error)) {
        setStatusMessage(error.response?.data?.message || 'Failed to place call.');
      } else {
        setStatusMessage('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Voice Over AI Agent</h1>
      <p>Enter text, choose a voice, and we'll place a call to play the message.</p>
      
      <form onSubmit={handleSubmit} className="call-form">
        {/* Text Input Field */}
        <div className="form-group">
          <label htmlFor="text-input">Text to Speak</label>
          <textarea
            id="text-input"
            value={text}
            // Add type for the change event
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            rows={4}
            required
          />
        </div>

        {/* Voice Selection Dropdown */}
        <div className="form-group">
          <label htmlFor="voice-select">Choose a Voice</label>
          <select
            id="voice-select"
            value={selectedVoice}
            // Add type for the change event
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedVoice(e.target.value)}
            disabled={voices.length === 0}
            required
          >
            {voices.map((voice) => (
              <option key={voice.voice_id} value={voice.voice_id}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="phone-input">Phone Number (with country code)</label>
          <input
            type="tel"
            id="phone-input"
            value={phoneNumber}
            // Add type for the change event
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
            placeholder="+9199xxxxxxxx"
            required
          />
        </div>

        {/* Call Now Button */}
        <button type="submit" className="call-button" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Generate & Call'}
        </button>
      </form>

      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
}

export default App;