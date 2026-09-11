import { NextResponse } from 'next/server';

const TMDB_BASE = 'https://image.tmdb.org/t/p/w342';

// Scrape Letterboxd films page for a given user
async function scrapeLetterboxd(username: string, page = 1) {
  const url = `https://letterboxd.com/${username}/films/by/date/page/${page}/`;
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Accept: 'text/html',
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return { films: [], totalPages: 1 };
  const html = await res.text();

  // Extract films from the grid HTML
  const filmRegex =
    /<li[^>]*\bfilm-detail\b[^>]*>[\s\S]*?<\/li>|<div[^>]*data-film-slug="([^"]+)"[^>]*data-film-name="([^"]+)"[^>]*(?:data-film-release-year="([^"]*)")?[^>]*>/g;

  // Use a more reliable selector based on how LB builds the grid
  const films: { slug: string; title: string; year: string; poster: string; rating: string; link: string }[] = [];

  // Match film poster list items
  const itemRegex =
    /<li[^>]+class="[^"]*poster-container[^"]*"[^>]*>[\s\S]*?data-film-slug="([^"]+)"[^>]*>[\s\S]*?data-original-title="([^"]*)"[\s\S]*?<\/li>/g;

  // Simpler: match all data-film-slug attributes
  const slugRegex = /data-film-slug="([^"]+)"/g;
  const nameRegex = /data-film-name="([^"]+)"/g;
  const yearRegex = /data-film-release-year="([^"]+)"/g;
  const ratingRegex = /rated-(\d+)/g;

  const slugs: string[] = [];
  const names: string[] = [];
  const years: string[] = [];
  const ratings: string[] = [];

  let m;
  while ((m = slugRegex.exec(html)) !== null) slugs.push(m[1]);
  while ((m = nameRegex.exec(html)) !== null) names.push(m[1]);
  while ((m = yearRegex.exec(html)) !== null) years.push(m[1]);
  while ((m = ratingRegex.exec(html)) !== null) ratings.push(m[1]);

  for (let i = 0; i < slugs.length; i++) {
    // Build TMDB-like poster from slug (we'll fetch posters separately)
    films.push({
      slug: slugs[i],
      title: names[i] || slugs[i].replace(/-/g, ' '),
      year: years[i] || '',
      poster: '', // will be filled by TMDB
      rating: ratings[i] || '',
      link: `https://letterboxd.com/film/${slugs[i]}/`,
    });
  }

  // Get total pages from pagination
  const totalPagesMatch = html.match(/data-paginate-pages="(\d+)"/);
  const totalPages = totalPagesMatch ? parseInt(totalPagesMatch[1]) : 1;

  return { films: films.slice(0, 24), totalPages };
}

// Fetch TMDB poster for a film
async function getTMDBPoster(title: string, year: string): Promise<string | null> {
  const TMDB_KEY = process.env.TMDB_API_KEY;
  if (!TMDB_KEY) return null;
  const query = encodeURIComponent(title);
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&year=${year}&api_key=${TMDB_KEY}`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return null;
  const json = await res.json();
  const result = json.results?.[0];
  if (!result?.poster_path) return null;
  return `${TMDB_BASE}${result.poster_path}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const { films, totalPages } = await scrapeLetterboxd('monishobaid', page);

  // Enrich with posters (batch, limit concurrency)
  const enriched = await Promise.all(
    films.map(async (f) => {
      const poster = await getTMDBPoster(f.title, f.year);
      return { ...f, poster };
    })
  );

  return NextResponse.json({ films: enriched, totalPages, page });
}
