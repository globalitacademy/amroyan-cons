import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileText, Download, Eye, ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
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
const Archive = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    tax: true,
    personnel: true
  });
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchDocuments();
  }, []);
  const fetchDocuments = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from("documents").select("*").eq("is_published", true).order("created_at", {
        ascending: false
      });
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
  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      tax_laws: "Օրենքներ",
      tax_clarifications: "Պարզաբանումներ",
      tax_discussions: "Քննարկումներ",
      tax_hhms: "ՀՀՄՍ",
      tax_fhms: "ՖՀՄՍ",
      personnel_laws: "Օրենքներ",
      personnel_clarifications: "Պարզաբանումներ",
      personnel_discussions: "Քննարկումներ",
      personnel_hhms: "ՀՀՄՍ",
      personnel_fhms: "ՖՀՄՍ"
    };
    return titles[category] || category;
  };
  const filterDocumentsByCategory = (prefix: string) => {
    return documents.filter(doc => doc.category.startsWith(prefix));
  };
  const renderDocumentsBySubcategory = (prefix: string) => {
    const subcategories = [{
      key: `${prefix}_laws`,
      title: "Օրենքներ"
    }, {
      key: `${prefix}_clarifications`,
      title: "Պարզաբանումներ"
    }, {
      key: `${prefix}_discussions`,
      title: "Քննարկումներ"
    }, {
      key: `${prefix}_hhms`,
      title: "ՀՀՄՍ"
    }, {
      key: `${prefix}_fhms`,
      title: "ՖՀՄՍ"
    }];
    return subcategories.map(subcategory => {
      const docs = documents.filter(doc => doc.category === subcategory.key);
      if (docs.length === 0) return null;
      return <div key={subcategory.key} className="mb-6">
          <h4 className="text-lg font-semibold text-gold-400 mb-3 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            {subcategory.title}
          </h4>
          <div className="grid gap-4">
            {docs.map(doc => <Card key={doc.id} className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-white mb-1">{doc.title}</h5>
                      {doc.description && <p className="text-sm text-gray-400 mb-2">{doc.description}</p>}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {doc.file_size && <span className="flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            {formatFileSize(doc.file_size)}
                          </span>}
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {doc.view_count} դիտում
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleDocumentView(doc)} disabled={!doc.file_url}>
                        <Download className="w-4 h-4 mr-1" />
                        Բացել
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>;
    }).filter(Boolean);
  };
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Բեռնում...</p>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Շտեմարան</h1>
          <p className="text-xl text-gray-300">Օգտակար նյութեր և տեղեկատվություն</p>
        </div>

        {/* Ենթաբաժինների արագ մուտքեր */}
        <section aria-label="Շտեմարանի ենթաբաժիններ" className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/archive/standards">
              <Card className="border-gray-800 bg-gray-900/50 hover:border-gold-500/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">ՀՀՄՍ / ՖՀՄՍ</CardTitle>
                  <CardDescription className="text-gray-400">Ստանդարտների հավաքածու</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/archive/notifications">
              <Card className="border-gray-800 bg-gray-900/50 hover:border-gold-500/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">ՊԵԿ իրազեկումներ</CardTitle>
                  <CardDescription className="text-gray-400">Վերջին հայտարարությունները</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/archive/clarifications/tax-law">
              <Card className="border-gray-800 bg-gray-900/50 hover:border-gold-500/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">Պարզաբանումներ — Հարկային</CardTitle>
                  <CardDescription className="text-gray-400">Հսկիչ մարմինների մեկնաբանություններ</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/archive/clarifications/labor-law">
              <Card className="border-gray-800 bg-gray-900/50 hover:border-gold-500/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">Պարզաբանումներ — Աշխատանքային</CardTitle>
                  <CardDescription className="text-gray-400">Պաշտոնական պարզաբանումներ</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/archive/discussions">
              <Card className="border-gray-800 bg-gray-900/50 hover:border-gold-500/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">Քննարկումներ</CardTitle>
                  <CardDescription className="text-gray-400">Մասնագիտական քննարկումներ</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/archive/tests/accounting">
              <Card className="border-gray-800 bg-gray-900/50 hover:border-gold-500/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">Թեստեր — Հաշվապահական/Ֆինանսկան</CardTitle>
                  <CardDescription className="text-gray-400">Գիտելիքների ստուգում</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/archive/tests/hr">
              <Card className="border-gray-800 bg-gray-900/50 hover:border-gold-500/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">Թեստեր — HR, կադրային</CardTitle>
                  <CardDescription className="text-gray-400">Հմտությունների գնահատում</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>

        <div className="space-y-8">
          {/* Հարկային օրենսդրություն */}
          <Card className="border-gray-800 bg-gray-900/50">
            <Collapsible open={openSections.tax} onOpenChange={() => toggleSection("tax")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-800/50 transition-colors">
                  <CardTitle className="flex items-center justify-between text-2xl text-gold-400">
                    Հարկային օրենսդրություն
                    {openSections.tax ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Հարկային նորմերի և կանոնակարգերի ամբողջական ցանկ
                  </CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {renderDocumentsBySubcategory("tax")}
                  {filterDocumentsByCategory("tax").length === 0 && <p className="text-center text-gray-500 py-8">
                      Դեռ փաստաթղթեր չեն ավելացվել այս բաժնում
                    </p>}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Կադրային օրենսդրություն */}
          <Card className="border-gray-800 bg-gray-900/50">
            <Collapsible open={openSections.personnel} onOpenChange={() => toggleSection("personnel")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-800/50 transition-colors">
                  <CardTitle className="flex items-center justify-between text-2xl text-gold-400">
                    Կադրային օրենսդրություն
                    {openSections.personnel ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Աշխատանքային հարաբերությունների կարգավորման նորմեր
                  </CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {renderDocumentsBySubcategory("personnel")}
                  {filterDocumentsByCategory("personnel").length === 0 && <p className="text-center text-gray-500 py-8">
                      Դեռ փաստաթղթեր չեն ավելացվել այս բաժնում
                    </p>}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>
      </div>
    </div>;
};
export default Archive;