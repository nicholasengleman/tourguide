import { Pressable, SafeAreaView, ScrollView } from 'react-native';
import AppProvider from '../context/App.Provider';
import { QuestionDataType } from '../services/FirestoreService';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import OpenAIService from '../services/OpenAIService';
import { getQuestion, addQuestion } from '../services/FirestoreService';
import CustomHeader from '../components/AttractionHeader';
import AudioPlayback from '../components/AudioPlayback';
import { Ionicons } from '@expo/vector-icons';

const AttractionScreen = ({ route, navigation }) => {
  const [data, setData] = useState<QuestionDataType>({
    answer: '',
    city: '',
    followUpQuestions: [],
    landmark: '',
    parentQuestion: '',
    question: '',
  });
  const { name, city } = route.params;

  const fetchAnswer = async ({
    question,
    followUpQuestion,
  }: {
    question: string;
    followUpQuestion: string;
  }) => {
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

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader
          title={data.question}
          parentQuestion={data.parentQuestion}
          fetchAnswer={fetchAnswer}
        />
      ),
    });
  }, [data]);

  return (
    <SafeAreaView style={styles.main}>
      <AppProvider>
        <View style={styles.main}>
          {!data.answer && (
            <View style={styles.spinner}>
              <Spinner size='giant' />
            </View>
          )}
          {data?.answer && (
            <>
              <ScrollView>
                <Text style={styles.description}>{data.answer}</Text>
                {data.parentQuestion && (
                  <Pressable
                    onPress={() =>
                      fetchAnswer({
                        question: '',
                        followUpQuestion: data.parentQuestion,
                      })
                    }
                  >
                    <Ionicons
                      name='arrow-back-circle-outline'
                      size={35}
                      color='#d6d2d2'
                      style={{ marginLeft: 10, marginTop: 20 }}
                    />
                  </Pressable>
                )}
              </ScrollView>

              <AudioPlayback answer={data?.answer} />
              <View style={styles.questionContainer}>
                {data.followUpQuestions?.map((followUpQuestion) => (
                  <Pressable
                    style={styles.questionBtn}
                    onPress={() =>
                      fetchAnswer({ question: data.question, followUpQuestion })
                    }
                    key={followUpQuestion}
                  >
                    <Text style={styles.question}>{followUpQuestion}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </View>
      </AppProvider>
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
    fontSize: 18,
    color: '#807575',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'left',
    paddingHorizontal: 10,
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
