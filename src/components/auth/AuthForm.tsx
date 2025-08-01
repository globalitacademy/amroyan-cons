import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  isLogin: boolean;
  onToggle: () => void;
}

const AuthForm = ({ isLogin, onToggle }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Բարի գալուստ!",
          description: "Դուք հաջողությամբ մուտք եք գործել:",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Գրանցումը կատարված է",
          description: "Ստուգեք ձեր էլ. փոստը հաստատման համար:",
        });
      }
    } catch (error: any) {
      toast({
        title: "Սխալ",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? "Մուտք" : "Գրանցում"}</CardTitle>
        <CardDescription>
          {isLogin ? "Մուտքագրեք ձեր տվյալները" : "Ստեղծեք նոր հաշիվ"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Էլ. փոստ</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Գաղտնաբառ</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLogin ? "Մուտք" : "Գրանցվել"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={onToggle}>
            {isLogin ? "Գրանցվել" : "Մուտք գործել"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthForm;