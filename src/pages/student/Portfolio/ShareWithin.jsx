import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Eye } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PortfolioWebsite from "./PortfolioWebsite";

const ShareWithin = ({ shareLink, portfolio }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Share Your Portfolio</CardTitle>
        {/* Preview Dialog */}
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
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
        </Dialog> */}
      </CardHeader>
      <CardContent className="space-y-4">
        {shareLink ? (
          <>
            <div className="flex space-x-2">
              <Input 
                value={shareLink}
                readOnly
                className="flex-grow"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && (
              <Alert variant="default" className="mt-2">
                <AlertDescription>
                  Portfolio link copied to clipboard
                </AlertDescription>
              </Alert>
            )}
            <p className="text-sm text-muted-foreground">
              Share this link with anyone to showcase your portfolio
            </p>
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            Create a portfolio first to get a shareable link
          </p>
        )}
      </CardContent>
    </Card>

    {/* Portfolio Preview */}
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Portfolio Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <PortfolioWebsite portfolio={portfolio} />
      </CardContent>
    </Card>
    </div>
  );
};

export default ShareWithin;