import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  slug: string;
  featured: boolean;
  published: boolean;
}

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [post, setPost] = useState<BlogPost>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Admin",
    read_time: "5 min read",
    slug: "",
    featured: false,
    published: false,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: "Սխալ",
        description: "Չհաջողվեց բեռնել գրառումը",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setPost(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      if (!post.title || !post.excerpt || !post.content || !post.category) {
        toast({
          title: "Սխալ",
          description: "Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը",
          variant: "destructive",
        });
        return;
      }

      if (id === 'new') {
        const { error } = await supabase
          .from('blog_posts')
          .insert([post]);
        
        if (error) throw error;
        toast({
          title: "Հաջողություն",
          description: "Գրառումը հաջողությամբ ստեղծվեց",
        });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .update(post)
          .eq('id', id);
        
        if (error) throw error;
        toast({
          title: "Հաջողություն", 
          description: "Գրառումը հաջողությամբ թարմացվեց",
        });
      }
      
      navigate('/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Սխալ",
        description: "Չհաջողվեց պահպանել գրառումը",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Բեռնում...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Վերադառնալ
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">
            {id === 'new' ? 'Նոր գրառում' : 'Խմբագրել գրառումը'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Գրառման մանրամասներ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Վերնագիր *</Label>
              <Input
                id="title"
                value={post.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Մուտքագրեք վերնագիրը"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={post.slug}
                onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-slug"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Հակիրճ նկարագրություն *</Label>
              <Textarea
                id="excerpt"
                value={post.excerpt}
                onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Մուտքագրեք հակիրճ նկարագրությունը"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Բովանդակություն *</Label>
              <Textarea
                id="content"
                value={post.content}
                onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Մուտքագրեք բովանդակությունը"
                rows={10}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Կատեգորիա *</Label>
                <Input
                  id="category"
                  value={post.category}
                  onChange={(e) => setPost(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Կատեգորիա"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Հեղինակ</Label>
                <Input
                  id="author"
                  value={post.author}
                  onChange={(e) => setPost(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Հեղինակ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Ընթերցման ժամանակ</Label>
                <Input
                  id="readTime"
                  value={post.read_time}
                  onChange={(e) => setPost(prev => ({ ...prev, read_time: e.target.value }))}
                  placeholder="5 min read"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={post.featured}
                    onCheckedChange={(checked) => setPost(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Առաջնային գրառում</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={post.published}
                    onCheckedChange={(checked) => setPost(prev => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="published">Հրատարակված</Label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {post.featured && <Badge variant="secondary">Առաջնային</Badge>}
                {post.published && <Badge variant="default">Հրատարակված</Badge>}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Link to="/blog">
                <Button variant="outline">Չեղարկել</Button>
              </Link>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Պահպանում...' : 'Պահպանել'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogEditor;