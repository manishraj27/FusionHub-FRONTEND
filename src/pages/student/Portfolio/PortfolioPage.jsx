import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreatePortfolioForm from "./CreatePortfolioForm";
import { useState } from "react";

const PortfolioPage = () => {
  const [portfolioData, setPortfolioData] = useState({
    name: "",
    role: "",
    about: "",
    theme: "light",
    projects: {},
  });

  const handleFormChange = (data) => {
    setPortfolioData(data);
    console.log("portfolio data: ", data);
  };

  const PortfolioPreview = ({ data }) => (
    <div
      className={`p-6 ${data.theme === "dark" ? "bg-white text-white" : "bg-white text-gray-700"}`}
    >
      <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
      <h2 className="text-xl mb-4">{data.role}</h2>
      <p className="mb-6">{data.about}</p>
      <h3 className="text-2xl font-semibold mb-4">Projects</h3>
      <ul>
        {Object.entries(data.projects).map(
          ([id, isSelected]) =>
            isSelected && (
              <li key={id} className="mb-2">
                Project {id}
              </li>
            ),
        )}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-center py-5 px-5">
      <section className="w-full md:w-1/2">
        <h1 className="pb-3 text-lg font-bold gap-3">
          Create Your Portfolio Here!
        </h1>
        <Card className="p-5 sticky top-10">
          <CardContent>
            <ScrollArea className="h-[80vh] pr-4">
              <CreatePortfolioForm onFormChange={handleFormChange} />
            </ScrollArea>
          </CardContent>
        </Card>
      </section>

      <section className="w-full md:w-1/2 pt-10">
        <Card className="p-5 sticky top-10">
          <CardContent>
            <ScrollArea className="h-[80vh]">
              <PortfolioPreview data={portfolioData} />
            </ScrollArea>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PortfolioPage;
