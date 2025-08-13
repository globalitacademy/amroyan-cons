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

type DocumentCategory = 
  | "tax_laws" | "tax_clarifications" | "tax_discussions" | "tax_hhms" | "tax_fhms"
  | "personnel_laws" | "personnel_clarifications" | "personnel_discussions" | "personnel_hhms" | "personnel_fhms";

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
    files: [] as File[]
  });

  const categories = [
    // Հարկային օրենսդրություն
    { value: "tax_laws", label: "Հարկային օրենսդրություն › Օրենքներ" },
    { value: "tax_clarifications", label: "Հարկային օրենսդրություն › Պարզաբանումներ" },
    { value: "tax_discussions", label: "Հարկային օրենսդրություն › Քննարկումներ" },
    { value: "tax_hhms", label: "Հարկային օրենսդրություն › ՀՀՄՍ" },
    { value: "tax_fhms", label: "Հարկային օրենսդրություն › ՖՀՄՍ" },
    // Կադրային օրենսդրություն
    { value: "personnel_laws", label: "Կադրային օրենսդրություն › Օրենքներ" },
    { value: "personnel_clarifications", label: "Կադրային օրենսդրություն › Պարզաբանումներ" },
    { value: "personnel_discussions", label: "Կադրային օրենսդրություն › Քննարկումներ" },
    { value: "personnel_hhms", label: "Կադրային օրենսդրություն › ՀՀՄՍ" },
    { value: "personnel_fhms", label: "Կադրային օրենսդրություն › ՖՀՄՍ" },
  ] as const;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const nonPdf = files.find(f => f.type !== 'application/pdf');
    if (nonPdf) {
      toast({ title: "Սխալ", description: "Միայն PDF ֆայլեր են ընդունվում", variant: "destructive" });
      return;
    }
    setFormData(prev => ({ ...prev, files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || formData.files.length === 0) {
      toast({ title: "Սխալ", description: "Ընտրեք կատեգորիան և առնվազն մեկ PDF ֆայլ", variant: "destructive" });
      return;
    }
    if (formData.files.length === 1 && !formData.title) {
      toast({ title: "Սխալ", description: "Մեկ ֆայլի դեպքում անհրաժեշտ է վերնագիր", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      for (const file of formData.files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
        const filePath = `documents/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        const title = formData.title || file.name.replace(/\.[^/.]+$/, "");
        const { error: dbError } = await supabase.from('documents').insert({
          title,
          description: formData.description,
          category: formData.category as DocumentCategory,
          file_url: publicUrl,
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type,
          uploaded_by: userId
        });
        if (dbError) throw dbError;
      }

      toast({ title: "Հաջողություն", description: `${formData.files.length} ֆայլ${formData.files.length>1?"եր":""} վերբեռնվեց` });
      setFormData({ title: "", description: "", category: "", files: [] });
      onSuccess?.();
    } catch (error) {
      console.error('Error uploading document(s):', error);
      toast({ title: "Սխալ", description: "Չհաջողվեց վերբեռնել ֆայլ(երը)", variant: "destructive" });
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
            <Label htmlFor="title">Վերնագիր {formData.files.length <= 1 ? '*' : ''}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder={formData.files.length > 1 ? "Կկիրառվի, եթե թողնեք" : "Փաստաթղթի վերնագիր"}
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
            <Label htmlFor="files">PDF ֆայլ(եր) *</Label>
            <div className="mt-2">
              <Input
                id="files"
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
                className="cursor-pointer"
                required
              />
              {formData.files.length > 0 && (
                <div className="mt-2 text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{formData.files.length} ընտրված ֆայլ</span>
                  </div>
                  <ul className="list-disc pl-5">
                    {formData.files.slice(0,3).map((f, i) => (
                      <li key={i}>{f.name} ({(f.size/1024/1024).toFixed(2)} MB)</li>
                    ))}
                    {formData.files.length > 3 && (
                      <li>… և ևս {formData.files.length - 3} ֆայլ</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" disabled={uploading} className="w-full">
            {uploading ? "Վերբեռնում..." : "Վերբեռնել ֆայլ(եր)"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;