import { addNewDocument, fetchCollectionData, fetchCollectionDataWithQuery, getDocumentById, updateDocument, updateStudentDocument } from "@/app/_utils/data";
import { deleteDocument } from "@/app/_utils/data";

//REST API route for manipulating student collection in Firestore database
//path: WEBSITE/api/students


export async function GET(pReq) {
  let queryParams;
  try {
    queryParams = pReq.nextUrl.searchParams.get("query");
  } catch (error) {}
  if (!queryParams){
		// Fetch all student documents from the "students" collection
		return new Response(JSON.stringify(await fetchCollectionData('students')), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} else{
    // Use query parameters to fetch a specific student documents
    return new Response(JSON.stringify(await fetchCollectionDataWithQuery('students',queryParams.split('_'))), {
      status: 200,
      headers: { "Content-Type": "application/json"}
    });
  }
}

/**
 * TODO: UPDATE DOCUMENTATION
 * This REST API call function is used to update a student document in the database.
 * It receives a request with the student's data, updates the document in the "students" collection
 * and returns a response indicating that the student has been updated.
 * @param {*} req
 * @returns Response indicating the update status
 */
export async function PUT(req) {
  let idParam;
  try {
    idParam = req.nextUrl.searchParams.get("id");
    console.log("ID PARAM: ", idParam);
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid request: No ID found" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const newBody = await req.json();
  let newObjectKeys = Object.keys(newBody);
  let newObjectValues = Object.values(newBody);
  // const message = newObjectKeys.map((key, idx) => `${idx + 1} == ${key} - ${newObjectValues[idx]};`).join(' ');
  // return new Response(JSON.stringify({ message }), {
  //   status: 200,
  //   headers: { "Content-Type": "application/json" },
  // });

  let documentExists;
  try {
    documentExists = await getDocumentById("students", idParam);
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  let ObjectKeys = Object.keys(documentExists);
  let ObjectValues = Object.values(documentExists);
  ObjectKeys.forEach(e => {
    if(!newObjectKeys.includes(e)) {
      newObjectKeys.push(e);
      newObjectValues.push(ObjectValues[ObjectKeys.indexOf(e)]);
    }
  });
  let obj = {};
  newObjectKeys.forEach((key, idx) => {
    obj[key] = newObjectValues[idx];
  });
  await updateStudentDocument(idParam, obj);
  return new Response(JSON.stringify({ "message": "The student has been updated"}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}



/**
 * This REST API call function is used to add a new student document to the database.
 * It receives a request with the student's data, adds the document to the "students" collection
 * and returns a response indicating that the student has been added.
 * @param {*} req
 * @returns Response indicating the addition status
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
 * @returns Response indicating the deletion status
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
