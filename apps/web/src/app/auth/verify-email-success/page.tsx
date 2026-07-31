'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout, PageHeader, Section, Card, CardContent, Button } from '@/components/ui';

export default function VerifyEmailSuccessPage() {
  return (
    <PageLayout className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <Section className="w-full max-w-md mb-0">
          <PageHeader
            title="Verified"
            description="Ready to begin"
          />

          <Card>
            <CardContent>
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-4xl mb-2">✓</div>
                <p className="text-gray-700">
                  Email verified successfully.
                </p>
              </div>

              <Link href="/auth/signin" className="block">
                <Button className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        </Section>
      </motion.div>
    </PageLayout>
  );
}
