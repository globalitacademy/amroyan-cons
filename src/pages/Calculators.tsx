import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import DynamicIcon from '@/components/ui/DynamicIcon';

const Calculators = () => {
  useEffect(() => {
    document.title = 'Հաշվիչներ — Ֆինանսական հաշվիչներ | Amroyan Consulting';
    const desc = 'Ֆինանսական հաշվիչներ՝ Աշխատավարձ, Շրջհարկ, Շահութահարկ, Նպաստ, Նախագծերի (Սմետա) հաշվարկ';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + '/calculators');
  }, []);
  const [items, setItems] = useState<Array<{ title: string; to: string; icon_name: string; desc: string }>>([]);
  useEffect(() => {
    document.title = 'Հաշվիչներ — Ֆինանսական հաշվիչներ | Amroyan Consulting';
    const desc = 'Ֆինանսական հաշվիչներ՝ Աշխատավարձ, Շրջհարկ, Շահութահարկ, Նպաստ, Նախագծերի (Սմետա) հաշվարկ';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + '/calculators');
  }, []);

  useEffect(() => {
    // Fetch visible calculators from Supabase
    const fetchCalculators = async () => {
      const { data, error } = await supabase
        .from('calculators')
        .select('title, slug, description, icon_name')
        .eq('visible', true)
        .order('sort_order', { ascending: true });
      if (!error && data) {
        setItems(
          data.map((d: any) => ({
            title: d.title,
            to: `/calculators/${d.slug}`,
            icon_name: d.icon_name || 'Calculator',
            desc: d.description || ''
          }))
        );
      }
    };
    fetchCalculators();
  }, []);
  return <main className="pt-20 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Հաշվիչներ</h1>
            
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map(({
            title,
            to,
            icon_name,
            desc
          }) => <Card key={to} className="group bg-gradient-to-br from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                    <DynamicIcon name={icon_name as any} className="text-black" size={22} />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">{title}</CardTitle>
                    <CardDescription className="text-gray-400 mt-1">{desc}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold w-full">
                    <Link to={to} aria-label={`${title} էջ`}>
                      Բացել <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>
    </main>;

};
export default Calculators;