import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  title: string;
  description?: string;
  category: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  view_count: number;
  created_at: string;
}

const Standards = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "ՀՀՄՍ / ՖՀՄՍ | Շտեմարան";
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("category", "standards")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error: any) {
      toast({
        title: "Սխալ",
        description: "Չհաջողվեց բեռնել փաստաթղթերը",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentView = async (doc: Document) => {
    try {
      // Increment view count
      await supabase.rpc("increment_document_view_count", {
        document_id: doc.id
      });

      // Open document
      if (doc.file_url) {
        window.open(doc.file_url, "_blank");
      }
    } catch (error: any) {
      toast({
        title: "Սխալ",
        description: "Չհաջողվեց բացել փաստաթուղթը",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Բեռնում...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-32 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">ՀՀՄՍ / ՖՀՄՍ</h1>
          <p className="text-gray-300 mt-2">Հաշվապահական ստանդարտների շտեմարան</p>
        </header>

        {documents.length === 0 ? (
          <section className="text-center text-gray-400 py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Դեռ փաստաթղթեր չեն ավելացվել այս բաժնում</p>
          </section>
        ) : (
          <section className="grid gap-4">
            {documents.map(doc => (
              <Card key={doc.id} className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">{doc.title}</h3>
                      {doc.description && (
                        <p className="text-sm text-gray-400 mb-2">{doc.description}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {doc.file_size && (
                          <span className="flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            {formatFileSize(doc.file_size)}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {doc.view_count} դիտում
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDocumentView(doc)} 
                        disabled={!doc.file_url}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Բացել
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Standards;