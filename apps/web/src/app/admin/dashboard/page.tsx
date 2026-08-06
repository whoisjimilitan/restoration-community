'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const prayerRequests: any[] = [];
  const attendanceStats = { total: 0, attended: 0, pending: 0 };
  const cohortStats = { activeCohorts: 1, totalParticipants: 12, mentorAssignments: 8 };

  useEffect(() => {
    setIsLoaded(true);
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="w-full min-h-screen bg-rc-bg flex items-center justify-center">
        <div className="text-rc-text/60">Loading admin dashboard...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  // Check if user is admin
  if (session?.user?.email !== 'admin@brotherjimi.com' && !session?.user?.email?.includes('@admin')) {
    return (
      <div className="w-full min-h-screen bg-rc-bg flex items-center justify-center">
        <div className="text-rc-text">Access denied. Admin only.</div>
      </div>
    );
  }

  return (
    <div className="bg-rc-bg text-rc-text min-h-screen">
      {/* HEADER */}
      <section className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-b border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl md:text-4xl font-rc-serif font-bold text-white">
              Admin Control Center
            </h1>
            <p className="text-white/70 text-sm mt-2">Prayer queue, attendance, and metrics</p>
          </div>
        </div>
      </section>

      {/* METRICS CARDS */}
      <section className="w-full px-6 sm:px-8 md:px-12 py-12 bg-rc-bg border-b border-rc-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-rc-serif font-bold text-rc-text mb-8">Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Active Cohorts */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-rc-warm-gray border border-rc-border/30"
            >
              <p className="text-sm font-medium text-rc-text/70 uppercase tracking-wide mb-2">Active Cohorts</p>
              <p className="text-4xl font-bold text-rc-accent">{cohortStats.activeCohorts}</p>
              <p className="text-xs text-rc-text/60 mt-2">Cohort 1 running (Aug 8 - Sep 19)</p>
            </motion.div>

            {/* Total Participants */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-rc-warm-gray border border-rc-border/30"
            >
              <p className="text-sm font-medium text-rc-text/70 uppercase tracking-wide mb-2">Participants</p>
              <p className="text-4xl font-bold text-rc-accent">{cohortStats.totalParticipants}</p>
              <p className="text-xs text-rc-text/60 mt-2">Across all cohorts</p>
            </motion.div>

            {/* Mentor Assignments */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-rc-warm-gray border border-rc-border/30"
            >
              <p className="text-sm font-medium text-rc-text/70 uppercase tracking-wide mb-2">Mentor Assignments</p>
              <p className="text-4xl font-bold text-rc-accent">{cohortStats.mentorAssignments}</p>
              <p className="text-xs text-rc-text/60 mt-2">Active mentorships</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRAYER QUEUE */}
      <section className="w-full px-6 sm:px-8 md:px-12 py-12 bg-rc-warm-gray border-b border-rc-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-rc-serif font-bold text-rc-text mb-8">Prayer Queue</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-4"
          >
            {prayerRequests.length === 0 ? (
              <div className="p-8 text-center rounded-lg bg-rc-bg border border-rc-border/30">
                <p className="text-rc-text/60">No prayer requests submitted yet.</p>
              </div>
            ) : (
              prayerRequests.map((request) => (
                <div key={request.id} className="p-4 rounded-lg bg-white border border-rc-border/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-rc-text">{request.participantName}</p>
                      <p className="text-sm text-rc-text/70 mt-1">{request.content}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-rc-accent/10 text-rc-accent">
                      {request.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ATTENDANCE TRACKER */}
      <section className="w-full px-6 sm:px-8 md:px-12 py-12 bg-rc-bg border-b border-rc-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-rc-serif font-bold text-rc-text mb-8">Attendance Status</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-rc-warm-gray border border-rc-border/30">
                <p className="text-sm text-rc-text/70">Total Attendees</p>
                <p className="text-2xl font-bold text-rc-text mt-2">{attendanceStats.total}</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm text-green-700">Attended</p>
                <p className="text-2xl font-bold text-green-700 mt-2">{attendanceStats.attended}</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-yellow-700">Pending</p>
                <p className="text-2xl font-bold text-yellow-700 mt-2">{attendanceStats.pending}</p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-rc-warm-gray border border-rc-border/30">
              <p className="text-sm text-rc-text/70 mb-4">Next Meeting</p>
              <p className="text-lg font-medium text-rc-text">Friday, August 15, 2026 · 7:00 PM</p>
              <p className="text-sm text-rc-text/60 mt-1">Mango Farm, Abokobi - SCOAN Accra, Ghana</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/40 text-xs">Admin Dashboard © 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
