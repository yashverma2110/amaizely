import BlogHeader from "@/components/ui/BlogHeader";

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogHeader />
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <main className="container mx-auto">
          {children}
        </main>
      </div>
    </>
  )
}
