import { useEffect, useState, useContext, useRef } from 'react';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ConvertTextToSpeech } from '../services/ConvertTextToSpeech';
import AppContext from '../context/App.Context';
import colors from './colors';

const AudioPlayback = ({ answer }) => {
  const sound = useRef(null);
  const { useAudio, setUseAudio } = useContext(AppContext);
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: '00',
    seconds: '00',
  });
  const [timeElapsed, setTimeElapsed] = useState({
    minutes: '00',
    seconds: '00',
  });

  const durationProperty =
    Platform.OS === 'ios' ? 'playableDurationMillis' : 'durationMillis';

  const blobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reader.abort();
        reject(new Error('Problem parsing the Blob to base64'));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const loadAudio = async (answer: string) => {
    const soundObj = new Audio.Sound();
    try {
      const audioBlob = await ConvertTextToSpeech(answer);
      const base64DataUrl = await blobToBase64(audioBlob);

      await soundObj.loadAsync({ uri: base64DataUrl }, {}, false);
      sound.current = soundObj;

      soundObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      const status = await soundObj.getStatusAsync();
      setDuration(status[durationProperty]);

      getTimeRemaining(status[durationProperty], status.positionMillis);
      getTimeElapsed(status.positionMillis);

      if (useAudio) {
        playAudio();
      }
    } catch (error) {
      console.error('Error loading and playing audio', error);
    }
  };

  const getTimeRemaining = (duration, position) => {
    if (position > 0) {
      const timeRemaining = (duration - position) / 1000;
      setTimeRemaining({
        minutes: Math.floor(timeRemaining / 60),
        seconds: Math.floor(timeRemaining % 60),
      });
    }
  };

  const getTimeElapsed = (position) => {
    if (position > 0) {
      const timeElapsed = position / 1000;
      setTimeElapsed({
        minutes: Math.floor(timeElapsed / 60),
        seconds: Math.floor(timeElapsed % 60),
      });
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      getTimeRemaining(status[durationProperty], status.positionMillis);
      getTimeElapsed(status.positionMillis);
    }
  };

  const playAudio = async () => {
    if (!useAudio) {
      setUseAudio(true);
    }
    if (sound.current) {
      try {
        await sound.current.playAsync();
        setPlayStatus(true);
      } catch (error) {
        console.error('Error playing audio', error);
      }
    }
  };

  const onSeek = async (value) => {
    if (sound.current) {
      try {
        await sound.current.setPositionAsync(value);
        playAudio();
      } catch (error) {
        console.error('Error seeking audio', error);
      }
    }
  };

  const pauseAudio = async () => {
    if (sound.current) {
      try {
        await sound.current.pauseAsync();
        setPlayStatus(false);
      } catch (error) {
        console.error('Error pausing audio', error);
      }
    }
  };

  const repeatAudio = async () => {
    if (sound.current) {
      try {
        await sound.current.replayAsync();
        setPlayStatus(true);
      } catch (error) {
        console.error('Error repeating audio', error);
      }
    }
  };

  useEffect(() => {
    if (answer) {
      loadAudio(answer);
    }
  }, [answer]);

  useEffect(() => {
    return () => pauseAudio();
  }, []);

  useEffect(() => {
    if (!useAudio) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [useAudio]);

  return (
    <View style={styles.audioPlaybackContainer}>
      <View style={styles.seekRow}>
        <Text style={styles.time}>
          {timeElapsed.minutes.toString().padStart(2, '0')}:
          {timeElapsed.seconds.toString().padStart(2, '0')}
        </Text>
        <Slider
          style={styles.slider}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          onSlidingComplete={onSeek}
          onSlidingStart={() => pauseAudio()}
          thumbTintColor='rgba(0,0,0,0)'
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.secondary}
        />
        <Text style={styles.time}>
          {timeRemaining.minutes.toString().padStart(2, '0')}:
          {timeRemaining.seconds.toString().padStart(2, '0')}
        </Text>
      </View>
      <View style={styles.audioControls}>
        <Pressable style={styles.repeatBtn} onPress={() => repeatAudio()}>
          <Feather name='repeat' size={20} color='#999999' />
        </Pressable>
        {playStatus && (
          <Pressable style={styles.btn} onPress={() => pauseAudio()}>
            <AntDesign name='pausecircle' size={60} color={colors.primary} />
          </Pressable>
        )}
        {!playStatus && (
          <Pressable style={styles.btn} onPress={() => playAudio()}>
            <AntDesign name='play' size={60} color={colors.primary} />
          </Pressable>
        )}
        {useAudio && (
          <Pressable style={styles.audioBtn} onPress={() => setUseAudio(false)}>
            <Feather name='volume-2' size={25} color='#999999' />
          </Pressable>
        )}
        {!useAudio && (
          <Pressable style={styles.audioBtn} onPress={() => setUseAudio(true)}>
            <Feather name='volume-x' size={25} color='#999999' />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioPlaybackContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    opacity: 0.95,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  repeatBtn: {
    position: 'absolute',
    left: 0,
    top: 15,
  },
  slider: {
    width: '65%',
    height: 40,
  },
  time: {
    fontSize: 12,
    color: '#999999',
  },
  seekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  audioBtn: {
    position: 'absolute',
    right: 0,
    top: 15,
  },
  btn: {
    marginBottom: 10,
  },
});

export default AudioPlayback;
