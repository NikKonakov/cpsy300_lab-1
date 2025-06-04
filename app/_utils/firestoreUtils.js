import { db } from './firebaseConfig';
import { collection, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';


// Function to get all students
export async function getAllStudents() {
    return await getDocs(query(collection(db, "students")));
}

// Funtion to get students by query
export async function getStudentsByQuery(queryInput){
    return await getDocs(query(collection(db, "students"), queryInput));
}

// Function to add a new student 
export async function addStudent(studentData) {
    return await addDoc(collection(db, "students"), studentData);
}

