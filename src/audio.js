export async function handleAudioRequest(request, env) {
  const url = new URL(request.url);
  const filename = url.pathname.split('/').pop();
  
  const object = await env.AUDIO_BUCKET.get(filename);
  
  if (!object) {
    return new Response('Audio not found', { status: 404 });
  }
  
  return new Response(object.body, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
} 