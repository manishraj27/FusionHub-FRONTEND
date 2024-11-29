import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PortfolioPreview from "./PortfolioPreview";
import PortfolioWebsite from "./PortfolioWebsite";

const SharePortfolio = () => {
  const { uniqueUsername } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`http://localhost:2000/api/portfolio/public/${uniqueUsername}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio');
        }
        
        const data = await response.json();
        setPortfolio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [uniqueUsername]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // <Card className="p-6">
    //   <CardContent>
        <PortfolioWebsite portfolio={portfolio} />
        // <PortfolioPreview portfolio={portfolio} />
    //   </CardContent>
    // </Card>
  );
};

export default SharePortfolio;