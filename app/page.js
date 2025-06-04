import React from 'react';
import StudentList from './security/studentList';

export default function Home() {
  return (
    <>
      <div className='flex pt-20 flex-col justify-center items-center w-screen bg-gray-100'>
        <h1 className='text-3xl'>Simple Student Management App</h1>
        <StudentList />
      </div>
    </>
  );
}
