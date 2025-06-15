import { ArrowRight, Calculator, TrendingUp, Shield, Users, Award, CheckCircle, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import { blogPosts as allBlogPosts } from '@/data/blog';
const Index = () => {
  const services = [{
    icon: Calculator,
    title: 'Հաշվապահություն',
    description: 'Լիարժեք հաշվապահական ծառայություններ ձեր բիզնեսի համար'
  }, {
    icon: TrendingUp,
    title: 'Ֆինանսական վերլուծություն',
    description: 'Մանրամասն ֆինանսական հաշվետվություններ և վերլուծություններ'
  }, {
    icon: Shield,
    title: 'Հարկային խորհրդատվություն',
    description: 'Պրոֆեսիոնալ հարկային պլանավորում և օպտիմալացում'
  }, {
    icon: Users,
    title: 'Խորհրդատվություն',
    description: 'Բիզնես խորհրդատվություն և ռազմավարական պլանավորում'
  }];
  const features = ['Փորձառու մասնագետների թիմ', '24/7 սպասարկում', 'Անվտանգ և գաղտնի', 'Ժամանակակից տեխնոլոգիաներ'];
  const stats = [{
    number: '500+',
    label: 'Գործընկերներ'
  }, {
    number: '15+',
    label: 'Տարիների փորձ'
  }, {
    number: '98%',
    label: 'Բավարարված հաճախորդներ'
  }, {
    number: '1000+',
    label: 'Կատարված նախագծեր'
  }];
  const blogPosts = allBlogPosts.slice(0, 3);
  return <div className="relative">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1554224155-16954435154a?q=80&w=2070&auto=format&fit=crop" 
          alt="Financial consulting background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Amroyan</span>
              <br />
              <span className="text-white">Consulting</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Պրոֆեսիոնալ հաշվապահական և ֆինանսական ծառայություններ
              <br />
              ձեր բիզնեսի հաջողության համար
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold px-8 py-4 text-lg">
                <Link to="/services">
                  Ծառայություններ <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black px-8 py-4 text-lg">
                <Link to="/contact">
                  Կապ մեզ հետ
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>)}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Մեր ծառայությունները</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ամբողջական լուծումներ ձեր բիզնեսի ֆինանսական կարիքների համար
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => <Card key={index} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group hover:transform hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                    <service.icon size={32} className="text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="gradient-text">Ինչու՞ ընտրել մեզ</span>
                </h2>
                
                <div className="space-y-4">
                  {features.map((feature, index) => <div key={index} className="flex items-center space-x-4">
                      <CheckCircle className="text-gold-400 flex-shrink-0" size={24} />
                      <span className="text-lg text-gray-300">{feature}</span>
                    </div>)}
                </div>

                <Button asChild className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold mt-8">
                  <Link to="/about">
                    Մեր մասին <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-gold-600/20 rounded-3xl blur-3xl" />
                <Card className="relative bg-gradient-to-br from-gray-900 to-black border-gold-500/20">
                  <CardContent className="p-8">
                    <Award className="text-gold-400 mb-6" size={48} />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Մենք ապահովում ենք
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Բարձրակարգ պրոֆեսիոնալ ծառայություններ, 
                      որոնք օգնում են ձեր բիզնեսին աճել և զարգանալ 
                      ժամանակակից շուկայական պայմաններում:
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Նորություններ</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Օգտակար հոդվածներ և խորհուրդներ ֆինանսական և հաշվապահական ոլորտներից
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map(post => <Card key={post.slug} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="bg-gold-500/20 text-gold-400 px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <Button asChild variant="ghost" className="text-gold-400 hover:text-gold-300 p-0 h-auto text-sm self-start">
                    <Link to={`/blog/${post.slug}`}>
                      Կարդալ ավելին <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center">
            <Button asChild className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold">
              <Link to="/blog">
                Տեսնել բոլորը <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Պատրա՞ստ եք սկսել</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Կապվեք մեզ հետ և ստացեք անվճար խորհրդատվություն ձեր բիզնեսի համար
          </p>
          
          <Button asChild size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold px-12 py-4 text-lg">
            <Link to="/contact">
              Անվճար խորհրդատվություն <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default Index;
