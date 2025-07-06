//REST API dynamic route for manipulating a specific student document in Firestore database
//path: WEBSITE/api/students


/**
 * This REST API call function is used to fetch a specific student document from the database.
 * It retrieves a document from the "students" collection based on the provided ID in the URL
 * and returns it as a JSON response.
 * @param {*} req 
 * @param {*} param1 
 * @returns 
 */
export async function GET(req, { params }) {
  const id = (await params).id;
  let students = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      age: 20,
      fieldOfStudies: "Computer Science",
    },
  ];
  return new Response(
    JSON.stringify(students.find((student) => student.id === parseInt(id))),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
