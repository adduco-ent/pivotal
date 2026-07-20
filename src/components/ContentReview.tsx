import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type QueueItem = {
  id: string
  created_at: string
  higgsfield_generation_id: string | null
  video_url: string | null
  prompt: string | null
  type: 'post' | 'story'
  status: 'pending_review' | 'approved' | 'rejected' | 'posted'
}

export default function ContentReview() {
  const [items, setItems] = useState<QueueItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQueue()
  }, [])

  async function fetchQueue() {
    setLoading(true)
    const { data, error } = await supabase
      .from('content_queue')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching queue:', error)
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }

  async function handleStatus(id: string, status: 'approved' | 'rejected') {
    const { error } = await supabase
      .from('content_queue')
      .update({ status })
      .eq('id', id)

    if (!error) {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 p-8 pt-24 text-white flex justify-center items-center">
        Loading content queue...
      </div>
    )
  }

  const pending = items.filter((i) => i.status === 'pending_review' && i.video_url)
  const approved = items.filter((i) => i.status === 'approved')

  return (
    <div className="min-h-screen bg-zinc-950 p-4 sm:p-8 pt-24 text-white font-mono text-sm">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl mb-2 tracking-tight">Social Media Command Center</h1>
        <p className="text-zinc-500 mb-8">Review and download Higgsfield-generated cinematic content.</p>

        <div className="mb-12">
          <h2 className="text-xl mb-4 pb-2 border-b border-zinc-800">Pending Review ({pending.length})</h2>
          {pending.length === 0 ? (
            <div className="p-8 border border-zinc-800 rounded text-zinc-500 text-center">
              No new videos waiting for review.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pending.map((item) => (
                <div key={item.id} className="border border-zinc-800 bg-zinc-900/50 rounded overflow-hidden flex flex-col">
                  {item.video_url ? (
                    <video
                      src={item.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`w-full bg-black object-cover ${item.type === 'story' ? 'aspect-[9/16]' : 'aspect-[4/5]'}`}
                    />
                  ) : (
                    <div className={`w-full bg-zinc-900 flex items-center justify-center text-zinc-600 ${item.type === 'story' ? 'aspect-[9/16]' : 'aspect-[4/5]'}`}>
                      Video Processing...
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-zinc-800 px-2 py-1 rounded text-xs uppercase text-zinc-400">
                        {item.type}
                      </span>
                      <span className="text-xs text-zinc-600">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs mb-4 line-clamp-3 leading-relaxed flex-1">
                      {item.prompt}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <button
                        onClick={() => handleStatus(item.id, 'rejected')}
                        className="py-2 bg-red-950/30 text-red-400 hover:bg-red-950/50 rounded border border-red-900/50 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleStatus(item.id, 'approved')}
                        className="py-2 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-950/50 rounded border border-emerald-900/50 transition-colors"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl mb-4 pb-2 border-b border-zinc-800">Approved Content ({approved.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {approved.map((item) => (
              <div key={item.id} className="border border-zinc-800 bg-zinc-900/50 rounded overflow-hidden group relative">
                <video
                  src={item.video_url || undefined}
                  muted
                  playsInline
                  className={`w-full bg-black object-cover opacity-80 group-hover:opacity-100 transition-opacity ${item.type === 'story' ? 'aspect-[9/16]' : 'aspect-[4/5]'}`}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity">
                  <a
                    href={item.video_url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs"
                    download
                  >
                    Download MP4
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
