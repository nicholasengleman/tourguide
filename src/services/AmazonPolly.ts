import Constants from 'expo-constants';
import { PollyClient } from '@aws-sdk/client-polly';
import { getSynthesizeSpeechUrl } from '@aws-sdk/polly-request-presigner';

export default async function SynthesizeSpeech(text: string) {
  const params = {
    OutputFormat: 'mp3',
    Text: text,
    VoiceId: 'Joanna', // Choose a voice
    TextType: 'text', // You can also use 'ssml' for SSML input
  };

  const res = await getSynthesizeSpeechUrl({
    client: new PollyClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: Constants.manifest.extra.AWS_ACCESS_KEY,
        secretAccessKey: Constants.manifest.extra.AWS_SECRET_ACCESS_KEY,
      },
    }),
    params: params,
  });

  return res.toString();
}
