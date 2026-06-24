import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import type { BlogPost } from '@/lib/blog-data'

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export default function BlogCard({ post, className }: BlogCardProps) {
  return (
    <div 
      className={`border border-[#C5C4C2] bg-[#ECEBE9] flex flex-col group relative ${className || ''}`}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
    >
      {/* Card Header Image */}
      <div className="aspect-video w-full overflow-hidden border-b border-[#C5C4C2] relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300" 
        />
        <div className="absolute inset-0 bg-[#00b259]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
        
        {/* Tag pill */}
        <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold text-white bg-black/80 font-sans backdrop-blur-xs">
          {post.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow gap-4 font-sans">
        <div className="flex items-center justify-between text-[10px] text-neutral-500">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" /> {post.readTime}
          </span>
        </div>

        <h3 className="text-sm font-bold text-black group-hover:text-[#00b259] transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>

        <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mt-2 pt-4 border-t border-[#C5C4C2]/30">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="size-6 rounded-full border border-[#C5C4C2] grayscale"
          />
          <span className="text-[10px] font-bold text-neutral-600">{post.author.name}</span>
        </div>

        {/* Card Footer Link */}
        <div className="mt-auto pt-4 flex justify-between items-center text-xs font-bold">
          <Link href={`/blog/${post.slug}`} className="flex items-center gap-1.5 hover:text-[#00b259] transition-colors group/btn">
            <span>READ POST</span>
            <span className="text-[#00b259] group-hover/btn:translate-x-0.5 transition-transform">-&gt;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
