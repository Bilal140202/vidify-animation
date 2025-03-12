
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';
import { categories } from '@/lib/data';
import { VideoService } from '@/services/VideoService';
import { useAuth } from '@/contexts/AuthContext';

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const UploadDialog: React.FC<UploadDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [duration, setDuration] = useState('00:00');
  const { toast } = useToast();
  const { user } = useAuth();

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideo(file);
      
      // Create a temporary URL for the video to get its duration
      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';
      videoElement.onloadedmetadata = () => {
        const minutes = Math.floor(videoElement.duration / 60);
        const seconds = Math.floor(videoElement.duration % 60);
        setDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      };
      videoElement.src = URL.createObjectURL(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !video || !category || !user) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Start upload process
    setIsUploading(true);
    
    // In a real app, we'd upload the video file to a server/cloud storage
    // For now, we'll use the File object's properties and create a local URL
    const videoUrl = URL.createObjectURL(video);
    
    // Use the thumbnail if provided, otherwise generate one from the video
    const thumbnailUrl = thumbnailPreview || 'https://picsum.photos/640/360';
    
    try {
      // Add the video to our service
      VideoService.addVideo({
        title,
        thumbnail: thumbnailUrl,
        duration,
        description: description || undefined,
        views: '0',
        channel: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          verified: false
        },
        videoUrl // This would normally be a cloud storage URL
      });
      
      toast({
        title: "Upload successful!",
        description: "Your video has been uploaded and is processing"
      });
      
      resetForm();
      onClose();
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your video",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setVideo(null);
    setThumbnail(null);
    setThumbnailPreview(null);
    setDuration('00:00');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
          <DialogDescription>
            Share your video with the Vidify community
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your video"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.filter(c => c.id !== 'all').map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video">Video File *</Label>
            <div className="border border-input rounded-md p-4 flex flex-col items-center justify-center">
              {!video ? (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                  <Input 
                    id="video" 
                    type="file" 
                    accept="video/*"
                    className="cursor-pointer"
                    onChange={handleVideoChange}
                    required
                  />
                </>
              ) : (
                <div className="text-sm">
                  <div className="flex items-center">
                    <div className="bg-muted p-2 rounded-lg mr-2">
                      <Upload className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{video.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(video.size / (1024 * 1024)).toFixed(2)} MB • {duration}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            
            {thumbnailPreview ? (
              <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail preview" 
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={clearThumbnail}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Input 
                id="thumbnail" 
                type="file" 
                accept="image/*"
                className="cursor-pointer"
                onChange={handleThumbnailChange}
              />
            )}
            <p className="text-xs text-muted-foreground">
              Recommended: 1280x720 (16:9)
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
