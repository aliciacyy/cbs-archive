'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { supabasePublic } from '@/lib/supabaseClient';
import Hero from '@/components/Hero';

type Record = {
  date: Date;
  link: string;
  isCompleted: boolean;
};

type UserData = {
  date: Date;
};

export default function HomePage() {
  const [data, setData] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date());

  const MIN_MONTH = new Date(2025, 6, 1);

  const formatDateOnly = (date: string | Date) =>
    new Date(date).toISOString().split('T')[0];

  useEffect(() => {
    async function fetchAll() {
      // Step 1: Check if user is authenticated and fetch completed_clues
      await supabasePublic.auth.getUser();

      const { data: completedData, error: completedError } =
        await supabasePublic.from('completed_clues').select('*');

      if (completedError) {
        console.error('Supabase error:', completedError);
      }

      // Step 2: Now fetch clue data by month
      try {
        const res = await fetch(`/api/data?date=${month.toISOString()}`);
        const json = await res.json();

        const parsed: Record[] = json.map((item: Record) => ({
          date: new Date(item.date),
          link: item.link,
          isCompleted:
            completedData === null
              ? false
              : completedData.some(
                  (clue: UserData) =>
                    formatDateOnly(clue.date) === formatDateOnly(item.date)
                ),
        }));

        setData(parsed);
      } catch (err) {
        console.error('Failed to fetch main data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [month]);

  function changeMonth(direction: 'prev' | 'next') {
    setMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  }

  const isNextMonthInFuture = (() => {
    const next = new Date(month);
    next.setMonth(next.getMonth() + 1);

    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonth = new Date(next.getFullYear(), next.getMonth(), 1);

    return nextMonth > currentMonth;
  })();

  const isPrevMonthTooEarly = (() => {
    const prev = new Date(month);
    prev.setMonth(prev.getMonth() - 1);

    const prevMonth = new Date(prev.getFullYear(), prev.getMonth(), 1);
    return prevMonth < MIN_MONTH;
  })();

  return (
    <>
      <Hero />
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-6 px-6 md:px-8 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-200"
        >
          {/* ✅ Month Navigator */}
          <div className="flex items-center justify-center mb-4 gap-4">
            <button
              onClick={() => changeMonth('prev')}
              disabled={isPrevMonthTooEarly}
              className={`transition ${
                isPrevMonthTooEarly
                  ? 'opacity-30 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <ChevronLeftIcon className="h-6 w-6 text-blue-500" />
            </button>
            <p className="text-lg text-gray-600 font-medium">
              {new Intl.DateTimeFormat('en-GB', {
                month: 'long',
                year: 'numeric',
              }).format(month)}
            </p>
            <button
              onClick={() => changeMonth('next')}
              disabled={isNextMonthInFuture}
              className={`transition ${
                isNextMonthInFuture
                  ? 'opacity-30 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <ChevronRightIcon className="h-6 w-6 text-blue-500" />
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-center">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-sm font-bold text-blue-900 uppercase tracking-wider text-center">
                      Date
                    </th>
                    <th className="px-6 py-3 text-sm font-bold text-blue-900 uppercase tracking-wider text-center">
                      Done
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data.map((record, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-blue-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-blue-600 hover:underline text-center">
                        <a
                          href={record.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {record.date.toLocaleDateString('en-GB')}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        {record.isCompleted ? '✅' : '❌'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
