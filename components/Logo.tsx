"use client"

import { Button } from "./ui/button"
import { useRouter, usePathname } from "next/navigation"

const Logo = ({
  resetContent,
  className,
}: {
  resetContent?: () => void
  className?: string
}) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = () => {
    if (resetContent) {
      resetContent()
    } else {
      if (
        pathname === "/" ||
        pathname === "/sign-in" ||
        pathname === "/sign-up"
      ) {
        router.push("/")
      } else {
        router.push("/home")
      }
    }
  }

  return (
    <Button variant="link" onClick={handleClick} className={className}>
      <svg
        height="18"
        viewBox="0 0 750 305"
        fill="none"
        className="text-neutral-700 dark:text-stone-200"
      >
        <path
          d="M741.509 270.903C738.3 203.775 719.668 140.128 688.492 91.805C654.126 38.5344 606.883 7.69067 556.774 7.69067C506.667 7.69067 459.423 38.5344 425.055 91.805C407.924 118.359 394.58 149.54 385.502 183.383C380.797 172.329 375.345 161.938 369.188 152.394C345.187 115.193 312.004 93.3764 276.558 93.3764C241.111 93.3764 207.928 115.193 183.927 152.394C173.027 169.29 164.334 188.845 158.09 210.022C156.516 207.104 154.851 204.281 153.096 201.562C137.519 177.417 115.76 162.935 92.2256 162.935C68.6909 162.935 46.9325 177.417 31.3549 201.562C18.1038 222.102 9.92941 248.6 7.76835 276.632C7.37762 281.7 8.50764 286.559 10.8472 290.323C13.1496 294.026 17.0797 297.247 22.2126 297.247C27.3731 297.247 31.211 293.99 33.5724 290.501C35.9805 286.943 37.4628 282.369 37.9421 277.648C39.8484 258.869 45.5273 241.582 54.0829 228.321C64.7654 211.763 78.6226 203.377 92.2256 203.377C105.829 203.377 119.686 211.763 130.369 228.321C138.924 241.582 144.603 258.869 146.509 277.648C146.988 282.369 148.471 286.943 150.879 290.501C153.24 293.99 157.078 297.247 162.238 297.247C162.34 297.247 162.44 297.246 162.54 297.244C162.973 297.286 163.414 297.308 163.862 297.308C169.633 297.308 174.039 293.675 176.813 289.523C179.632 285.308 181.347 279.823 181.777 274.081C184.334 239.963 194.23 208.202 209.813 184.048C228.081 155.732 252.227 140.741 276.558 140.741C300.888 140.741 325.034 155.732 343.302 184.048C358.884 208.202 368.781 239.963 371.338 274.081C371.769 279.823 373.483 285.308 376.301 289.523C379.077 293.675 383.483 297.308 389.253 297.308C389.441 297.308 389.628 297.304 389.814 297.297C390.006 297.304 390.201 297.308 390.396 297.308C396.603 297.308 401.417 293.405 404.481 288.781C407.586 284.094 409.451 277.958 409.815 271.487C412.879 216.866 428.247 165.637 453.199 126.96C481.236 83.5031 518.63 60.0057 556.774 60.0057C594.919 60.0057 632.314 83.5031 660.35 126.96C685.303 165.637 700.672 216.866 703.735 271.487C704.1 277.958 705.963 284.094 709.066 288.781C712.13 293.405 716.943 297.308 723.156 297.308C729.342 297.308 734.222 293.424 737.212 288.677C740.243 283.871 741.827 277.57 741.509 270.903Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="11.1391"
        />
      </svg>
    </Button>
  )
}

export default Logo
