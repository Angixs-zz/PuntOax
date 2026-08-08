import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const allowedHosts = new Set([
  'maps.app.goo.gl',
  'goo.gl',
  'www.google.com',
  'google.com',
  'maps.google.com',
])

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function parseCoordinates(value: string) {
  const decoded = decodeURIComponent(value.replace(/\+/g, ' '))
  const patterns = [
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
    /\/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /\/search\/(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/,
    /[?&](?:query|q)=(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/,
  ]

  for (const pattern of patterns) {
    const match = decoded.match(pattern)
    if (match) return { lat: Number(match[1]), lng: Number(match[2]) }
  }
  return null
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const authorization = request.headers.get('Authorization')
  if (!authorization) return json({ error: 'Authentication required' }, 401)

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authorization } } },
  )
  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin')
  if (adminError || !isAdmin) return json({ error: 'Administrator access required' }, 403)

  try {
    const { url } = await request.json()
    if (typeof url !== 'string') return json({ error: 'A Google Maps URL is required' }, 400)

    const inputUrl = new URL(url)
    if (!allowedHosts.has(inputUrl.hostname)) return json({ error: 'Unsupported URL host' }, 400)

    const directCoordinates = parseCoordinates(inputUrl.toString())
    if (directCoordinates) return json(directCoordinates)

    const response = await fetch(inputUrl, {
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    const resolvedUrl = response.url
    const finalHost = new URL(resolvedUrl).hostname
    if (!allowedHosts.has(finalHost)) return json({ error: 'Unexpected redirect host' }, 400)

    const coordinates = parseCoordinates(resolvedUrl)
    if (!coordinates) return json({ error: 'Coordinates not found' }, 422)
    return json({ ...coordinates, resolvedUrl })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Unable to resolve URL' }, 400)
  }
})
