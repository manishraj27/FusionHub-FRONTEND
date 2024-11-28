import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Share2, User } from 'lucide-react';
import CreatePortfolioForm from './CreatePortfolioForm';
import SharePortfolio from './SharePortfolio';

const PortfolioPage = () => {
  const [activeView, setActiveView] = useState('create');
  
  const renderContent = () => {
    switch (activeView) {
      case 'create':
        return <CreatePortfolioForm />;
      case 'update':
        return <CreatePortfolioForm isUpdate={true} />;
      case 'share':
        return <SharePortfolio />;
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
              >
                <Edit className="h-4 w-4" />
                <span>Update Portfolio</span>
              </Button>
              <Button
                variant={activeView === 'share' ? 'default' : 'outline'}
                className="flex items-center space-x-2"
                onClick={() => setActiveView('share')}
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