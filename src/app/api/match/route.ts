import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jd_text, resume_text } = body;

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 });
    }

    // Call your n8n Master Orchestrator
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jd_text: jd_text,
        resume_text: resume_text,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch match score from n8n');
    }

    const data = await response.json();
    
    // Handle different response structures
    const result = Array.isArray(data) ? data[0] : data;
    
    return NextResponse.json(result);

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
