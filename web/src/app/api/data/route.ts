import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Record = {
  date: Date
  link: string
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const dateParam = searchParams.get('date') // e.g. "2025-07-01"

  if (!dateParam) {
    return NextResponse.json(
      { error: 'Missing "date" query parameter' },
      { status: 400 }
    )
  }

  const targetDate = new Date(dateParam)
  const year = targetDate.getFullYear()
  const month = targetDate.getMonth() + 1 // getMonth is zero-based

  // 👇 Use raw SQL filter via `.filter()` or `.or()` or `.gte/.lt`
  const from = `${year}-${String(month).padStart(2, '0')}-01`
  const to = new Date(year, month, 1) // 1st of next month
  const toStr = to.toISOString().split('T')[0] // format YYYY-MM-DD

  const { data, error } = await supabase
    .from('clues_by_sam_links')
    .select('date, link')
    .gte('date', from)
    .lt('date', toStr)
    .order('date', { ascending: false })

  if (error || !data) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }

  const records: Record[] = data.map((item: Record) => ({
    date: new Date(item.date),
    link: item.link,
  }))

  return NextResponse.json(records)
}
