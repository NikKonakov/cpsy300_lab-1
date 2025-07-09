//REST API dynamic route for manipulating a specific student document in Firestore database
//path: WEBSITE/api/students


/**
 * This REST API call function is used to fetch a specific student document from the database.
 * It retrieves a document from the "students" collection based on the provided ID in the URL
 * and returns it as a JSON response.
 * @param {*} req 
 * @param {*} param1 
 * @returns Response containing the student data
 */
export async function GET(req, { params }) {
  const id = (await params).id;
  const students = await fetchCollectionData("students");
  return new Response(
    JSON.stringify(students.find((student) => student.id === parseInt(id))),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}


/**
 * This REST API call function is used to delete a specific student document in the database.
 * It receives a request with the student's ID, deletes the document from the "students" collection
 * and returns a response indicating that the student has been deleted.
 * @param {*} req 
 * @param {*} param1 
 * @returns Response indicating the deletion status
 */
export async function DELETE(req, { params }) {
  const id = (await params).id;
  await deleteDocument(id, "students");
  return new Response(JSON.stringify({ message: "Student has been deleted" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
