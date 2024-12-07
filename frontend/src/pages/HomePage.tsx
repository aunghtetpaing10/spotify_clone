import FeaturedSection from "@/components/FeaturedSection"
import SectionGrid from "@/components/SectionGrid"
import Topbar from "@/components/Topbar"
import { ScrollArea } from "@/components/ui/scroll-area"

const HomePage = () => {
  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc[100vh-180px]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good afternoon</h1>
          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid />
            <SectionGrid />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default HomePage