import type { MarkdownFileType } from './File';

export interface ReviewFrontmatter {
  title: string;
  description: string;
  author: {
    name: string;
    url: string;
    imageUrl: string;
  };
  canonicalUrl?: string;
  seo: {
    title: string;
    description: string;
  };
  isNew: boolean;
  type: 'visual' | 'textual';
  date: string;
  sitemap: {
    priority: number;
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yealry';
  };
  tags: string[];
}

export type ReviewFileType = MarkdownFileType<ReviewFrontmatter> & {
  id: string;
};

/**
 * Generates id from the given review file
 * @param filePath Markdown file path
 *
 * @returns unique review identifier
 */
function reviewPathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';

  return fileName.replace('.md', '');
}

/**
 * Gets all the reviews sorted by the publishing date
 * @returns Promisifed review files
 */
export async function getAllReviews(): Promise<ReviewFileType[]> {
  const reviews = await import.meta.glob<ReviewFileType>(
    '/src/data/reviews/*.md',
    {
      eager: true,
    }
  );

  const reviewFiles = Object.values(reviews);
  const enrichedReviews = reviewFiles.map((reviewFile) => ({
    ...reviewFile,
    id: reviewPathToId(reviewFile.file),
  }));

  return enrichedReviews.sort(
    (a, b) =>
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
  );
}
