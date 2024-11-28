import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Share2, User } from 'lucide-react';
import CreatePortfolioForm from './CreatePortfolioForm';
import SharePortfolio from './SharePortfolio';
import ShareWithin from './ShareWithin';

const PortfolioPage = () => {
  const [activeView, setActiveView] = useState('create');
  const [existingPortfolio, setExistingPortfolio] = useState(null);

  useEffect(() => {
    fetchExistingPortfolio();
  }, []);

  const fetchExistingPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:2000/api/portfolio', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const portfolioData = await response.json();
        setExistingPortfolio(portfolioData);
        // Automatically switch to update view if portfolio exists
        setActiveView('update');
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'create':
        return <CreatePortfolioForm />;
      case 'update':
        return <CreatePortfolioForm initialPortfolio={existingPortfolio} isUpdate={true} />;
      case 'share':
        return <ShareWithin 
          shareLink={existingPortfolio ? `http://localhost:5173/share/${existingPortfolio.uniqueUsername}` : null} 
        />;
      default:
        return <CreatePortfolioForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto p-6">
        {/* Navigation Header */}
        <Card className="mb-8 p-4 backdrop-blur-sm">
          <nav className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Portfolio Manager
              </h1>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant={activeView === 'create' ? 'default' : 'outline'}
                className="flex items-center space-x-2"
                onClick={() => setActiveView('create')}
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create Portfolio</span>
              </Button>
              <Button
                variant={activeView === 'update' ? 'default' : 'outline'}
                className="flex items-center space-x-2"
                onClick={() => setActiveView('update')}
                // Disable update button if no existing portfolio
                disabled={!existingPortfolio}
              >
                <Edit className="h-4 w-4" />
                <span>Update Portfolio</span>
              </Button>
              <Button
                variant={activeView === 'share' ? 'default' : 'outline'}
                className="flex items-center space-x-2"
                onClick={() => setActiveView('share')}
                // Disable share button if no existing portfolio
                disabled={!existingPortfolio}
              >
                <Share2 className="h-4 w-4" />
                <span>Share Portfolio</span>
              </Button>
            </div>
          </nav>
        </Card>

        {/* Main Content */}
        <div className="transition-all duration-300 ease-in-out">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;