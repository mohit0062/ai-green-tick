import { createClient } from '@/utils/supabase/server'
import BlogListClient, { type ClientPost } from './blog-list-client'
import { blogPosts as fallbackPosts } from '@/lib/blog-data'

export const dynamic = 'force-dynamic' // Disable cache to fetch fresh posts

export const metadata = {
  title: 'Blog — Engineering Notes, AI Experiments & Product Playbooks | AI Greentick',
  description: 'Read the latest insights on WhatsApp API automation, customer engagement strategies, and scaling business workflows from the AI Greentick builder team.',
}

export default async function BlogIndexPage() {
  let posts: ClientPost[] = []

  try {
    const supabase = await createClient()
    const { data: dbPosts, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (error || !dbPosts || dbPosts.length === 0) {
      console.warn('Supabase fetch failed or empty. Falling back to static mock blogs.', error)
      posts = fallbackPosts
    } else {
      posts = dbPosts.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.description || '',
        content: post.content || '',
        date: new Date(post.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        readTime: post.read_time || '5 min read',
        image: post.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
        category: post.category || 'AI Automation',
        tags: post.tags || [],
        author: {
          name: post.author || 'Aditya Sharma',
          avatar: post.author_avatar || 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-40.png',
          role: post.author_role || 'Head of Automation'
        }
      }))
    }
  } catch (err) {
    console.error('Error fetching blogs from Supabase:', err)
    posts = fallbackPosts
  }

  return <BlogListClient initialPosts={posts} />
}
