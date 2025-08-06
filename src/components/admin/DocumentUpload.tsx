import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText } from "lucide-react";

type DocumentCategory = "standards" | "pek_notifications" | "clarifications_tax" | "clarifications_labor" | "discussions" | "tests_accounting_finance" | "tests_hr";

interface DocumentUploadProps {
  onSuccess?: () => void;
}

const DocumentUpload = ({ onSuccess }: DocumentUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as DocumentCategory | "",
    file: null as File | null
  });

  const categories = [
    { value: "standards", label: "ՀՀՄՍ / ՖՀՄՍ" },
    { value: "pek_notifications", label: "ՊԵԿ իրազեկումներ" },
    { value: "clarifications_tax", label: "Պաշտոնական պարզաբանումներ · Հարկային օրենսդրություն" },
    { value: "clarifications_labor", label: "Պաշտոնական պարզաբանումներ · Աշխատանքային օրենսդրություն" },
    { value: "discussions", label: "Քննարկումներ" },
    { value: "tests_accounting_finance", label: "Թեստեր · Հաշվապահական և ֆինանսական ոլորտ" },
    { value: "tests_hr", label: "Թեստեր · HR, կադրային ոլորտ" }
  ] as const;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Սխալ",
          description: "Միայն PDF ֆայլեր են ընդունվում",
          variant: "destructive"
        });
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file || !formData.title || !formData.category) {
      toast({
        title: "Սխալ",
        description: "Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    try {
      // Upload file to storage
      const fileExt = formData.file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, formData.file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Save document record
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category as DocumentCategory,
          file_url: publicUrl,
          file_name: formData.file.name,
          file_size: formData.file.size,
          mime_type: formData.file.type,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (dbError) throw dbError;

      toast({
        title: "Հաջողություն",
        description: "Փաստաթուղթը հաջողությամբ վերբեռնվեց"
      });

      setFormData({ title: "", description: "", category: "", file: null });
      onSuccess?.();
      
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Սխալ",
        description: "Չհաջողվեց վերբեռնել փաստաթուղթը",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Նոր փաստաթուղթ վերբեռնել
        </CardTitle>
        <CardDescription>
          Վերբեռնեք PDF փաստաթուղթ և լրացրեք մանրամասները
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Վերնագիր *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Փաստաթղթի վերնագիր"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Կատեգորիա *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value: DocumentCategory) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ընտրեք կատեգորիան" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Նկարագրություն</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Փաստաթղթի նկարագրություն"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="file">PDF ֆայլ *</Label>
            <div className="mt-2">
              <Input
                id="file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="cursor-pointer"
                required
              />
              {formData.file && (
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{formData.file.name}</span>
                  <span>({(formData.file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" disabled={uploading} className="w-full">
            {uploading ? "Վերբեռնում..." : "Վերբեռնել փաստաթուղթ"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;