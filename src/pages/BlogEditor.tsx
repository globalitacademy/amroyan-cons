import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import RichTextEditor from "@/components/blog/RichTextEditor";
import ImageUpload from "@/components/blog/ImageUpload";
import TagsInput from "@/components/blog/TagsInput";
import SEOSettings from "@/components/blog/SEOSettings";

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
  featured_image?: string;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  keywords?: string;
}

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  
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
    featured_image: "",
    tags: [],
    meta_title: "",
    meta_description: "",
    canonical_url: "",
    keywords: "",
  });

  // Auto-save draft every 30 seconds
  const autoSaveDraft = useCallback(async () => {
    if (!post.title || autoSaving || saving) return;
    
    try {
      setAutoSaving(true);
      const draftData = { ...post, published: false };
      
      if (id === 'new') {
        // Create new draft
        const { error } = await supabase
          .from('blog_posts')
          .insert([draftData]);
        if (error) throw error;
      } else {
        // Update existing draft
        const { error } = await supabase
          .from('blog_posts')
          .update(draftData)
          .eq('id', id);
        if (error) throw error;
      }
    } catch (error) {
      console.error('Auto-save error:', error);
    } finally {
      setAutoSaving(false);
    }
  }, [post, id, autoSaving, saving]);

  useEffect(() => {
    const interval = setInterval(autoSaveDraft, 30000);
    return () => clearInterval(interval);
  }, [autoSaveDraft]);

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

      // Auto-generate meta title and description if not provided
      const postData = {
        ...post,
        meta_title: post.meta_title || post.title,
        meta_description: post.meta_description || post.excerpt,
        canonical_url: post.canonical_url || `${window.location.origin}/blog/${post.slug}`,
      };

      if (id === 'new') {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        
        if (error) throw error;
        toast({
          title: "Հաջողություն",
          description: "Գրառումը հաջողությամբ ստեղծվեց",
        });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
        
        if (error) throw error;
        toast({
          title: "Հաջողություն", 
          description: "Գրառումը հաջողությամբ թարմացվեց",
        });
      }
      
      navigate('/admin/blog');
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

  const handlePreview = () => {
    // Open preview in new tab
    const previewData = {
      ...post,
      content: post.content.replace(/<[^>]*>/g, ''), // Strip HTML for basic preview
    };
    
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head>
            <title>${post.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
              img { max-width: 100%; height: auto; }
              .meta { color: #666; margin-bottom: 20px; }
              .tags { margin-top: 20px; }
              .tag { background: #e2e8f0; padding: 4px 8px; border-radius: 4px; margin-right: 8px; font-size: 12px; }
            </style>
          </head>
          <body>
            ${post.featured_image ? `<img src="${post.featured_image}" alt="${post.title}" style="width: 100%; margin-bottom: 20px;">` : ''}
            <h1>${post.title}</h1>
            <div class="meta">
              <strong>Կատեգորիա:</strong> ${post.category} | 
              <strong>Հեղինակ:</strong> ${post.author} | 
              <strong>Ընթերցման ժամանակ:</strong> ${post.read_time}
            </div>
            <div>${post.content}</div>
            ${post.tags && post.tags.length > 0 ? `
              <div class="tags">
                <strong>Պիտակներ:</strong> 
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            ` : ''}
          </body>
        </html>
      `);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/blog">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Վերադառնալ
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">
              {id === 'new' ? 'Նոր գրառում' : 'Խմբագրել գրառումը'}
            </h1>
            {autoSaving && (
              <Badge variant="outline" className="text-muted-foreground">
                Ավտոմատ պահպանում...
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Նախադիտել
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Պահպանում...' : 'Պահպանել'}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">
              <FileText className="w-4 h-4 mr-2" />
              Բովանդակություն
            </TabsTrigger>
            <TabsTrigger value="media">Մեդիա</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="settings">Կարգավորումներ</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Հիմնական տեղեկություններ</CardTitle>
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
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={post.slug}
                    onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-friendly-slug"
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
                  <Label>Բովանդակություն *</Label>
                  <RichTextEditor
                    value={post.content}
                    onChange={(content) => setPost(prev => ({ ...prev, content }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Մեդիա ֆայլեր</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ImageUpload
                  currentImage={post.featured_image}
                  onImageUpload={(url) => setPost(prev => ({ ...prev, featured_image: url }))}
                />
                
                <TagsInput
                  tags={post.tags || []}
                  onChange={(tags) => setPost(prev => ({ ...prev, tags }))}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <SEOSettings
              seoData={{
                metaTitle: post.meta_title || '',
                metaDescription: post.meta_description || '',
                canonicalUrl: post.canonical_url || '',
                keywords: post.keywords || '',
              }}
              onChange={(seoData) => setPost(prev => ({
                ...prev,
                meta_title: seoData.metaTitle,
                meta_description: seoData.metaDescription,
                canonical_url: seoData.canonicalUrl,
                keywords: seoData.keywords,
              }))}
            />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Գրառման կարգավորումներ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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

                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center space-x-6">
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-8 pb-8">
          <Link to="/admin/blog">
            <Button variant="outline">Չեղարկել</Button>
          </Link>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Պահպանում...' : 'Պահպանել'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;