import { useEffect, useState } from 'react';
import SalaryCalculator from '@/components/calculators/SalaryCalculator';
import { supabase } from '@/integrations/supabase/client';

interface RateItem { id: string; label: string; rate: number; }

const SalaryPage = () => {
  const [rates, setRates] = useState<RateItem[]>([]);

  useEffect(() => {
    document.title = 'Աշխատավարձի հաշվիչ | Amroyan Consulting';
    const desc = 'Հաշվեք բրուտո և նետ աշխատավարձը՝ եկամտահարկ, կենսաթոշակ և դրոշմանիշային վճարներով';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name','description'); document.head.appendChild(meta); }
    meta.setAttribute('content', desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel','canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', window.location.origin + '/calculators/salary');
  }, []);

  useEffect(() => {
    const loadRates = async () => {
      const { data: calc } = await supabase.from('calculators').select('id').eq('slug', 'salary').maybeSingle();
      if (!calc) return;
      const { data } = await supabase
        .from('calculator_rates')
        .select('id,label,rate')
        .eq('calculator_id', calc.id)
        .eq('visible', true)
        .order('sort_order', { ascending: true });
      setRates(data || []);
    };
    loadRates();
  }, []);

  return (
    <main className="pt-24 pb-12 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="sr-only">Աշխատավարձի հաշվիչ</h1>
        <SalaryCalculator />
      </section>

      {rates.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-3">Տոկոսադրույքները (տեղեկանքի համար)</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rates.map(r => (
              <li key={r.id} className="bg-gray-900/60 border border-gray-800 rounded p-3 text-gray-100">
                <span className="block text-sm text-gray-400">{r.label}</span>
                <span className="text-lg font-bold">{r.rate}%</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <article className="prose prose-invert max-w-none">
          <h2>Աշխատավարձի հաշվիչի մանրամասն նկարագրություն</h2>
          <p>Աշխատավարձի հաշվիչը հնարավորություն է տալիս պարզ և մատչելի կերպով հաշվարկել աշխատավարձի չափը, հարկերը և այլ վճարների չափերը։</p>
          <p>Հաշվիչի միջոցով կարելի է հաշվարկել և՛ մաքուր աշխատավարձը (հարկերից հետո)՝ նշելով գրանցված աշխատավարձի չափը, և՛ գրանցված աշխատավարձը (մինչ հարկումը)՝ նշելով մաքուր աշխատավարձը։</p>
          <p>Եկամտային հարկի, Կուտակային կենսաթոշակային համակարգի սոցիալական վճարի, Զինծառայողների աջակցության հիմնադրամի դրոշմանիշային վճարի մասին տեղեկատվությունը տրվում է ինչպես թվային, այնպես էլ տեքստային տարբերակով, ինչը ֆինանսների բնագավառից հեռու օգտատերերի համար ավելի հասկանալի է։</p>

          <h3>Եկամտային Հարկ</h3>
          <p>2023թ.-ի հունվարի 1-ից եկամտային հարկի դրույքաչափը կազմում է 20%։</p>
          <p>Հարկային արտոնություններից օգտվող ՏՏ ոլորտի լիցենզավորված ընկերությունների համար եկամտային հարկը կազմում է 10%:</p>

          <h3>Պարտադիր Կուտակային Կենսաթոշակային Համակարգ</h3>
          <p>Պարտադիր մասնակցություն - Կուտակային կենսաթոշակային համակարգի մասնակից` ծնված 1974թ. և դրանից հետո:</p>
          <p>Կամավոր մասնակցություն - Մինչ 1974թ. ծնվածները, ինչպես նաև ինքնազբաղված անձինք` անկախ տարիքից:</p>
          <p>2023թ. հունվարի 1-ից գործում են հետևյալ կարգավորումները</p>
          <p>Պարտադիր մասնակիցների համար հաշվարկը հետևյալն է. պարտադիր կուտակային վճարի չափը կազմում է անձի բազային եկամտի 10%-ը.</p>
          <ul>
            <li>Եթե բազային եկամուտը 500,000 դրամից պակաս է, ապա 5% վճարվում է անձի, իսկ մյուս 5%-ը պետության կողմից:</li>
            <li>Եթե բազային եկամուտը գերազանցում է 500,000 դրամը, սակայն պակաս է նվազագույն (75,000 դրամ) աշխատավարձի 15-ապատիկից՝ 1,125,000 դրամ, ապա պետության կողմից վճարվում է 25,000 դրամ, իսկ մասնակցի կողմից բազային եկամտի 10%-25,000 դրամ։</li>
            <li>Եթե բազային եկամուտը գերազանցում է 1,125,000 դրամը, ապա պետության կողմից վճարվում է 25,000 դրամ, իսկ անձի կողմից` 87,500 դրամ:</li>
          </ul>
          <p>Կուտակային համակարգին մինչև 2018թ. հուլիս ամիսը կամավոր միացած անձանց համար գործում են պարտադիր մասնակիցների համար նախատեսված պայմանները։ 2018թ.-ի հուլիսից համակարգին կամավոր միացած անձանց համար կուտակային վճարի չափը 5% է, եթե բազային եկամուտը չի գերազանցում 1,125,000 դրամը և 56,250 դրամ՝ եթե գերազանցում է։</p>

          <h3>ԶԱՀ Դրոշմանիշային վճարներ</h3>
          <p>2021թ. հունվարի 1-ից Զինծառայողների ապահովագրության հիմնադրամի դրոշմանիշային վճարները կատարվում են հետևյալ դրույքաչափերով.</p>
          <ul>
            <li>Մինչև 100 000 դրամ հաշվարկման բազայի դեպքում՝ 1500 դրամ</li>
            <li>100 001-ից մինչև 200 000 դրամ հաշվարկման բազայի դեպքում՝ 3000 դրամ</li>
            <li>200 001-ից մինչև 500 000 դրամ հաշվարկման բազայի դեպքում՝ 5500 դրամ</li>
            <li>500 001-ից մինչև 1 000 000 դրամ հաշվարկման բազայի դեպքում՝ 8500 դրամ</li>
            <li>1 000 001 դրամ և ավելի հաշվարկման բազայի դեպքում՝ 15 000 դրամ</li>
          </ul>
        </article>
      </section>
    </main>
  );
};

export default SalaryPage;
