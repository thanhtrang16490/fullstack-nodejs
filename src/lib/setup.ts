import type { MarkdownFileType } from "./File";

export interface SetupFrontmatter {
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
  type: "visual" | "textual";
  date: string;
  sitemap: {
    priority: number;
    changefreq: "daily" | "weekly" | "monthly" | "yealry";
  };
  tags: string[];
}

export type SetupFileType = MarkdownFileType<SetupFrontmatter> & {
  id: string;
};

/**
 * Generates id from the given setup file
 * @param filePath Markdown file path
 *
 * @returns unique setup identifier
 */
function setupPathToId(filePath: string): string {
  const fileName = filePath.split("/").pop() || "";

  return fileName.replace(".md", "");
}

/**
 * Gets all the setups sorted by the publishing date
 * @returns Promisifed setup files
 */
export async function getAllSetups(): Promise<SetupFileType[]> {
  const setups = await import.meta.glob<SetupFileType>(
    "/src/data/setups/*.md",
    {
      eager: true,
    }
  );

  const setupFiles = Object.values(setups);
  const enrichedsetups = setupFiles.map((setupFile) => ({
    ...setupFile,
    id: setupPathToId(setupFile.file),
  }));

  return enrichedsetups.sort(
    (a, b) =>
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
  );
}
