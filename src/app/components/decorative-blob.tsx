interface DecorativeBlobProps {
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function DecorativeBlob({ color, size = "md", className = "" }: DecorativeBlobProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full blur-3xl opacity-20 ${color} ${className}`}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
