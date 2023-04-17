import Constants from 'expo-constants';

const region = 'eastus';

const fetchAuthToken = async () => {
  const apiKey = Constants.manifest.extra.AWS_SPEECH_KEY;
  const tokenEndpoint = `https://${region}.api.cognitive.microsoft.com/sts/v1.0/issuetoken`;

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
    },
  });

  const authToken = await response.text();
  return authToken;
};

export const ConvertTextToSpeech = async (text: string) => {
  const apiUrl = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

  const ssml = `
  <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">
    <voice name="en-US-AriaNeural">
        <mstts:express-as style="whispering" styledegree="1">
           ${text}
        </mstts:express-as>
    </voice>
  </speak>
  `;

  const authToken = await fetchAuthToken();

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-192kbitrate-mono-mp3',
      Authorization: `Bearer ${authToken}`,
    },
    body: ssml,
  });

  const audioBlob = await response.blob();
  return audioBlob;
};
