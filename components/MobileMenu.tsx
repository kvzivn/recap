import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useMobileMenu } from "@/lib/context/MobileMenuContext"

const MobileMenu = ({
  showHowItWorks,
  showPricing,
  howItWorksVisible,
  pricingVisible,
}: {
  showHowItWorks: () => void
  showPricing: () => void
  howItWorksVisible: boolean
  pricingVisible: boolean
}) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu()

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  }

  return (
    <div className="sm:hidden">
      <Button
        variant="ghost"
        onClick={toggleMenu}
        className="py-3 hover:bg-transparent hover:dark:bg-transparent"
      >
        <AnimatePresence mode="wait">
          {isMobileMenuOpen ? (
            <motion.div
              key="x"
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              exit={{ rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 h-screen w-full bg-stone-100 dark:bg-neutral-900 py-16"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div
              className="flex flex-col items-center gap-10"
              initial="closed"
              animate="open"
              variants={itemVariants}
            >
              <motion.div variants={itemVariants} custom={0}>
                <Button
                  variant="ghost"
                  className="text-xl hover:bg-transparent hover:dark:bg-transparent"
                  onClick={() => {
                    toggleMenu()
                    setTimeout(() => {
                      showHowItWorks()
                    }, 350)
                  }}
                >
                  How it works
                </Button>
              </motion.div>
              <motion.div variants={itemVariants} custom={1}>
                <Button
                  variant="ghost"
                  className="text-xl hover:bg-transparent hover:dark:bg-transparent"
                  onClick={() => {
                    toggleMenu()
                    setTimeout(() => {
                      showPricing()
                    }, 350)
                  }}
                >
                  Pricing
                </Button>
              </motion.div>
              <motion.div variants={itemVariants} custom={2}>
                <Button
                  variant="ghost"
                  asChild
                  className="text-xl hover:bg-transparent hover:dark:bg-transparent"
                >
                  <Link href="/sign-in">Log in</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileMenu
