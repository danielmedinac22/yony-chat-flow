import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import yonyAvatarImage from "@/assets/yony-avatar.png";

interface YonyAvatarProps {
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}

export const YonyAvatar = ({ size = "md", showStatus = true }: YonyAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  return (
    <div className="relative">
      <Avatar className={`${sizeClasses[size]} border-2 border-primary shadow-lg`}>
        <AvatarImage 
          src={yonyAvatarImage} 
          alt="YonY - Tu Agente de IA"
          className="object-cover"
        />
        <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
          Y
        </AvatarFallback>
      </Avatar>
      
      {showStatus && (
        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-secondary rounded-full border-2 border-background animate-pulse" 
             title="En línea" />
      )}
    </div>
  );
};