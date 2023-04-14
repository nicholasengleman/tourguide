<script src='http://192.168.1.16:8097'></script>;

import { QuestionDataType } from '../services/FirestoreService';

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
import { getQuestion, addQuestion } from '../services/FirestoreService';

const AttractionScreen = ({ route }) => {
  const [data, setData] = useState<QuestionDataType>({
    answer: '',
    city: '',
    followUpQuestions: [],
    landmark: '',
    parentQuestion: '',
    question: '',
  });
  const { name, city } = route.params;

  const fetchAnswer = async ({ question, followUpQuestion }: { question:string, followUpQuestion: string }) => {
    setData({
      answer: '',
      city: '',
      followUpQuestions: [],
      landmark: '',
      parentQuestion: '',
      question: '',
    });

    try {
      const data = await getQuestion(followUpQuestion);
      if (data) {
        setData(data);
      } else {

        const attraction = await OpenAIService.askQuestion({
          name,
          city,
          followUpQuestion,
        });
        console.log('Data received from Open AI Service:');

        const data = JSON.parse(attraction?.message.content);
        if (data) {
          setData({
            ...data,
            question: followUpQuestion,
            parentQuestion: question,
          });
          addQuestion({
            ...data,
            question: followUpQuestion,
            parentQuestion: question,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnswer({ question: '', followUpQuestion: `about the ${name}` });
  }, [name]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.main}>
        {!data.answer && (
          <View style={styles.spinner}>
            <Spinner size='giant' />
          </View>
        )}
        {data?.answer && (
          <>
            <ScrollView>
              <Text style={styles.title}>{data.question}</Text>
              <Text style={styles.description}>{data.answer}</Text>
            </ScrollView>
            {data.parentQuestion && (
              <Pressable
                onPress={() => fetchAnswer({ question: '', followUpQuestion: data.parentQuestion })}
                style={styles.goBackBtn}
              >
                <Text style={styles.goBackBtnTxt}>Go back</Text>
              </Pressable>
            )}

            <View style={styles.questionContainer}>
              {data.followUpQuestions?.map((followUpQuestion) => (
                <Pressable
                  style={styles.questionBtn}
                  onPress={() => fetchAnswer({ question: data.question, followUpQuestion })}
                  key={followUpQuestion}
                >
                  <Text style={styles.question}>{followUpQuestion}</Text>
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
  title: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 20,
    color: '#807575',
    fontStyle: 'italic',
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  goBackBtn: {
    backgroundColor: '#c4b9b9',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 5,
    color: '#3f3737',
    alignSelf: 'flex-start',
  },
  goBackBtnTxt: {
    color: '#4f4747',
    fontSize: 12,
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
