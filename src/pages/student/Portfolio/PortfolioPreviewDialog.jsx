import  { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';
import PortfolioWebsite from "./PortfolioWebsite";

function PortfolioPreviewDialog({ portfolio }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Eye className="h-4 w-4" />
          <span>Preview Portfolio</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Portfolio Preview</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <PortfolioWebsite portfolio={portfolio} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PortfolioPreviewDialog;