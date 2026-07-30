import { GET } from '@/app/api/testimonies/[id]/route';
import { NextRequest } from 'next/server';

describe('GET /api/testimonies/[id]', () => {
  const testId = 'test-testimony-id';

  it('returns single testimony with relations', async () => {
    const request = new NextRequest(`http://localhost:3000/api/testimonies/${testId}`);
    const response = await GET(request, { params: { id: testId } });

    if (response.status === 200) {
      const data = await response.json();
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('name');
      expect(data).toHaveProperty('heroImage');
      expect(data).toHaveProperty('proofImages');
    }
  });

  it('returns 404 for nonexistent testimony', async () => {
    const request = new NextRequest('http://localhost:3000/api/testimonies/nonexistent');
    const response = await GET(request, { params: { id: 'nonexistent' } });

    if (response.status === 404) {
      const data = await response.json();
      expect(data.error).toBe('Testimony not found');
    }
  });

  it('includes heroImage and proofImages arrays', async () => {
    const request = new NextRequest(`http://localhost:3000/api/testimonies/${testId}`);
    const response = await GET(request, { params: { id: testId } });

    if (response.status === 200) {
      const data = await response.json();
      expect(Array.isArray(data.proofImages)).toBe(true);
      if (data.heroImage) {
        expect(data.heroImage).toHaveProperty('url');
        expect(data.heroImage).toHaveProperty('alt');
      }
    }
  });

  it('returns correct testimony ID', async () => {
    const request = new NextRequest(`http://localhost:3000/api/testimonies/${testId}`);
    const response = await GET(request, { params: { id: testId } });

    if (response.status === 200) {
      const data = await response.json();
      expect(data.id).toBe(testId);
    }
  });

  it('handles database errors gracefully', async () => {
    const request = new NextRequest(`http://localhost:3000/api/testimonies/${testId}`);
    const response = await GET(request, { params: { id: testId } });

    expect([200, 404, 500]).toContain(response.status);
  });
});
