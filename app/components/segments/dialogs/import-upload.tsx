import { Upload } from "lucide-react";

interface ImportUploadProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImportUpload({ onFileSelect }: ImportUploadProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
      <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
      <p className="mb-2 text-sm font-medium">
        Drop your CSV file here or click to upload
      </p>
      <p className="text-xs text-muted-foreground">
        Supported format: CSV with headers (id, email)
      </p>
      <input
        type="file"
        accept=".csv"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={onFileSelect}
      />
    </div>
  );
}