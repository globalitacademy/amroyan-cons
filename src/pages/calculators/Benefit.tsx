import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const BenefitCalculatorPage = () => {
  useEffect(() => {
    document.title = 'Նպաստի հաշվիչ | Amroyan Consulting';
    const desc = 'Նպաստների հաշվիչ — խնդրում ենք ճշտել կանոնները (տեսակները, բանաձևերը), կկատարենք ամբողջական հաշվարկը';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name','description'); document.head.appendChild(meta); }
    meta.setAttribute('content', desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel','canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', window.location.origin + '/calculators/benefit');
  }, []);

  return (
    <main className="pt-24 pb-12 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-2xl mx-auto bg-gradient-to-b from-gray-900 to-black border-gոլд-500/20">
          <CardHeader>
            <CardTitle className="gradient-text">Նպաստի հաշվիչ</CardTitle>
            <CardDescription className="text-gray-400">Խնդրում ենք տրամադրել նպաստների տեսակները և հաշվարկի կանոնները՝ պատրաստելու լիարժեք հաշվիչ</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Ներկայում սա նախնական էջ է։ Խնդրում ենք նշել՝ ինչ նպաստի տեսակներ (օր.՝ երեխայի խնամք, հիվանդանոցային և այլն), բազային գումարներ և տոկոսներ պետք է կիրառվեն:</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default BenefitCalculatorPage;
