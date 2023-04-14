import db from '../lib/firebaseConfig.js';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';

export interface QuestionDataType {
  question: string;
  answer: string;
  city: string;
  followUpQuestions: string[];
  landmark: string;
  parentQuestion: string;
}

export async function getQuestion(
  question: string
): Promise<QuestionDataType | false> {
  const collectionRef = collection(db, 'questions');
  const q = query(collectionRef, where('question', '==', question));
  try {
    const querySnapshot = (await getDocs(q)) as QuerySnapshot<QuestionDataType>;

    if (querySnapshot.empty) {
      console.log('No firestore document found with the specified question');
      return false;
    } else {
      console.log('Firestore documents found for the specified question');
      let results: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      return results[0] as QuestionDataType;
    }
  } catch (e) {
    console.error('Error adding document:', e);
    return false;
  }
}

export async function addQuestion(data: QuestionDataType): Promise<void> {
  try {
    await addDoc(collection(db, 'questions'), data);
  } catch (e) {
    console.error('Error adding document:', e);
  }
}

// Collection: landmarks
// name: string
// city: string
// initialQuestion: string

// Collection: questions
// city: string
// landmark: string
// root: boolean
// question: string
// answer: string
// follow-up-questions: array of strings

// 1. When a city is selected, load all the landmarks and their initial questions(questions with a property of root) for that city
// 2. When a landmark is selected, display the root question and fetch the follow-up questions for that landmark
//   a. Check if the questions exist in firestore. If they do, fetch them from firestore.
//   b. If they do not, fetch them from OpenAI and save them to firestore
