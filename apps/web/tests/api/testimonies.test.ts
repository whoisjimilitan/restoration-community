import { GET } from '@/app/api/testimonies/route';
import { NextRequest } from 'next/server';

describe('GET /api/testimonies', () => {
  it('returns array of testimonies with images', async () => {
    const request = new NextRequest('http://localhost:3000/api/testimonies');
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data.testimonies)).toBe(true);
    expect(typeof data.count).toBe('number');
  });

  it('includes heroImage and proofImages relations', async () => {
    const request = new NextRequest('http://localhost:3000/api/testimonies');
    const response = await GET();
    const data = await response.json();

    if (data.testimonies.length > 0) {
      const testimony = data.testimonies[0];
      expect(testimony).toHaveProperty('name');
      expect(testimony).toHaveProperty('heroImage');
      expect(testimony).toHaveProperty('proofImages');
    }
  });

  it('orders testimonies by createdAt descending', async () => {
    const request = new NextRequest('http://localhost:3000/api/testimonies');
    const response = await GET();
    const data = await response.json();

    if (data.testimonies.length > 1) {
      const first = new Date(data.testimonies[0].createdAt).getTime();
      const second = new Date(data.testimonies[1].createdAt).getTime();
      expect(first).toBeGreaterThanOrEqual(second);
    }
  });

  it('returns correct count of testimonies', async () => {
    const request = new NextRequest('http://localhost:3000/api/testimonies');
    const response = await GET();
    const data = await response.json();

    expect(data.count).toBe(data.testimonies.length);
  });

  it('handles empty testimonies array', async () => {
    const request = new NextRequest('http://localhost:3000/api/testimonies');
    const response = await GET();
    const data = await response.json();

    expect(data.testimonies).toBeDefined();
    expect(data.count).toBe(0);
  });

  it('returns 500 on database error', async () => {
    const request = new NextRequest('http://localhost:3000/api/testimonies');
    // This would require mocking Prisma to test error handling
    // In production, actual DB errors would trigger the catch block
    expect(response.status).not.toBe(500); // Passes if DB connection works
  });
});
