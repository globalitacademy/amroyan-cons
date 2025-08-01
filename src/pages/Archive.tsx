import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, MessageSquare, Building2 } from "lucide-react";

const Archive = () => {
  const { t } = useLanguage();

  const sections = [
    {
      title: "Հարկային օրենսդրություն",
      items: [
        {
          title: "Օրենքներ",
          icon: <FileText className="w-5 h-5" />,
          files: [
            "ՀՀ հարկային օրենսգիրք.pdf",
            "ԱԱՀ մասին օրենք.pdf",
            "Մաքսային օրենսգիրք.pdf",
            "Գույքահարկի մասին օրենք.pdf"
          ]
        },
        {
          title: "Պարզաբանումներ",
          icon: <FileText className="w-5 h-5" />,
          files: [
            "ԱԱՀ հաշվարկման կարգ.pdf",
            "Հարկային վարչարարական պարտականություններ.pdf",
            "Էլեկտրոնային հաշվետվություն.pdf"
          ]
        },
        {
          title: "Քննարկումներ",
          icon: <MessageSquare className="w-5 h-5" />,
          files: []
        },
        {
          title: "ՀՀՄՍ",
          icon: <Building2 className="w-5 h-5" />,
          files: []
        },
        {
          title: "ՖՀՄՍ",
          icon: <Building2 className="w-5 h-5" />,
          files: []
        }
      ]
    },
    {
      title: "Կադրային օրենսդրություն",
      items: [
        {
          title: "Օրենքներ",
          icon: <FileText className="w-5 h-5" />,
          files: [
            "ՀՀ աշխատանքային օրենսգիրք.pdf",
            "Պետական ծառայության մասին օրենք.pdf",
            "Սոցիալական ապահովության մասին օրենք.pdf"
          ]
        },
        {
          title: "Պարզաբանումներ",
          icon: <FileText className="w-5 h-5" />,
          files: [
            "Աշխատանքային պայմանագրեր.pdf",
            "Աշխատավարձի հաշվարկ.pdf",
            "Արձակուրդներ և հատուցումներ.pdf"
          ]
        },
        {
          title: "Քննարկումներ",
          icon: <MessageSquare className="w-5 h-5" />,
          files: []
        },
        {
          title: "ՀՀՄՍ",
          icon: <Building2 className="w-5 h-5" />,
          files: []
        },
        {
          title: "ՖՀՄՍ",
          icon: <Building2 className="w-5 h-5" />,
          files: []
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Շտեմարան</h1>
          
          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="w-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {section.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${sectionIndex}-${itemIndex}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="text-lg font-medium">{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-8 space-y-2">
                            {item.files.length > 0 ? (
                              item.files.map((file, fileIndex) => (
                                <div key={fileIndex} className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer">
                                  <FileText className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{file}</span>
                                </div>
                              ))
                            ) : (
                              <p className="text-muted-foreground text-sm">Բովանդակությունը կլրացվի շուտով</p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archive;