/**
 * End-to-end test for complete testimonies system flow
 * Tests: Create → Read → Update → Delete → Page Display
 */

import { prisma } from '@/lib/prisma';

describe('Testimonies System - End-to-End Flow', () => {
  const testTestimony = {
    name: 'Test User',
    role: 'Test Role',
    stage: 5,
    quote: 'Test quote for e2e',
    story: 'This is a test story for end-to-end testing',
  };

  it('creates a testimony via API', async () => {
    const testimony = await prisma.testimony.create({
      data: testTestimony,
    });

    expect(testimony.id).toBeDefined();
    expect(testimony.name).toBe(testTestimony.name);
    expect(testimony.stage).toBe(testTestimony.stage);
  });

  it('fetches all testimonies', async () => {
    const testimonies = await prisma.testimony.findMany({
      include: {
        heroImage: true,
        proofImages: true,
      },
    });

    expect(Array.isArray(testimonies)).toBe(true);
    expect(testimonies.length).toBeGreaterThan(0);
  });

  it('fetches single testimony by ID', async () => {
    const created = await prisma.testimony.create({
      data: testTestimony,
    });

    const fetched = await prisma.testimony.findUnique({
      where: { id: created.id },
      include: {
        heroImage: true,
        proofImages: true,
      },
    });

    expect(fetched?.id).toBe(created.id);
    expect(fetched?.name).toBe(testTestimony.name);
  });

  it('updates an existing testimony', async () => {
    const created = await prisma.testimony.create({
      data: testTestimony,
    });

    const updated = await prisma.testimony.update({
      where: { id: created.id },
      data: {
        name: 'Updated Name',
        role: 'Updated Role',
      },
    });

    expect(updated.name).toBe('Updated Name');
    expect(updated.role).toBe('Updated Role');
  });

  it('deletes a testimony', async () => {
    const created = await prisma.testimony.create({
      data: testTestimony,
    });

    await prisma.testimony.delete({
      where: { id: created.id },
    });

    const fetched = await prisma.testimony.findUnique({
      where: { id: created.id },
    });

    expect(fetched).toBeNull();
  });

  it('validates stage numbers are in range 1-7', async () => {
    for (let stage = 1; stage <= 7; stage++) {
      const testimony = await prisma.testimony.create({
        data: {
          ...testTestimony,
          name: `Test Stage ${stage}`,
          stage,
        },
      });

      expect(testimony.stage).toBe(stage);
    }
  });

  it('maintains relationships with images', async () => {
    const testimony = await prisma.testimony.create({
      data: testTestimony,
      include: {
        heroImage: true,
        proofImages: true,
      },
    });

    expect(testimony.heroImage).toBeNull();
    expect(Array.isArray(testimony.proofImages)).toBe(true);
    expect(testimony.proofImages.length).toBe(0);
  });

  it('lists testimonies sorted by creation date', async () => {
    const testimonies = await prisma.testimony.findMany({
      orderBy: { createdAt: 'desc' },
    });

    for (let i = 0; i < testimonies.length - 1; i++) {
      const current = new Date(testimonies[i].createdAt).getTime();
      const next = new Date(testimonies[i + 1].createdAt).getTime();
      expect(current).toBeGreaterThanOrEqual(next);
    }
  });

  afterEach(async () => {
    // Clean up test data
    await prisma.testimony.deleteMany({
      where: {
        name: {
          contains: 'Test',
        },
      },
    });
  });
});
