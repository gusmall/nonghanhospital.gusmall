import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Calendar, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface Album {
  id: string;
  title: string;
  category: string | null;
  date: string;
  location: string | null;
  cover_photo_url: string | null;
  description: string | null;
  photos: Photo[];
}

interface Photo {
  id: string;
  photo_url: string;
  caption: string | null;
  order_position: number;
}

const categoryColors: Record<string, string> = {
  'กีฬาสี': 'bg-blue-500',
  'วันสำคัญ': 'bg-green-500',
  'ศึกษาดูงาน': 'bg-purple-500',
  'กิจกรรมวิชาการ': 'bg-orange-500',
  'พิธีการ': 'bg-red-500',
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [albums, setAlbums] = useState<Album[]>([]);
  const [categories, setCategories] = useState<string[]>(['ทั้งหมด']);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const { data: albumsData, error: albumsError } = await supabase
        .from('gallery_albums')
        .select('*')
        .eq('is_published', true)
        .order('event_date', { ascending: false });

      if (albumsError) throw albumsError;

      const albumsWithPhotos = await Promise.all(
        (albumsData || []).map(async (album) => {
          const { data: photos } = await supabase
            .from('gallery_photos')
            .select('*')
            .eq('album_id', album.id)
            .order('order_position');

          return {
            id: album.id,
            title: album.title,
            category: album.category,
            date: album.event_date
              ? format(new Date(album.event_date), 'dd MMMM yyyy', { locale: th })
              : format(new Date(album.created_at), 'dd MMMM yyyy', { locale: th }),
            location: album.location,
            cover_photo_url: album.cover_photo_url || (photos && photos[0]?.photo_url) || null,
            description: album.description,
            photos: photos || [],
          };
        })
      );

      setAlbums(albumsWithPhotos);

      const uniqueCategories = Array.from(
        new Set(albumsData?.map((a) => a.category).filter(Boolean))
      ) as string[];
      setCategories(['ทั้งหมด', ...uniqueCategories]);
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAlbums =
    selectedCategory === 'ทั้งหมด'
      ? albums
      : albums.filter((album) => album.category === selectedCategory);

  const handleAlbumClick = (album: Album) => {
    if (album.photos.length > 0) {
      setSelectedAlbum(album);
      setCurrentPhotoIndex(0);
    }
  };

  const handleNext = () => {
    if (selectedAlbum) {
      setCurrentPhotoIndex((prev) => (prev + 1) % selectedAlbum.photos.length);
    }
  };

  const handlePrev = () => {
    if (selectedAlbum) {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? selectedAlbum.photos.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block text-accent font-semibold mb-4">แกลเลอรี่รูปภาพ</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            แกลเลอรี่<span className="text-accent">รูปภาพ</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            ภาพความประทับใจกิจกรรมต่างๆ ของโรงเรียน
          </p>
        </div>
      </section>

      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
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
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">กำลังโหลด...</p>
            </div>
          ) : filteredAlbums.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">ไม่พบอัลบั้มรูปภาพ</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAlbums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => handleAlbumClick(album)}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-border"
                >
                  {album.cover_photo_url ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={album.cover_photo_url}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      {album.category && (
                        <Badge className={`${categoryColors[album.category] || 'bg-secondary'} text-white`}>
                          {album.category}
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {album.photos.length} รูป
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {album.title}
                    </h3>

                    {album.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {album.description}
                      </p>
                    )}

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {album.date}
                      </div>
                      {album.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {album.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedAlbum} onOpenChange={() => setSelectedAlbum(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] w-full h-full p-0 flex flex-col">
          {selectedAlbum && selectedAlbum.photos.length > 0 && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between shrink-0 bg-card/50">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate text-foreground">{selectedAlbum.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    รูปที่ {currentPhotoIndex + 1} / {selectedAlbum.photos.length}
                  </p>
                </div>
              </div>

              {/* Image area */}
              <div className="flex-1 relative flex items-center justify-center bg-black/5 overflow-hidden">
                <img
                  key={currentPhotoIndex}
                  src={selectedAlbum.photos[currentPhotoIndex].photo_url}
                  alt={selectedAlbum.photos[currentPhotoIndex].caption || `รูปที่ ${currentPhotoIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
                {/* Navigation */}
                {selectedAlbum.photos.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full z-10"
                      onClick={handlePrev}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full z-10"
                      onClick={handleNext}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </div>

              {/* Caption */}
              {selectedAlbum.photos[currentPhotoIndex].caption && (
                <div className="p-3 border-t shrink-0 bg-card/30">
                  <p className="text-center text-sm text-muted-foreground line-clamp-2">
                    {selectedAlbum.photos[currentPhotoIndex].caption}
                  </p>
                </div>
              )}

              {/* Thumbnails */}
              {selectedAlbum.photos.length > 1 && (
                <div className="p-4 border-t shrink-0 bg-gradient-to-r from-card/30 via-card/50 to-card/30">
                  <div className="relative">
                    <div className="overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
                      <div className="flex gap-3 pb-2">
                        {selectedAlbum.photos.map((photo, idx) => (
                          <button
                            key={photo.id}
                            onClick={() => setCurrentPhotoIndex(idx)}
                            className={`flex-shrink-0 h-20 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${idx === currentPhotoIndex
                              ? 'border-primary shadow-lg shadow-primary/30 scale-105 ring-2 ring-primary/20'
                              : 'border-border/50 hover:border-primary/70 opacity-70 hover:opacity-100 hover:scale-105 hover:shadow-md'
                              }`}
                          >
                            <img
                              src={photo.photo_url}
                              alt={`รูปที่ ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Gallery;
