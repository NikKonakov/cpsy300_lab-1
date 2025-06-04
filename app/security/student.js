import { updateDoc } from 'firebase/firestore';
import React from 'react'
import Popup from 'reactjs-popup'
import "tailwindcss"
import { updateDocument, deleteDocument } from '../_utils/data';


export default function Student({firstName, lastName, age, fieldOfStudies, id, pUpdateCount}) {
  const [editFirstName, setEditFirstName] = React.useState(firstName);
  const [editLastName, setEditLastName] = React.useState(lastName);
  const [editFieldOfStudies, setEditFieldOfStudies] = React.useState(fieldOfStudies);
  const [editAge, setEditAge] = React.useState(age);

  return (
    <div>
      <div className="">
        <p className="font-medium">{firstName + " " + lastName}</p>
        <p>Age: {age}</p>
        <p>Field of Studies: {fieldOfStudies}</p>
        <p>ID: {id}</p>
      </div>
      <div className="flex justify-evenly">
        <Popup
          trigger={
            <button className="bg-blue-500 text-white px-4 py-2 border rounded-2xl shadow-md hover:bg-blue-900 hover:shadow-lg active:outline-none active:ring-2 active:ring-blue-300">
              Edit
            </button>
          }
          modal
          nested
          position="right center"
        >
          {(close) => (
            <div className="bg-gray-200 border rounded-xl">
              <button
                className="absolute top-2 right-2 text-3xl text-gray-500 hover:text-gray-800"
                onClick={close}
              >
                &times;
              </button>
              <div className="p-4 text-xl flex justify-center">
                Edit Student
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
                    updateDocument(id, {
                      firstName: editFirstName,
                      lastName: editLastName,
                      age: editAge,
                      fieldOfStudies: editFieldOfStudies,
                    });
                    alert("The Student Has Been Updated");
                    pUpdateCount();
                    close();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </Popup>
        <Popup
          trigger={
            <button className="bg-red-500 text-white px-4 py-2 border rounded-2xl shadow-md hover:bg-red-900  hover:shadow-lg active:outline-none active:ring-2 active:ring-red-300">
              Delete
            </button>
          }
          modal
          nested
          position="right center"
        >
          {(close) => (
            <div className="bg-gray-200 border rounded-xl flex flex-col justify-center items-center">
              <button
                className="absolute top-1 right-3 text-3xl text-gray-500 hover:text-gray-800"
                onClick={close}
              >
                &times;
              </button>
              <div className="m-7 text-xl flex justify-center">
                Are you sure you want to delete this student?
              </div>
              <div className="flex justify-evenly mb-2 w-100">
                <button
                  className="bg-green-400 text-black hover:text-white font-mono px-4 py-2 border border-green-600 rounded-2xl shadow-sm hover:bg-green-900 hover:shadow-lg active:outline-none active:ring-2 active:ring-green-300"
                  onClick={() => {
                    deleteDocument(id, "students");
                    alert("The Student Has Been Deleted");
                    pUpdateCount();
                    close();
                  }}
                >
                  Yes, I am sure
                </button>
                <button
                  className="bg-red-400 text-black hover:text-white font-mono px-4 py-2 border border-red-600 rounded-2xl shadow-sm hover:bg-red-900 hover:shadow-lg active:outline-none active:ring-2 active:ring-red-300"
                  onClick={close}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
}

