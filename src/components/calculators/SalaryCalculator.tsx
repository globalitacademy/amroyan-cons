
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  grossSalary: z.coerce.number().min(1, { message: 'Աշխատավարձը պետք է լինի դրական թիվ' }),
});

const SalaryCalculator = () => {
  const [results, setResults] = useState({
    netSalary: 0,
    incomeTax: 0,
    pension: 0,
    stampDuty: 0,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  const grossSalary = form.watch('grossSalary');
  const { formState: { isValid } } = form;

  useEffect(() => {
    if (grossSalary > 0 && isValid) {
      const incomeTax = grossSalary * 0.20;
      // Note: These are simplified calculations for demonstration purposes.
      const pension = grossSalary * 0.05; 
      const stampDuty = 5500;
      const netSalary = grossSalary - incomeTax - pension - stampDuty;
      
      setResults({
        netSalary: Math.max(0, netSalary),
        incomeTax,
        pension,
        stampDuty,
      });
    } else {
      setResults({ netSalary: 0, incomeTax: 0, pension: 0, stampDuty: 0 });
    }
  }, [grossSalary, isValid]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hy-AM', { style: 'currency', currency: 'AMD', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-gradient-to-b from-gray-900 to-black border-gold-500/20">
      <CardHeader>
        <CardTitle className="gradient-text">Աշխատավարձի հաշվիչ</CardTitle>
        <CardDescription className="text-gray-400">
          Մուտքագրեք ձեր բրուտո աշխատավարձը՝ հարկերից հետո մաքուր գումարը հաշվելու համար։
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="grossSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-400">Բրուտո (հարկերը ներառյալ) աշխատավարձ</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Օրինակ՝ 300000"
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {(grossSalary > 0 && isValid) && (
          <div className="mt-8 pt-6 border-t border-gray-800 space-y-4 animate-fade-in-up">
            <h3 className="text-xl font-bold text-white text-center">Հաշվարկի արդյունքներ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white">
              <div className="bg-gray-800 p-4 rounded-md">
                <p className="text-sm text-gray-400">Եկամտային հարկ (20%)</p>
                <p className="text-lg font-semibold text-red-400">- {formatCurrency(results.incomeTax)}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-md">
                <p className="text-sm text-gray-400">Կուտակային կենսաթոշակ (5%)</p>
                <p className="text-lg font-semibold text-red-400">- {formatCurrency(results.pension)}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-md">
                <p className="text-sm text-gray-400">Դրոշմանիշային վճար</p>
                <p className="text-lg font-semibold text-red-400">- {formatCurrency(results.stampDuty)}</p>
              </div>
               <div className="bg-green-600/20 border border-green-500/50 p-4 rounded-md sm:col-span-2 text-center">
                <p className="text-lg text-green-300">Մաքուր (նետ) աշխատավարձ</p>
                <p className="text-3xl font-bold text-green-400">{formatCurrency(results.netSalary)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center pt-2">* Հաշվարկները նախնական են և ծառայում են ցուցադրական նպատակների համար։</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalaryCalculator;
