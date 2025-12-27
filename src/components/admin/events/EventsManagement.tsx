import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EventForm } from './EventForm';
import { deleteStorageImage } from '@/utils/storageUtils';

interface Event {
    id: string;
    title: string;
    description: string | null;
    event_date: string;
    event_time: string | null;
    location: string | null;
    category: string | null;
    image_url: string | null;
    status: string;
    created_at: string;
}

export const EventsManagement = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('event_date', { ascending: false });

            if (error) throw error;
            setEvents(data || []);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'เกิดข้อผิดพลาด',
                description: 'ไม่สามารถโหลดข้อมูลกิจกรรมได้',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรมนี้?')) return;

        try {
            // Get event to delete image from storage
            const event = events.find(e => e.id === id);
            if (event?.image_url) {
                await deleteStorageImage(event.image_url);
            }

            const { error } = await supabase.from('events').delete().eq('id', id);

            if (error) throw error;

            toast({
                title: 'สำเร็จ',
                description: 'ลบกิจกรรมเรียบร้อยแล้ว',
            });
            fetchEvents();
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'เกิดข้อผิดพลาด',
                description: 'ไม่สามารถลบกิจกรรมได้',
            });
        }
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingEvent(null);
        fetchEvents();
    };

    const getCategoryBadge = (category: string | null) => {
        const categories: Record<string, { label: string; color: string }> = {
            academic: { label: 'วิชาการ', color: 'bg-blue-500' },
            sports: { label: 'กีฬา', color: 'bg-green-500' },
            cultural: { label: 'วัฒนธรรม', color: 'bg-purple-500' },
            general: { label: 'ทั่วไป', color: 'bg-gray-500' },
        };

        const cat = categories[category || 'general'] || categories.general;
        return (
            <span className={`px-2 py-1 rounded text-xs text-white ${cat.color}`}>
                {cat.label}
            </span>
        );
    };

    const getStatusBadge = (status: string) => {
        const statuses: Record<string, { label: string; color: string }> = {
            published: { label: 'เผยแพร่', color: 'bg-green-600' },
            draft: { label: 'แบบร่าง', color: 'bg-yellow-600' },
            archived: { label: 'เก็บถาวร', color: 'bg-gray-600' },
        };

        const stat = statuses[status] || statuses.draft;
        return (
            <span className={`px-2 py-1 rounded text-xs text-white ${stat.color}`}>
                {stat.label}
            </span>
        );
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (isFormOpen) {
        return (
            <EventForm
                event={editingEvent}
                onClose={handleFormClose}
            />
        );
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">จัดการกิจกรรม</h1>
                    <p className="text-muted-foreground">จัดการกิจกรรมและปฏิทินโรงเรียน</p>
                </div>
                <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    เพิ่มกิจกรรม
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">กำลังโหลด...</p>
                </div>
            ) : events.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-semibold mb-2">ยังไม่มีกิจกรรม</h3>
                        <p className="text-muted-foreground mb-4">
                            เริ่มเพิ่มกิจกรรมแรกของคุณ
                        </p>
                        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                            <Plus className="w-4 h-4" />
                            เพิ่มกิจกรรม
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {events.map((event) => (
                        <Card key={event.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CardTitle className="text-xl">{event.title}</CardTitle>
                                            {getCategoryBadge(event.category)}
                                            {getStatusBadge(event.status)}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(event.event_date)}
                                            </span>
                                            {event.event_time && (
                                                <span>เวลา {event.event_time}</span>
                                            )}
                                            {event.location && <span>📍 {event.location}</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleEdit(event)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(event.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            {event.description && (
                                <CardContent>
                                    <p className="text-muted-foreground line-clamp-2">
                                        {event.description}
                                    </p>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
