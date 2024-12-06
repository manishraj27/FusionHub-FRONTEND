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

const AllPortfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch("http://localhost:2000/admin/portfolios/urls", {
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
        console.log("Fetched portfolios:", data);
        setPortfolios(data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };

    if (token) {
      fetchPortfolios();
    }
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Portfolios</h1>
      <Table>
        <TableCaption>A list of all portfolios.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Serial No.</TableHead>
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Unique Username</TableHead>
            <TableHead>Portfolio URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolios.map((portfolio, index) => (
            <TableRow key={portfolio.userId}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{portfolio.userId}</TableCell>
              <TableCell>{portfolio.userName}</TableCell>
              <TableCell>{portfolio.email}</TableCell>
              <TableCell>{portfolio.uniqueUsername}</TableCell>
              <TableCell>
                <a href={portfolio.portfolioUrl} target="_blank" rel="noopener noreferrer">
                  View Portfolio
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllPortfolios;