import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DeleteStudents = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:2005/admin/students", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (token) {
      fetchStudents();
    }
  }, [token]);
  
  const handleDelete = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:2005/admin/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // If response is successful (either 200 OK or 204 No Content)
      if (response.ok) {
        // If 204 No Content is returned, we don't need to parse the response
        if (response.status === 204) {
          setMessage("Student deleted successfully.");
        } else {
          const data = await response.json();  // 200 OK with message
          setMessage(data.message || "Student deleted successfully.");
        }
        
        // Remove student from the list
        setStudents(students.filter(student => student.id !== studentId));
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error deleting student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      setMessage("Error deleting student.");
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Delete Student</h1>
      <Table>
        <TableCaption>A list of all registered students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.id}</TableCell>
              <TableCell>{student.fullName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default DeleteStudents;
