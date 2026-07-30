import { POST } from '@/app/api/testimonies/upload/route';
import { NextRequest } from 'next/server';

describe('POST /api/testimonies/upload', () => {
  it('rejects requests without file', async () => {
    const formData = new FormData();
    formData.append('type', 'hero');
    formData.append('alt', 'Test hero image');

    const request = new NextRequest('http://localhost:3000/api/testimonies/upload', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('No file provided');
  });

  it('rejects requests without type', async () => {
    const formData = new FormData();
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    formData.append('file', file);
    formData.append('alt', 'Test image');

    const request = new NextRequest('http://localhost:3000/api/testimonies/upload', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid image type');
  });

  it('rejects invalid image type', async () => {
    const formData = new FormData();
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    formData.append('file', file);
    formData.append('type', 'invalid');
    formData.append('alt', 'Test image');

    const request = new NextRequest('http://localhost:3000/api/testimonies/upload', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid image type');
  });

  it('rejects requests without alt text', async () => {
    const formData = new FormData();
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    formData.append('file', file);
    formData.append('type', 'hero');

    const request = new NextRequest('http://localhost:3000/api/testimonies/upload', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Alt text required');
  });

  it('accepts valid hero image upload', async () => {
    const formData = new FormData();
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    formData.append('file', file);
    formData.append('type', 'hero');
    formData.append('alt', 'Test hero image');

    const request = new NextRequest('http://localhost:3000/api/testimonies/upload', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('url');
    expect(data.type).toBe('hero');
    expect(data.alt).toBe('Test hero image');
  });

  it('accepts valid proof image upload', async () => {
    const formData = new FormData();
    const file = new File(['test'], 'proof.jpg', { type: 'image/jpeg' });
    formData.append('file', file);
    formData.append('type', 'proof');
    formData.append('alt', 'Proof image');

    const request = new NextRequest('http://localhost:3000/api/testimonies/upload', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.type).toBe('proof');
  });

  it('returns base64 encoded data URL', async () => {
    const formData = new FormData();
    const file = new File(['test data'], 'test.jpg', { type: 'image/jpeg' });
    formData.append('file', file);
    formData.append('type', 'hero');
    formData.append('alt', 'Test image');

    const request = new NextRequest('http://localhost:3000/api/testimonies/upload', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const data = await response.json();
    expect(data.url).toMatch(/^data:image\/jpeg;base64,/);
  });
});
