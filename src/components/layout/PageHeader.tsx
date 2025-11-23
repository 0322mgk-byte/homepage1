import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
}

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="border-b border-gray-800 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              홈
            </Link>
            {breadcrumb.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                {index === breadcrumb.length - 1 ? (
                  <span className="text-white">{item.name}</span>
                ) : (
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{title}</h1>
        {subtitle && <p className="text-xl text-gray-400 max-w-3xl">{subtitle}</p>}
      </div>
    </section>
  );
}
