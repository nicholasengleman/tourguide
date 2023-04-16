import { useEffect, useState, useRef, useContext } from 'react';
import { Audio } from 'expo-av';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SynthesizeSpeech from '../services/AmazonPolly';
import AppContext from '../context/App.Context';

const AudioPlayback = ({ answer }) => {
  const { useAudio, setUseAudio } = useContext(AppContext);
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const sound = useRef(null);

  const loadAndPlayAudio = async (answer: string) => {
    const soundObj = new Audio.Sound();
    try {
      const signedUrl = await SynthesizeSpeech(answer);
      await soundObj.loadAsync({ uri: signedUrl });
      await soundObj.playAsync();
      sound.current = soundObj;
    } catch (error) {
      console.error('Error loading and playing audio', error);
    }
  };

  const playAudio = async () => {
    if (sound.current) {
      try {
        await sound.current.playAsync();
        setPlayStatus(true);
        setUseAudio(true);
      } catch (error) {
        console.error('Error playing audio', error);
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
    if (answer && useAudio) {
      loadAndPlayAudio(answer);
      setPlayStatus(true);
    }
  }, [answer]);

  useEffect(() => {
    return () => pauseAudio();
  }, []);

  useEffect(() => {
    if (!useAudio) {
      pauseAudio();
    }
  }, [useAudio]);

  return (
    <View style={styles.audioControls}>
      <Pressable style={styles.repeatBtn} onPress={() => repeatAudio()}>
        <Feather name='repeat' size={25} color='black' />
      </Pressable>
      {playStatus && (
        <Pressable style={styles.btn} onPress={() => pauseAudio()}>
          <AntDesign name='pausecircle' size={50} color='black' />
        </Pressable>
      )}
      {!playStatus && (
        <Pressable style={styles.btn} onPress={() => playAudio()}>
          <AntDesign name='play' size={50} color='black' />
        </Pressable>
      )}
      {useAudio && (
        <Pressable style={styles.audioBtn} onPress={() => setUseAudio(false)}>
          <Feather name='volume-2' size={30} color='black' />
        </Pressable>
      )}
      {!useAudio && (
        <Pressable style={styles.audioBtn} onPress={() => setUseAudio(true)}>
          <Feather name='volume-x' size={30} color='black' />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  repeatBtn: {
    position: 'absolute',
    left: 0,
    top: 15,
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
