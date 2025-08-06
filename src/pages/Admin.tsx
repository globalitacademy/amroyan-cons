import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileText, Users, Upload, MessageSquare, Settings, PenTool, BarChart3, Database, Eye, Edit, Trash2, Mail, Phone, Calendar, ExternalLink, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DocumentUpload from "@/components/admin/DocumentUpload";
import UserManagement from "@/components/admin/UserManagement";
import SystemSettings from "@/components/admin/SystemSettings";
import CalculatorsManagement from "@/components/admin/CalculatorsManagement";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    documents: 0,
    users: 0,
    blogPosts: 0,
    messages: 0
  });
  
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchStats();
    fetchContactMessages();
    fetchBlogPosts();
    fetchDocuments();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const [documentsRes, usersRes, blogPostsRes, messagesRes] = await Promise.all([
        supabase.from('documents').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' })
      ]);

      setStats({
        documents: documentsRes.count || 0,
        users: usersRes.count || 0,
        blogPosts: blogPostsRes.count || 0,
        messages: messagesRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setContactMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Դուրս գալիս",
      description: "Դուք հաջողությամբ դուրս եկաք համակարգից:",
    });
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', messageId);
      
      if (error) throw error;
      
      setContactMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );
      
      toast({
        title: "Հաղորդագրությունը նշվեց որպես կարդացված",
      });
    } catch (error) {
      console.error('Error updating message:', error);
      toast({
        title: "Սխալ",
        description: "Չհաջողվեց թարմացնել հաղորդագրությունը",
        variant: "destructive"
      });
    }
  };

  const toggleBlogPostStatus = async (postId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !currentStatus })
        .eq('id', postId);
      
      if (error) throw error;
      
      setBlogPosts(prev => 
        prev.map(post => 
          post.id === postId ? { ...post, published: !currentStatus } : post
        )
      );
      
      toast({
        title: `Գրառումը ${!currentStatus ? 'հրապարակվեց' : 'թաքցվեց'}`,
      });
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Սխալ",
        description: "Չհաջողվեց թարմացնել գրառումը",
        variant: "destructive"
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const confirmed = window.confirm('Ջնջե՞լ գրառումը բոլորովին.');
      if (!confirmed) return;
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);
      if (error) throw error;
      setBlogPosts(prev => prev.filter(p => p.id !== postId));
      toast({ title: 'Գրառումը ջնջվեց' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({ title: 'Սխալ', description: 'Չհաջողվեց ջնջել գրառումը', variant: 'destructive' });
    }
  };

  const toggleDocumentStatus = async (docId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ is_published: !currentStatus })
        .eq('id', docId);
      
      if (error) throw error;
      
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === docId ? { ...doc, is_published: !currentStatus } : doc
        )
      );
      
      toast({
        title: `Փաստաթուղթը ${!currentStatus ? 'հրապարակվեց' : 'թաքցվեց'}`,
      });
    } catch (error) {
      console.error('Error updating document:', error);
      toast({
        title: "Սխալ",
        description: "Չհաջողվեց թարմացնել փաստաթուղթը",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDocument = async (docId: string, fileUrl?: string) => {
    try {
      const confirmed = window.confirm('Ջնջե՞լ փաստաթուղթը բոլորովին. Այս գործողությունը անդառնալի է.');
      if (!confirmed) return;

      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', docId);
      if (error) throw error;

      // Best-effort: try to remove from storage if we can derive the path
      if (fileUrl) {
        const marker = '/object/public/documents/';
        const idx = fileUrl.indexOf(marker);
        if (idx !== -1) {
          const storagePath = fileUrl.substring(idx + marker.length);
          if (storagePath) {
            await supabase.storage.from('documents').remove([storagePath]);
          }
        }
      }

      setDocuments(prev => prev.filter(d => d.id !== docId));
      toast({ title: 'Փաստաթուղթը ջնջվեց' });
    } catch (err) {
      console.error('Error deleting document:', err);
      toast({ title: 'Սխալ', description: 'Չհաջողվեց ջնջել փաստաթուղթը', variant: 'destructive' });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">Ադմինիստրատորի վահանակ</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Դուրս գալ
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Շտեմարան</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.documents}</div>
              <p className="text-xs text-muted-foreground">PDF ֆայլեր</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Օգտատերեր</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
              <p className="text-xs text-muted-foreground">Գրանցված օգտատերեր</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Բլոգ գրառումներ</CardTitle>
              <PenTool className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.blogPosts}</div>
              <p className="text-xs text-muted-foreground">Ընդամենը գրառումներ</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Հաղորդագրություններ</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.messages}</div>
              <p className="text-xs text-muted-foreground">Ստացված հաղորդագրություններ</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Ընդհանուր</TabsTrigger>
            <TabsTrigger value="messages">Հաղորդագրություններ</TabsTrigger>
            <TabsTrigger value="blog">Բլոգ</TabsTrigger>
            <TabsTrigger value="documents">Շտեմարան</TabsTrigger>
            <TabsTrigger value="calculators">Հաշվիչներ</TabsTrigger>
            <TabsTrigger value="users">Օգտատերեր</TabsTrigger>
            <TabsTrigger value="settings">Կարգավորումներ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="h-5 w-5" />
                    Բլոգի կառավարում
                  </CardTitle>
                  <CardDescription>
                    Ստեղծեք և կառավարեք բլոգի գրառումները
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => navigate('/blog-editor')}
                  >
                    Նոր գրառում ստեղծել
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/blog-management')}
                  >
                    Գրառումների կառավարում
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Շտեմարանի կառավարում
                  </CardTitle>
                  <CardDescription>
                    Վերբեռնեք և կառավարեք PDF փաստաթղթերը
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    onClick={() => setActiveTab("documents")}
                  >
                    Ֆայլ վերբեռնել
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Հաղորդագրություններ
                  </CardTitle>
                  <CardDescription>
                    Դիտեք և պատասխանեք հաղորդագրություններին
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {contactMessages.filter(msg => !msg.is_read).length}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Չկարդացված հաղորդագրություններ
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Վիճակագրություն
                  </CardTitle>
                  <CardDescription>
                    Կայքի գործունեության վիճակագրություն
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Ակտիվ փաստաթղթեր:</span>
                      <span className="font-medium">{documents.filter(d => d.is_published).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Հրապարակված գրառումներ:</span>
                      <span className="font-medium">{blogPosts.filter(p => p.published).length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Հաղորդագրություններ</CardTitle>
                <CardDescription>
                  Ստացված հաղորդագրությունների ցանկ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactMessages.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Հաղորդագրություններ չկան
                    </p>
                  ) : (
                    contactMessages.map((message) => (
                      <div key={message.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{message.name}</h4>
                              {!message.is_read && (
                                <Badge variant="destructive" className="text-xs">Նոր</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {message.email}
                              </span>
                              {message.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {message.phone}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(message.created_at).toLocaleDateString('hy-AM')}
                              </span>
                            </div>
                          </div>
                          {!message.is_read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markMessageAsRead(message.id)}
                            >
                              Նշել որպես կարդացված
                            </Button>
                          )}
                        </div>
                        <div>
                          <h5 className="font-medium mb-1">{message.subject}</h5>
                          <p className="text-sm text-muted-foreground">{message.message}</p>
                          {message.service && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Ծառայություն: {message.service}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Բլոգի կառավարում</h2>
              <Button onClick={() => navigate('/blog-editor')}>
                Նոր գրառում ստեղծել
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Վերջին գրառումները</CardTitle>
                <CardDescription>
                  Վերջերս ստեղծված բլոգի գրառումները
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Գրառումներ չկան
                    </p>
                  ) : (
                    blogPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="space-y-1">
                            <h4 className="font-medium">{post.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant={post.published ? "default" : "secondary"}>
                                {post.published ? "Հրապարակված" : "Սևագիր"}
                              </Badge>
                              <span>{post.category}</span>
                              <span>{new Date(post.created_at).toLocaleDateString('hy-AM')}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/blog/${post.slug}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/blog-editor?edit=${post.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={post.published ? "secondary" : "default"}
                              onClick={() => toggleBlogPostStatus(post.id, post.published)}
                            >
                              {post.published ? "Թաքցնել" : "Հրապարակել"}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletePost(post.id)}
                              title="Ջնջել գրառումը"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                {blogPosts.length > 0 && (
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate('/blog-management')}
                    >
                      Բոլոր գրառումները դիտել
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid gap-6">
              <DocumentUpload onSuccess={() => fetchDocuments()} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Վերջին փաստաթղթերը</CardTitle>
                  <CardDescription>
                    Վերջերս վերբեռնված փաստաթղթերի ցանկ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        Փաստաթղթեր չկան
                      </p>
                    ) : (
                      documents.map((doc) => (
                        <div key={doc.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="space-y-1">
                              <h4 className="font-medium">{doc.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant={doc.is_published ? "default" : "secondary"}>
                                  {doc.is_published ? "Հրապարակված" : "Սևագիր"}
                                </Badge>
                                <span>{doc.category}</span>
                                <span>{new Date(doc.created_at).toLocaleDateString('hy-AM')}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {doc.file_url && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(doc.file_url, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant={doc.is_published ? "secondary" : "default"}
                                onClick={() => toggleDocumentStatus(doc.id, doc.is_published)}
                              >
                                {doc.is_published ? "Թաքցնել" : "Հրապարակել"}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteDocument(doc.id, doc.file_url)}
                                title="Ջնջել փաստաթուղթը"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {doc.description && (
                            <p className="text-sm text-muted-foreground">
                              {doc.description}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SystemSettings />
          </TabsContent>

          <TabsContent value="calculators" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Հաշվիչների կառավարում</h2>
            <CalculatorsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;