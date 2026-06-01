import FilterSidebar from "@/components/filter-sidebar";
import Footer from "@/components/Footer";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className=" max-w-[100vw]  md:items-start">
      <div className="w-fit max-w-7xl m-auto flex flex-col sm:flex-row gap-5 px-6">
        <FilterSidebar />
        {children}
      </div>
    </div>
  );
}
