import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Eye, Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface NewsItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  views: number;
  content: string;
  cover_image_url?: string;
  is_pinned: boolean;
}

const categoryColors: Record<string, string> = {
  'ข่าวประชาสัมพันธ์': 'bg-accent text-accent-foreground',
  'กิจกรรม': 'bg-green-500 text-card',
  'ผลงานนักเรียน': 'bg-blue-500 text-card',
  'ประกาศ': 'bg-red-500 text-card',
};

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['ทั้งหมด']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
    fetchCategories();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('is_pinned', { ascending: false })
        .order('sort_order', { ascending: true });

      if (error) throw error;

      const formattedNews: NewsItem[] = (data || []).map((item) => ({
        id: item.id,
        category: item.category,
        title: item.title,
        excerpt: item.excerpt || '',
        date: item.published_at
          ? format(new Date(item.published_at), 'dd MMM yyyy', { locale: th })
          : format(new Date(item.created_at), 'dd MMM yyyy', { locale: th }),
        views: item.views || 0,
        content: item.content || '',
        cover_image_url: item.cover_image_url || undefined,
        is_pinned: item.is_pinned || false,
      }));

      setAllNews(formattedNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('news_categories')
        .select('name')
        .order('name');

      if (error) throw error;

      const categoryNames = data?.map((c) => c.name) || [];
      setCategories(['ทั้งหมด', ...categoryNames]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Increment view count when opening news detail
  const handleNewsClick = async (news: NewsItem) => {
    setSelectedNews(news);
    // Increment view count
    try {
      await supabase
        .from('news')
        .update({ views: news.views + 1 })
        .eq('id', news.id);
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };

  const filteredNews = allNews.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ทั้งหมด' || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedNews) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-school section-padding">
          <Button
            variant="outline"
            onClick={() => setSelectedNews(null)}
            className="mb-8"
          >
            ← กลับ
          </Button>

          <article className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Badge className={categoryColors[selectedNews.category] || 'bg-secondary'}>
                {selectedNews.category}
              </Badge>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {selectedNews.date}
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-4 h-4" />
                {selectedNews.views.toLocaleString()} ครั้ง
              </span>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-8">
              {selectedNews.title}
            </h1>

            {selectedNews.cover_image_url && (
              <img
                src={selectedNews.cover_image_url}
                alt={selectedNews.title}
                className="w-full h-96 object-cover rounded-2xl mb-8"
              />
            )}

            <div
              className="prose prose-lg max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: selectedNews.content }}
            />
          </article>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block text-accent font-semibold mb-4">ข่าวสารและกิจกรรม</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            ข่าวสาร<span className="text-accent">และกิจกรรม</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            ติดตามข่าวสารและกิจกรรมต่างๆ ของโรงเรียนได้ที่นี่
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ค้นหาข่าวสาร..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-card"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">กำลังโหลด...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">ไม่พบข่าวสาร</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => (
                <div
                  key={news.id}
                  onClick={() => handleNewsClick(news)}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border cursor-pointer"
                >
                  {news.cover_image_url ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={news.cover_image_url}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary to-navy-light relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
                      {news.is_pinned && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary">📌 ปักหมุด</Badge>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={categoryColors[news.category] || 'bg-secondary'}>
                        {news.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {news.views.toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {news.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
