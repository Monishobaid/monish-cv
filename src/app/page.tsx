import { Shell } from "@/components/Shell";
import { HomeView } from "@/components/views/HomeView";
import { WorkView } from "@/components/views/WorkView";
import { AboutView } from "@/components/views/AboutView";
import { ResumeView } from "@/components/views/ResumeView";
import { ReadingView } from "@/components/views/ReadingView";
import {
  getGoodreadsCurrentlyReading,
  getGoodreadsReadBooks,
  getLeetCodeStats,
  getGitHubContributions,
  leetcodeCalendarToDays,
} from "@/lib/api";

export const revalidate = 3600;

export default async function Home() {
  const [currentlyReading, readBooks, leetcode, github] = await Promise.all([
    getGoodreadsCurrentlyReading(),
    getGoodreadsReadBooks(),
    getLeetCodeStats(),
    getGitHubContributions(),
  ]);
  const leetDays = leetcodeCalendarToDays(leetcode?.userCalendar?.submissionCalendar);
  const books = [...currentlyReading, ...readBooks];

  return (
    <Shell
      views={{
        home: <HomeView github={github} leetcode={leetDays} />,
        work: <WorkView github={github} leetcode={leetDays} />,
        about: <AboutView github={github} leetcode={leetDays} books={books} />,
        resume: <ResumeView github={github} leetcode={leetDays} />,
        reading: <ReadingView currentlyReading={currentlyReading} readBooks={readBooks} github={github} leetcode={leetDays} />,
      }}
    />
  );
}
