import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const Dashboard = () => {
  const totalUsers = 15; // Example data
  const totalProjects = 26; // Example data
  const completedProjects = 15; // Example data

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    
       
      
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{totalUsers}</div>
        </CardContent>
      </Card>

      {/* Total Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Total Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{totalProjects}</div>
        </CardContent>
      </Card>

      {/* Completed Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{completedProjects}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
