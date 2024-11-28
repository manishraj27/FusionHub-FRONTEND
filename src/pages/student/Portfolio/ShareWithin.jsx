import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";


const ShareWithin = ({ shareLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast({
        title: "Link Copied",
        description: "Portfolio share link has been copied to clipboard."
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Portfolio</CardTitle>
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
  );
};

export default ShareWithin;