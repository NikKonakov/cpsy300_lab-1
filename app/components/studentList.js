"use client";
import { useState, useEffect } from "react";
import Student from "./student";
import {
  getOneItemTest,
  fetchCollectionData,
  addNewDocument,
  addNewDocuments,
} from "../_utils/data";
import Popup from "reactjs-popup";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editFieldOfStudies, setEditFieldOfStudies] = useState("");
  const [editAge, setEditAge] = useState("");
  function updateCoundHandler() {
    setUpdateCount(updateCount + 1);
  }

  useEffect(() => {
    async function fetchData() {
      let data = await fetchCollectionData("students", true);
      setStudents(data.sort((a, b) => a.firstName.localeCompare(b.firstName)));

      // let mockData = await fetch(
      //   "https://6838b08c6561b8d882adf4d6.mockapi.io/students"
      // );
      // const mockDataJson = await mockData.json();
      // mockDataJson.forEach((stud) => {
      //   delete stud.id;
      //   addNewDocument(stud, "students", true);
      // });
    }
    fetchData();
  }, [updateCount]);

  return (
    <div className="relative">
      <h1 className="flex justify-center text-xl pt-2">List Of Students</h1>
      <Popup
        trigger={
          <button
            className="bg-blue-500 text-white px-4 py-2 border rounded-2xl shadow-md absolute right-0 top-0 hover:bg-blue-900 hover:shadow-lg active:outline-none active:ring-2 active:ring-blue-300"
            nested="true"
            modal="true"
          >
            Add New Student
          </button>
        }
      >
        {(close) => (
          <div className="bg-gray-200 border rounded-xl mr-96 relative w-2/4">
            <button
              className="absolute top-2 right-2 text-3xl text-gray-500 hover:text-gray-800"
              onClick={close}
            >
              &times;
            </button>
            <div className="p-4 text-xl flex justify-center">
              Add New Student
            </div>
            <form className="p-2">
              <div className="p-1.5 border rounded-md mb-1 flex justify-end">
                <label className="pr-1">First Name:</label>
                <input
                  className="rounded"
                  value={editFirstName}
                  onChange={(e) => {
                    setEditFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="p-1.5 border rounded-md mb-1 flex justify-end">
                <label className="pr-1">Last Name:</label>
                <input
                  className="rounded"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                ></input>
              </div>
              <div className="p-1.5 border rounded-md mb-1 flex justify-end">
                <label className="pr-1">Field Of Studies:</label>
                <input
                  className="rounded"
                  value={editFieldOfStudies}
                  onChange={(e) => setEditFieldOfStudies(e.target.value)}
                ></input>
              </div>
              <div className="p-1.5 border rounded-md mb-1 flex justify-end">
                <label className="pr-1">Age:</label>
                <input
                  className="rounded"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                ></input>
              </div>
            </form>
            <div className="flex justify-center mb-2">
              <button
                className="bg-green-500 text-black hover:text-white font-mono px-4 py-2 border border-green-600 rounded-2xl shadow-sm hover:bg-green-900 hover:shadow-lg active:outline-none active:ring-2 active:ring-green-300"
                onClick={() => {
                  addNewDocument(
                    {
                      firstName: editFirstName,
                      lastName: editLastName,
                      fieldOfStudies: editFieldOfStudies,
                      age: editAge,
                    },
                    "students"
                  );
                  alert("The Student Has Been Added");
                  updateCoundHandler();
                  close();
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Popup>
      <ul className="flex flex-wrap justify-between">
        {students.map((student) => (
          <li
            key={student.id}
            className="flex flex-col border p-2 m-2 rounded-2xl bg-amber-50 shadow-md basis-1/5"
          >
            <Student
              key={student.id}
              firstName={student.firstName}
              lastName={student.lastName}
              age={student.age}
              fieldOfStudies={student.fieldOfStudies}
              id={student.id}
              pUpdateCount={updateCoundHandler}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
