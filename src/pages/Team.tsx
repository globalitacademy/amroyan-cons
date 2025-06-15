
import { Landmark, Briefcase, Building, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalaryCalculator from '@/components/calculators/SalaryCalculator';

const Team = () => {
  const laws = [
    {
      icon: Landmark,
      title: 'Հարկային օրենսդրություն',
      description: 'Տեղեկատվություն ՀՀ հարկային դաշտի, հարկատեսակների և դրույքաչափերի վերաբերյալ։',
    },
    {
      icon: Briefcase,
      title: 'Աշխատանքային իրավունք',
      description: 'ՀՀ աշխատանքային օրենսգրքի հիմնական դրույթները, աշխատողի և գործատուի իրավունքներն ու պարտականությունները։',
    },
    {
      icon: Building,
      title: 'Կորպորատիվ իրավունք',
      description: 'Իրավաբանական անձանց գրանցման, կառավարման և լուծարման հետ կապված օրենսդրական կարգավորումներ։',
    },
    {
      icon: BookOpen,
      title: 'Հաշվապահական հաշվառում',
      description: 'Հաշվապահական հաշվառման ստանդարտներ, ֆինանսական հաշվետվությունների պատրաստման և ներկայացման կարգ։',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black network-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Մեր շտեմարանը</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12">
              Օգտակար գործիքներ և տեղեկատվություն՝ նվիրված ձեր բիզնեսի հաջողությանը
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <Tabs defaultValue="calculators" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="laws" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-300 text-gray-400">Օրենքներ</TabsTrigger>
            <TabsTrigger value="calculators" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-300 text-gray-400">Հաշվիչներ</TabsTrigger>
          </TabsList>

          <TabsContent value="laws" className="mt-16">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">
                  <span className="gradient-text">Օրենսդրական դաշտ</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Հիմնական օրենսդրական ակտեր և կարգավորումներ, որոնք կարևոր են Հայաստանում բիզնես վարելու համար։
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {laws.map((law, index) => (
                <Card key={index} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group">
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center group-hover:animate-pulse">
                      <law.icon size={24} className="text-black" />
                    </div>
                    <CardTitle className="gradient-text text-xl">{law.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {law.description}
                    </p>
                    <a href="#" className="text-sm font-semibold text-gold-400 hover:text-gold-300 mt-4 inline-block">
                      Իմանալ ավելին &rarr;
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="calculators" className="mt-16">
            <div className="flex flex-col items-center gap-10">
              <SalaryCalculator />
              <div className="text-center p-8 border border-dashed border-gray-700 rounded-lg max-w-lg w-full">
                <p className="text-gray-400">Շուտով կավելանան նաև արձակուրդային, հարկային և այլ հաշվիչներ։</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Team;
