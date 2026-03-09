import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import Header from '@/components/Header';
import backgroundPattern from '@/assets/background-pattern.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Save, Mail, UserRound, CalendarDays, Pencil, Trash2 } from 'lucide-react';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, updateUsername, uploadAvatar, removeAvatar } = useProfile();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile?.username) {
      setUsername(profile.username);
    }
  }, [profile]);

  const handleSaveUsername = async () => {
    if (!username.trim()) return;
    setIsSaving(true);
    const success = await updateUsername(username.trim());
    if (success) setIsEditing(false);
    setIsSaving(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      const { toast } = await import('sonner');
      toast.error('Image must be under 2MB');
      return;
    }
    setIsUploading(true);
    await uploadAvatar(file);
    setIsUploading(false);
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown';

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <div className="fixed inset-0 bg-background/70 pointer-events-none" />
      <Header />

      <main className="relative z-10 container mx-auto px-4 pt-28 pb-16 max-w-2xl">
        <h1 className="font-fredoka text-3xl text-shimmer text-center mb-8">Your Profile</h1>

        <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-card p-8 border border-border/50 space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-28 w-28 border-4 border-primary/30 shadow-soft">
                <AvatarImage src={profile?.avatar_url ?? undefined} alt="Profile" />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl font-fredoka">
                  {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform disabled:opacity-50"
              >
                {isUploading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground font-quicksand">
                Click the camera icon to update your photo
              </p>
              {profile?.avatar_url && (
                <button
                  onClick={async () => {
                    setIsRemoving(true);
                    await removeAvatar();
                    setIsRemoving(false);
                  }}
                  disabled={isRemoving}
                  className="text-xs font-quicksand font-semibold text-destructive hover:text-destructive/80 transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  {isRemoving ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-destructive border-t-transparent" />
                  ) : (
                    <Trash2 className="h-3 w-3" />
                  )}
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label className="font-quicksand font-semibold flex items-center gap-2">
              <UserRound className="h-4 w-4 text-primary" /> Username
            </Label>
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="rounded-2xl"
                  maxLength={30}
                />
                <Button
                  onClick={handleSaveUsername}
                  disabled={isSaving || !username.trim()}
                  size="icon"
                  className="rounded-2xl shrink-0"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-background/50 rounded-2xl px-4 py-3 border border-border/50">
                <span className="font-quicksand text-foreground">
                  {profile?.username || <span className="text-muted-foreground italic">No username set</span>}
                </span>
                <button onClick={() => setIsEditing(true)} className="text-primary hover:text-primary/80 transition-colors">
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Email (read-only) */}
          <div className="space-y-2">
            <Label className="font-quicksand font-semibold flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> Email
            </Label>
            <div className="bg-background/50 rounded-2xl px-4 py-3 border border-border/50">
              <span className="font-quicksand text-foreground">{user.email}</span>
            </div>
          </div>

          {/* Member since */}
          <div className="space-y-2">
            <Label className="font-quicksand font-semibold flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" /> Member Since
            </Label>
            <div className="bg-background/50 rounded-2xl px-4 py-3 border border-border/50">
              <span className="font-quicksand text-foreground">{memberSince}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
