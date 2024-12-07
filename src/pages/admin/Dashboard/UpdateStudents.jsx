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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import apiconfig from './../../../configurations/APIConfig';
import LoadingScreen from "@/components/LoadingScreen";


const UpdateStudents = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${apiconfig.fusionhub_api}/admin/students`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStudents(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (token) {
      fetchStudents();
    }
  }, [token]);

  const handleStatusChange = async (studentId, newStatus) => {
    try {
      const response = await fetch(
        `${apiconfig.fusionhub_api}/admin/students/${studentId}/status?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setMessage(`Student ${studentId} status updated to ${newStatus}`);
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId ? { ...student, status: newStatus } : student
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("Error updating status.");
    }
  };

  if(!students.length) {
    return <LoadingScreen/>
  }

  const filteredStudents =
    filter === "ALL"
      ? students
      : students.filter((student) => student.status === filter);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Student Status</h1>
      <div className="mb-4">
        <Select value={filter} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
          <TableHead className="w-[100px]">Serial No.</TableHead>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}
      <Table>
        <TableCaption>A list of all registered students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student,index) => (
            <TableRow key={student.id}>
               <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{student.id}</TableCell>
              <TableCell>{student.fullName}</TableCell> {/* Fixed field name */}
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Select
                  value={student.status}
                  onValueChange={(value) =>
                    handleStatusChange(student.id, value)
                  }
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="ACCEPTED">Accepted</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleStatusChange(student.id, "PENDING")}
                  className="bg-yellow-400 text-white px-4 py-2 rounded"
                >
                  Reset
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>

    </div>
  );
};

export default UpdateStudents;
