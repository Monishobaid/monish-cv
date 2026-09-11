import Parser from 'rss-parser';

export const revalidate = 3600;

// --------------- GOODREADS ---------------
type GoodreadsItem = {
  title: string;
  link: string;
  book_large_image_url: string;
  book_medium_image_url: string;
  book_small_image_url: string;
  author_name: string;
  average_rating: string;
  book_published: string;
  user_rating: string;
};

export async function getGoodreadsCurrentlyReading() {
  const parser = new Parser<object, GoodreadsItem>({
    customFields: {
      item: [
        'book_large_image_url',
        'book_medium_image_url',
        'book_small_image_url',
        'author_name',
        'average_rating',
        'book_published',
        'user_rating',
      ],
    },
  });
  try {
    const feed = await parser.parseURL(
      'https://www.goodreads.com/review/list_rss/199476200-monish-obaid?shelf=currently-reading'
    );
    return feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      cover: item.book_large_image_url || item.book_medium_image_url || item.book_small_image_url || null,
      author: item.author_name,
      rating: item.user_rating,
      avgRating: item.average_rating,
      published: item.book_published,
    }));
  } catch (error) {
    console.error('Error fetching Goodreads:', error);
    return [];
  }
}

// Also fetch "read" shelf for all books
export async function getGoodreadsReadBooks() {
  const parser = new Parser<object, GoodreadsItem>({
    customFields: {
      item: ['book_large_image_url', 'book_medium_image_url', 'book_small_image_url', 'author_name', 'user_rating'],
    },
  });
  try {
    const feed = await parser.parseURL(
      'https://www.goodreads.com/review/list_rss/199476200-monish-obaid?shelf=read'
    );
    return feed.items.slice(0, 12).map((item) => ({
      title: item.title,
      link: item.link,
      cover: item.book_large_image_url || item.book_medium_image_url || item.book_small_image_url || null,
      author: item.author_name,
      rating: item.user_rating,
    }));
  } catch (error) {
    console.error('Error fetching Goodreads read shelf:', error);
    return [];
  }
}

// --------------- LETTERBOXD ---------------
type LetterboxdItem = {
  title: string;
  link: string;
  description: string;
  [key: string]: string | undefined;
};

export async function getLetterboxdMovies() {
  const parser = new Parser<object, LetterboxdItem>({
    customFields: {
      item: [
        'description',
        'letterboxd:filmTitle',
        'letterboxd:memberRating',
        'tmdb:movieId',
      ],
    },
  });
  try {
    const feed = await parser.parseURL('https://letterboxd.com/monishobaid/rss/');
    return feed.items.map((item) => {
      const imgMatch = item.description?.match(/<img[^>]+src="([^"]+)"/);
      const poster = imgMatch ? imgMatch[1] : null;
      const filmTitle = item['letterboxd:filmTitle'];
      const memberRating = item['letterboxd:memberRating'];
      return {
        title: filmTitle || item.title,
        link: item.link,
        poster,
        rating: memberRating,
      };
    });
  } catch (error) {
    console.error('Error fetching Letterboxd:', error);
    return [];
  }
}

// --------------- LEETCODE ---------------
export async function getLeetCodeStats() {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({
        query: `query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats: submitStatsGlobal { acSubmissionNum { difficulty count } }
            userCalendar { submissionCalendar }
          }
        }`,
        variables: { username: 'monishobaid' },
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.matchedUser || null;
  } catch (error) {
    console.error('Error fetching LeetCode:', error);
    return null;
  }
}

// --------------- GITHUB ---------------
export async function getGitHubStats() {
  try {
    const res = await fetch('https://api.github.com/users/Monishobaid', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching GitHub:', error);
    return null;
  }
}

// --------------- GITHUB CONTRIBUTIONS (per day) ---------------
export type Day = { date: string; count: number; level: number };

export async function getGitHubContributions(username = 'Monishobaid'): Promise<Day[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.contributions ?? []) as Day[];
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return [];
  }
}

/** Turn LeetCode's { unixTs: count } calendar into per-day rows. */
export function leetcodeCalendarToDays(calendarStr?: string): Day[] {
  if (!calendarStr) return [];
  try {
    const parsed: Record<string, number> = JSON.parse(calendarStr);
    return Object.keys(parsed)
      .map((ts) => {
        const d = new Date(parseInt(ts, 10) * 1000);
        const count = parsed[ts];
        return {
          date: d.toISOString().slice(0, 10),
          count,
          level: count === 0 ? 0 : Math.min(Math.ceil(count / 2), 4),
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}
