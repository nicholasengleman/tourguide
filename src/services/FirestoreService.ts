import db from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

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
  const collectionRef = collection(db, "questions");
  const q = query(collectionRef, where("question", "==", question));
  try {
    const querySnapshot = (await getDocs(q)) as QuerySnapshot<QuestionDataType>;

    if (querySnapshot.empty) {
      console.log("No firestore document found with the specified question");
      return false;
    } else {
      console.log("Firestore documents found for the specified question");
      let results: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      return results[0] as QuestionDataType;
    }
  } catch (e) {
    console.error("Error adding document:", e);
    return false;
  }
}

export async function addQuestion(data: QuestionDataType): Promise<void> {
  try {
    await addDoc(collection(db, "questions"), data);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}
