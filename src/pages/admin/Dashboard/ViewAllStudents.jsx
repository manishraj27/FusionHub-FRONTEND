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

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:2000/admin/students", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched students:", data);
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
  
    if (token) {
      fetchStudents();
    }
  }, [token]);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">View All Students</h1>
      <Table>
        <TableCaption>A list of all registered students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead>Project Size</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.id}</TableCell>
              <TableCell>{student.fullName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.status || "PENDING"}</TableCell>
              {/* <TableCell>{student.projectSize}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewAllStudents;
