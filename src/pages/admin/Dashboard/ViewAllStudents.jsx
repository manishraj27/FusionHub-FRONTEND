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

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${apiconfig.fusionhub_api}/admin/students`, {
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

  // Filter students based on the selected filter
  const filteredStudents = students.filter((student) => {
    if (filter === "ALL") return true;
    return student.provider === filter;
  });

  if(!students.length) {
    return <LoadingScreen/> 
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">View All Students</h1>
      <div className="mb-4">
        <Select value={filter} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="Google">Google OAuth2.0</SelectItem>
            <SelectItem value="FusionHub">FusionHub OAuth</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>A list of all registered students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Serial No.</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Provider</TableHead>
            {/* <TableHead>Project Size</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{student.id}</TableCell>
              <TableCell>{student.fullName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.skills}</TableCell>
              <TableCell>{student.university}</TableCell>
              <TableCell>{student.status || "PENDING"}</TableCell>
              <TableCell>{student.provider || "FusionHub"}</TableCell>
              {/* <TableCell>{student.projectSize}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewAllStudents;
