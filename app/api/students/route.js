import { addNewDocument, getServerData } from "@/app/_utils/data";
import { deleteDocument } from "@/app/_utils/data";


export async function GET(req){
    return new Response(JSON.stringify(await getServerData("students")), {
        status: 200,
        headers: {  'Content-Type': 'application/json' }
    });
}


export async function PUT(req){
    const body = await req.json();
    const { firstName, lastName, age, fieldOfStudies } = body;
    addNewDocument({
        firstName: firstName,
        lastName: lastName,
        age: age,
        fieldOfStudies: fieldOfStudies
    }, "students");
    return new Response(JSON.stringify({ message: "Studnet has been added" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

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