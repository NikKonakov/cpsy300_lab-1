
export async function GET(req, {params}) {
    const id = (await params).id;
    let students = [
        {id: 1, firstName: 'John', lastName: 'Doe', age: 20, fieldOfStudies: 'Computer Science'},
    ]
    return new Response(JSON.stringify(students.find(student => student.id === parseInt(id))), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}



