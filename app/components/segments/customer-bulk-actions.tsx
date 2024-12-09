import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Upload, Download } from "lucide-react";
import type { BulkChangePreview } from "~/types/segment-history";
import { ImportPreview } from "./dialogs/import-preview";
import { ImportUpload } from "./dialogs/import-upload";

export function CustomerBulkActions() {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [bulkPreview, setBulkPreview] = useState<BulkChangePreview | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock preview data - replace with actual file processing
      setBulkPreview({
        addedCustomers: [
          { id: "1", name: "John Doe", email: "john@example.com" },
        ],
        removedCustomers: [],
        statistics: {
          totalAdded: 1,
          totalRemoved: 0,
          percentageChange: 1,
        },
      });
    }
  };

  const handleImportCancel = () => {
    setBulkPreview(null);
    setIsImportOpen(false);
  };

  const handleImportConfirm = () => {
    // Handle import confirmation
    setIsImportOpen(false);
    setBulkPreview(null);
  };

  return (
    <>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
      
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <Button variant="outline" onClick={() => setIsImportOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Import Customers</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {!bulkPreview ? (
              <ImportUpload onFileSelect={handleFileUpload} />
            ) : (
              <ImportPreview
                preview={bulkPreview}
                onCancel={handleImportCancel}
                onConfirm={handleImportConfirm}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}