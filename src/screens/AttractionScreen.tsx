<script src='http://192.168.1.16:8097'></script>;

import { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import OpenAIService from '../services/OpenAIService';

const AttractionScreen: React.FC<AttractionScreenProps> = ({ route }) => {
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<[]>([]);
  const name = route.params.name;

  useEffect(() => {
    const fetchAttraction = async () => {
      const attraction = await OpenAIService.getDescription(name);
      console.log(attraction.content);
      setDescription(attraction?.content?.description);
      setQuestions(attraction?.content?.questions);
    };
    fetchAttraction();
  }, [name]);

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
                <Text style={styles.description}>{question}</Text>
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
    textAlign: 'left',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  questionContainer: {},
  questions: {
    fontSize: 14,
  },
  cityName: {
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AttractionScreen;
