import { createClient } from '@/utils/supabase/server'
import BlogPostDetailClient, { type DetailPost, type RelatedPost } from './blog-detail-client'
import { blogPosts as fallbackPosts } from '@/lib/blog-data'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

// Dynamically generate Meta Tags for SEO Optimization
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  try {
    const supabase = await createClient()
    const { data: post } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()

    if (!post) {
      // Check fallback data
      const fallback = fallbackPosts.find((p) => p.slug === slug)
      if (fallback) {
        return {
          title: `${fallback.title} | AI Greentick Blog`,
          description: fallback.excerpt,
        }
      }
      return {}
    }

    const title = post.meta_title || post.title
    const description = post.meta_description || post.description || ''
    const keywords = post.tags ? post.tags.join(', ') : ''

    return {
      title: `${title} | AI Greentick Blog`,
      description,
      keywords,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        url: `/blog/${slug}`,
        publishedTime: post.created_at,
        authors: [post.author || 'AI Greentick'],
        images: [
          {
            url: post.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [post.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png'],
      },
    }
  } catch (err) {
    console.error('Error generating metadata:', err)
    return {}
  }
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  let post: DetailPost | null = null
  let relatedPosts: RelatedPost[] = []

  try {
    const supabase = await createClient()

    // Fetch the current post
    const { data: dbPost, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !dbPost) {
      // Fallback check
      const fallback = fallbackPosts.find((p) => p.slug === slug)
      if (!fallback) {
        notFound()
      }
      post = {
        title: fallback.title,
        description: fallback.excerpt,
        category: fallback.category,
        date: fallback.date,
        readTime: fallback.readTime,
        author: {
          name: fallback.author.name,
          avatar: fallback.author.avatar,
          role: fallback.author.role,
        },
        image: fallback.image,
        content: fallback.content,
        slug: fallback.slug,
      }
      
      // Fetch fallback related posts
      relatedPosts = fallbackPosts
        .filter((p) => p.slug !== slug)
        .slice(0, 2)
        .map((p) => ({
          slug: p.slug,
          title: p.title,
          image: p.image,
          category: p.category,
          readTime: p.readTime,
        }))
    } else {
      // Increment views count asynchronously
      supabase
        .from('blogs')
        .update({ views: (dbPost.views || 0) + 1 })
        .eq('id', dbPost.id)
        .then()

      post = {
        title: dbPost.title,
        description: dbPost.description || '',
        category: dbPost.category || 'AI Automation',
        date: new Date(dbPost.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        readTime: dbPost.read_time || '5 min read',
        author: {
          name: dbPost.author || 'Aditya Sharma',
          avatar: dbPost.author_avatar || 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-40.png',
          role: dbPost.author_role || 'Head of Automation',
        },
        image: dbPost.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
        content: dbPost.content || '',
        slug: dbPost.slug,
      }

      // Fetch related posts (excluding current one, published only)
      const { data: dbRelated } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .neq('slug', slug)
        .limit(2)

      if (dbRelated && dbRelated.length > 0) {
        relatedPosts = dbRelated.map((related) => ({
          slug: related.slug,
          title: related.title,
          image: related.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
          category: related.category || 'AI Automation',
          readTime: related.read_time || '5 min read',
        }))
      } else {
        relatedPosts = fallbackPosts
          .filter((p) => p.slug !== slug)
          .slice(0, 2)
          .map((p) => ({
            slug: p.slug,
            title: p.title,
            image: p.image,
            category: p.category,
            readTime: p.readTime,
          }))
      }
    }
  } catch (err) {
    console.error('Error fetching blog details from Supabase:', err)
    const fallback = fallbackPosts.find((p) => p.slug === slug)
    if (!fallback) {
      notFound()
    }
    post = {
      title: fallback.title,
      description: fallback.excerpt,
      category: fallback.category,
      date: fallback.date,
      readTime: fallback.readTime,
      author: {
        name: fallback.author.name,
        avatar: fallback.author.avatar,
        role: fallback.author.role,
      },
      image: fallback.image,
      content: fallback.content,
      slug: fallback.slug,
    }
    relatedPosts = fallbackPosts
      .filter((p) => p.slug !== slug)
      .slice(0, 2)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        image: p.image,
        category: p.category,
        readTime: p.readTime,
      }))
  }

  return <BlogPostDetailClient post={post} relatedPosts={relatedPosts} />
}
