import {SERVICES} from '@/lib/data'
import {fetchRows} from '@/lib/supabase'
import {SITE} from '@/lib/site'
export default async function sitemap(){const posts=await fetchRows('posts');const s=['','/about','/projects','/insights','/careers','/contact'].map(p=>({url:SITE+p}))
return [...s,...SERVICES.map(x=>({url:`${SITE}/services/${x.slug}`})),...posts.map(p=>({url:`${SITE}/insights/${p.slug}`,lastModified:p.created_at}))]}
