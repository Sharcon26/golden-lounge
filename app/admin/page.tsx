"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Plus,
    Pencil,
    Trash2,
    Calendar as CalendarIcon,
    Clock,
    Tag,
    Image as ImageIcon,
    Loader2,
    AlertCircle,
    LogOut,
    Upload,
    X,
    ChevronUp,
    ChevronDown,
    Eye
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { getAssetUrl } from "@/lib/assets";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

type Event = {
    id: string;
    title: string;
    date: string;
    time: string;
    description: string;
    image: string;
    category: string;
    ticket_url?: string;
};

export default function AdminDashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const router = useRouter();

    // Biolinks State
    const [biolinks, setBiolinks] = useState<any[]>([]);
    const [biolinkLoading, setBiolinkLoading] = useState(false);

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        toast.success("Logged out successfully");
        router.push("/admin/login");
        router.refresh();
    };

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        description: "",
        image: "",
        category: "Exclusive Night",
        ticket_url: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const fetchEvents = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("events")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            toast.error("Failed to fetch events");
        } else {
            setEvents(data || []);
        }
        setLoading(false);
    };

    // Fetch Biolinks
    const fetchBiolinks = async () => {
        setBiolinkLoading(true);
        try {
            const res = await fetch("/api/links");
            const data = await res.json();
            setBiolinks(data);
        } catch (error) {
            toast.error("Failed to fetch links");
        } finally {
            setBiolinkLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
        fetchBiolinks();
    }, []);

    const saveBiolinks = async (newLinks: any[]) => {
        try {
            const res = await fetch("/api/links", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newLinks),
            });
            if (res.ok) {
                toast.success("Links updated successfully");
                setBiolinks(newLinks);
            } else {
                toast.error("Failed to save links");
            }
        } catch (error) {
            toast.error("Error saving links");
        }
    };

    const handleAddLink = () => {
        const newLink = {
            id: Date.now().toString(),
            title: "New Link",
            url: "https://",
            order: biolinks.length + 1,
            active: true
        };
        saveBiolinks([...biolinks, newLink]);
    };

    const handleUpdateLink = (id: string, field: string, value: any) => {
        const updated = biolinks.map(l => l.id === id ? { ...l, [field]: value } : l);
        setBiolinks(updated); // Optimistic update
    };

    const handleSaveLink = (id: string) => {
        saveBiolinks(biolinks);
    };

    const handleDeleteLink = (id: string) => {
        if (!confirm("Delete this link?")) return;
        saveBiolinks(biolinks.filter(l => l.id !== id));
    };

    const moveLink = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === biolinks.length - 1) return;

        const newLinks = [...biolinks];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap
        [newLinks[index], newLinks[targetIndex]] = [newLinks[targetIndex], newLinks[index]];

        // Update order field
        newLinks.forEach((l, i) => l.order = i + 1);

        saveBiolinks(newLinks);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            date: "",
            time: "",
            description: "",
            image: "",
            category: "Exclusive Night",
            ticket_url: "",
        });
        setSelectedFile(null);
        setImagePreview(null);
        setEditingEvent(null);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            date: event.date,
            time: event.time,
            description: event.description,
            image: event.image,
            category: event.category,
            ticket_url: event.ticket_url ?? "",
        });
        setSelectedFile(null);
        setImagePreview(event.image ? getAssetUrl(event.image) : null);
        setIsDialogOpen(true);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error("Please select an image file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return;
            }
            setSelectedFile(file);
            setFormData({ ...formData, image: "" });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageToSupabase = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/upload-image", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to upload image");
        }

        const data = await response.json();
        return data.path;
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;

        const { error } = await supabase.from("events").delete().eq("id", id);

        if (error) {
            toast.error("Failed to delete event");
        } else {
            toast.success("Event deleted");
            fetchEvents();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsUploading(true);

        try {
            let imagePath = formData.image;

            if (selectedFile) {
                try {
                    imagePath = await uploadImageToSupabase(selectedFile);
                    toast.success("Image uploaded successfully");
                } catch (uploadError: any) {
                    toast.error(uploadError.message || "Failed to upload image");
                    setIsUploading(false);
                    setIsSubmitting(false);
                    return;
                }
            }

            if (!imagePath && !selectedFile) {
                toast.error("Please select an image file or provide an image URL");
                setIsUploading(false);
                setIsSubmitting(false);
                return;
            }

            const dataToSave = {
                ...formData,
                image: imagePath,
            };

            if (editingEvent) {
                const { error } = await supabase
                    .from("events")
                    .update(dataToSave)
                    .eq("id", editingEvent.id);

                if (error) throw error;
                toast.success("Event updated");
            } else {
                const { error } = await supabase.from("events").insert([dataToSave]);

                if (error) throw error;
                toast.success("Event created");
            }
            setIsDialogOpen(false);
            resetForm();
            fetchEvents();
        } catch (error: any) {
            toast.error(error.message || "Operation failed");
        } finally {
            setIsSubmitting(false);
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground font-serif tracking-tight">
                            Admin Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your events and biolinks.
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="events" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8 bg-card border border-border/50">
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="links">Quick Links (/bc)</TabsTrigger>
                </TabsList>

                <TabsContent value="events" className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold font-serif">Upcoming Events</h2>
                        <Dialog open={isDialogOpen} onOpenChange={(open) => {
                            setIsDialogOpen(open);
                            if (!open) resetForm();
                        }}>
                            <DialogTrigger asChild>
                                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
                                    <Plus className="w-4 h-4" /> New Event
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] border-border/50 bg-card/95 backdrop-blur-xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-serif">
                                        {editingEvent ? "Edit Event" : "Create New Event"}
                                    </DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Title</label>
                                            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category</label>
                                            <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Date</label>
                                            <Input value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Time</label>
                                            <Input value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Description</label>
                                        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="min-h-[100px]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ticket URL</label>
                                        <Input type="url" value={formData.ticket_url} onChange={(e) => setFormData({ ...formData, ticket_url: e.target.value })} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Image</label>
                                        <div className="flex gap-4">
                                            <div className="relative flex-1">
                                                <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="image-upload" />
                                                <label htmlFor="image-upload" className="flex items-center justify-center gap-2 w-full h-12 px-4 border border-border/50 rounded-lg bg-background hover:bg-accent cursor-pointer transition-colors">
                                                    <Upload className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">{selectedFile ? selectedFile.name : "Choose image file"}</span>
                                                </label>
                                            </div>
                                        </div>
                                        {imagePreview && (
                                            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border/50 bg-card mt-2">
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={() => { setSelectedFile(null); setImagePreview(null); setFormData({ ...formData, image: "" }); }}>
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    <DialogFooter>
                                        <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-xl">
                                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingEvent ? "Save Changes" : "Create Event")}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                            <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold">Synchronizing...</p>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="py-12 text-center border-2 border-dashed border-border/50 rounded-xl">
                            <p className="text-muted-foreground">No events found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event) => (
                                <Card key={event.id} className="group overflow-hidden border-border/50 bg-card/80 hover:border-primary/40 transition-all duration-300 shadow-xl">
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image src={getAssetUrl(event.image)} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-background/80 backdrop-blur-md text-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-border/50">{event.category}</span>
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                            <Button size="icon" variant="secondary" className="rounded-full" onClick={() => handleEdit(event)}><Pencil className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="destructive" className="rounded-full" onClick={() => handleDelete(event.id)}><Trash2 className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                    <CardHeader className="p-6">
                                        <CardTitle className="text-2xl font-bold font-serif mb-2">{event.title}</CardTitle>
                                        <div className="space-y-1 text-sm text-muted-foreground">
                                            <p className="flex items-center gap-2"><CalendarIcon className="w-3 h-3" /> {event.date}</p>
                                            <p className="flex items-center gap-2"><Clock className="w-3 h-3" /> {event.time}</p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="links" className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold font-serif">Quick Links</h2>
                            <p className="text-muted-foreground text-sm">Manage links visible at <a href="/bc" target="_blank" className="underline text-primary">/bc</a></p>
                        </div>
                        <Button onClick={handleAddLink} className="bg-primary text-primary-foreground font-bold">
                            <Plus className="w-4 h-4 mr-2" /> Add Link
                        </Button>
                    </div>

                    {biolinkLoading ? (
                        <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
                    ) : (
                        <div className="space-y-4 max-w-3xl mx-auto">
                            {biolinks.map((link, index) => (
                                <div key={link.id} className="flex items-center gap-4 bg-card border border-border/50 p-4 rounded-xl group hover:border-primary/30 transition-colors">
                                    <div className="flex flex-col gap-2">
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveLink(index, 'up')} disabled={index === 0}><ChevronUp className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveLink(index, 'down')} disabled={index === biolinks.length - 1}><ChevronDown className="w-4 h-4" /></Button>
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="text-[10px] uppercase text-muted-foreground font-bold">Title</label>
                                                <Input
                                                    value={link.title}
                                                    onChange={(e) => handleUpdateLink(link.id, 'title', e.target.value)}
                                                    onBlur={() => handleSaveLink(link.id)}
                                                    className="h-9 bg-background/50"
                                                />
                                            </div>
                                            <div className="flex-[2]">
                                                <label className="text-[10px] uppercase text-muted-foreground font-bold">URL</label>
                                                <Input
                                                    value={link.url}
                                                    onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                                                    onBlur={() => handleSaveLink(link.id)}
                                                    className="h-9 bg-background/50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className={link.active ? "text-green-500" : "text-muted-foreground"}
                                            onClick={() => {
                                                handleUpdateLink(link.id, 'active', !link.active);
                                                saveBiolinks(biolinks.map(l => l.id === link.id ? { ...l, active: !l.active } : l));
                                            }}
                                            title="Toggle Visibility"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDeleteLink(link.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {biolinks.length === 0 && <p className="text-center text-muted-foreground py-10">No links created yet.</p>}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
