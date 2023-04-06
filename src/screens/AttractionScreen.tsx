<script src='http://192.168.1.16:8097'></script>;

import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import { Spinner } from '@ui-kitten/components';
import OpenAIService from '../services/OpenAIService';

const AttractionScreen: React.FC<AttractionScreenProps> = ({ route }) => {
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<[]>([]);
  const name = route.params.name;

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const attraction = await OpenAIService.getDescription(name);
        const data = JSON.parse(attraction?.content);
        if (data?.description) {
          setDescription(data?.description);
        }

        if (data?.questions) {
          setQuestions(data?.questions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttraction();
  }, [name]);

  const getNewDescription = async (question: string) => {
    setDescription('');

    try {
      const attraction = await OpenAIService.askNewQuestions(question);
      const data = JSON.parse(attraction?.content);
      if (data?.description) {
        setDescription(data?.description);
      }

      if (data?.questions) {
        setQuestions(data?.questions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.main}>
        {!description && (
          <View style={styles.spinner}>
            <Spinner size='giant' />
          </View>
        )}
        {description && (
          <>
            <ScrollView>
              <Text style={styles.description}>{description}</Text>
            </ScrollView>
            <View style={styles.questionContainer}>
              {questions?.map((question) => (
                <Pressable
                  style={styles.questionBtn}
                  onPress={() => getNewDescription(question)}
                  key={question}
                >
                  <Text style={styles.question}>{question}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 20,
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'left',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  questionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#261a1a',
    marginTop: 5,
    paddingTop: 10,
  },
  questionBtn: {
    backgroundColor: '#594c4c',
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  question: {
    fontSize: 14,
    color: '#fff',
  },
  cityName: {
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AttractionScreen;
