import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const logoVariants = cva("dark:invert", {
  variants: {
    size: {
      default: "h-8 w-auto",
      sm: "h-6 w-auto",
      md: "h-10 w-auto",
      lg: "h-12 w-auto",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface AlignpointLogoProps
  extends React.HTMLAttributes<HTMLImageElement>,
    VariantProps<typeof logoVariants> {
  showText?: boolean
}

export function AlignpointLogo({
  className,
  size,
  showText = true,
}: AlignpointLogoProps) {
  return (
    <div className="flex items-center">
      <Image
        src="/Logo.png"
        alt="Alignpoint Logo"
        width={showText ? 160 : 40}
        height={60}
        className={cn(logoVariants({ size }), className)}
        priority
      />
    </div>
  )
}