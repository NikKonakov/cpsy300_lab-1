import { addNewDocument, fetchCollectionData } from "@/app/_utils/data";
import { deleteDocument } from "@/app/_utils/data";

//REST API route for manipulating student collection in Firestore database
//path: WEBSITE/api/students

/**
 * This REST API call function is used to fetch all student documents from the database.
 * It retrieves all documents from the "students" collection and returns them as a JSON response.
 * @param {*} req 
 * @returns 
 */
export async function GET(req) {
  return new Response(JSON.stringify(await fetchCollectionData("students")), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


/**
 * This REST API call function is used to update a student document in the database.
 * It receives a request with the student's data, updates the document in the "students" collection
 * and returns a response indicating that the student has been updated.
 * @param {*} req
 * @returns
 */
export async function PUT(req) {
  const body = await req.json();
  const { id, firstName, lastName, age, fieldOfStudies } = body;
  return new Response(JSON.stringify({ message: "Student has been added" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


/**
 * This REST API call function is used to add a new student document to the database.
 * It receives a request with the student's data, adds the document to the "students" collection
 * and returns a response indicating that the student has been added.
 * @param {*} req
 * @returns
 */
export async function POST(req) {
  const body = await req.json();
  const { firstName, lastName, age, fieldOfStudies } = body;
  addNewDocument(
    {
      firstName: firstName,
      lastName: lastName,
      age: age,
      fieldOfStudies: fieldOfStudies,
    },
    "students"
  );
  return new Response(JSON.stringify({ message: "Student has been added" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


/**
 * This REST API call function is used to delete a student document from the database.
 * It receives a request with the student's ID, deletes the document from the "students" collection
 * and returns a response indicating that the student has been deleted.
 * @param {*} req
 * @returns
 */
export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  deleteDocument(id, "students");
  return new Response(
    JSON.stringify({ message: `Student with id ${id} deleted` }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
