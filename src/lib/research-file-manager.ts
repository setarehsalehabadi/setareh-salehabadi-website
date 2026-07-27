import "server-only";

import fs from "fs";
import path from "path";

import matter from "gray-matter";

const researchDirectory =
  path.join(
    process.cwd(),
    "content/research/fa",
  );

type SaveResearchMarkdownOptions = {
  overwrite?: boolean;
};

function ensureDirectory(): void {
  fs.mkdirSync(
    researchDirectory,
    {
      recursive: true,
    },
  );
}

function createSlug(
  value: string,
): string {
  return value
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase()
    .replace(
      /['’"`]/g,
      "",
    )
    .replace(
      /[^\p{L}\p{N}]+/gu,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function normalizeRequiredText(
  value: unknown,
  fieldName: string,
): string {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    throw new Error(
      `Missing required research frontmatter field: ${fieldName}`,
    );
  }

  return value.trim();
}

function validateMarkdown(
  slug: string,
  markdown: string,
): void {
  if (
    typeof markdown !== "string" ||
    !markdown.trim()
  ) {
    throw new Error(
      "Research Markdown content is empty.",
    );
  }

  let parsedFile: ReturnType<
    typeof matter
  >;

  try {
    parsedFile =
      matter(markdown);
  } catch (error) {
    throw new Error(
      "Research Markdown contains invalid frontmatter.",
      {
        cause: error,
      },
    );
  }

  normalizeRequiredText(
    parsedFile.data.title,
    "title",
  );

  normalizeRequiredText(
    parsedFile.data.research_id,
    "research_id",
  );

  normalizeRequiredText(
    parsedFile.data.category,
    "category",
  );

  normalizeRequiredText(
    parsedFile.data.status,
    "status",
  );

  const frontmatterSlug =
    normalizeRequiredText(
      parsedFile.data.slug,
      "slug",
    );

  const normalizedFrontmatterSlug =
    createSlug(
      frontmatterSlug,
    );

  if (
    normalizedFrontmatterSlug !==
    slug
  ) {
    throw new Error(
      `Research slug mismatch: filename slug is "${slug}" but frontmatter slug is "${normalizedFrontmatterSlug}".`,
    );
  }

  if (
    !parsedFile.content.trim()
  ) {
    throw new Error(
      "Research Markdown body is empty.",
    );
  }
}

function getMarkdownFiles(): string[] {
  ensureDirectory();

  return fs
    .readdirSync(
      researchDirectory,
      {
        withFileTypes: true,
      },
    )
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name
          .toLocaleLowerCase()
          .endsWith(".md"),
    )
    .map(
      (entry) =>
        entry.name,
    );
}

function getFileSlug(
  fileName: string,
): string {
  return fileName.replace(
    /\.md$/i,
    "",
  );
}

function readStoredSlug(
  fileName: string,
): string {
  const filePath =
    path.join(
      researchDirectory,
      fileName,
    );

  const fileContent =
    fs.readFileSync(
      filePath,
      "utf8",
    );

  try {
    const parsedFile =
      matter(fileContent);

    const frontmatterSlug =
      typeof parsedFile.data.slug ===
        "string"
        ? parsedFile.data.slug
        : getFileSlug(
            fileName,
          );

    return createSlug(
      frontmatterSlug,
    );
  } catch (error) {
    throw new Error(
      `Unable to read research file while checking duplicate slugs: ${fileName}`,
      {
        cause: error,
      },
    );
  }
}

function assertUniqueSlug(
  slug: string,
  targetFileName: string,
): void {
  const markdownFiles =
    getMarkdownFiles();

  for (
    const fileName of markdownFiles
  ) {
    if (
      fileName ===
      targetFileName
    ) {
      continue;
    }

    const storedSlug =
      readStoredSlug(
        fileName,
      );

    if (
      storedSlug ===
      slug
    ) {
      throw new Error(
        `Duplicate research slug "${slug}" found in "${fileName}".`,
      );
    }
  }
}

function writeFileSafely(
  filePath: string,
  markdown: string,
  overwrite: boolean,
): void {
  const fileExists =
    fs.existsSync(
      filePath,
    );

  if (
    fileExists &&
    !overwrite
  ) {
    throw new Error(
      `Research file already exists: ${path.basename(
        filePath,
      )}`,
    );
  }

  const temporaryFilePath =
    `${filePath}.${process.pid}.${Date.now()}.tmp`;

  const backupFilePath =
    `${filePath}.${process.pid}.${Date.now()}.backup`;

  fs.writeFileSync(
    temporaryFilePath,
    markdown,
    "utf8",
  );

  try {
    if (
      fileExists &&
      overwrite
    ) {
      fs.renameSync(
        filePath,
        backupFilePath,
      );
    }

    fs.renameSync(
      temporaryFilePath,
      filePath,
    );

    if (
      fs.existsSync(
        backupFilePath,
      )
    ) {
      fs.unlinkSync(
        backupFilePath,
      );
    }
  } catch (error) {
    if (
      fs.existsSync(
        temporaryFilePath,
      )
    ) {
      fs.unlinkSync(
        temporaryFilePath,
      );
    }

    if (
      fs.existsSync(
        backupFilePath,
      ) &&
      !fs.existsSync(
        filePath,
      )
    ) {
      fs.renameSync(
        backupFilePath,
        filePath,
      );
    }

    throw new Error(
      `Unable to save research file: ${path.basename(
        filePath,
      )}`,
      {
        cause: error,
      },
    );
  }
}

export function saveResearchMarkdown(
  slug: string,
  markdown: string,
  options: SaveResearchMarkdownOptions = {},
): string {
  ensureDirectory();

  const normalizedSlug =
    createSlug(
      slug,
    );

  if (!normalizedSlug) {
    throw new Error(
      "A valid research slug is required.",
    );
  }

  validateMarkdown(
    normalizedSlug,
    markdown,
  );

  const fileName =
    `${normalizedSlug}.md`;

  assertUniqueSlug(
    normalizedSlug,
    fileName,
  );

  const filePath =
    path.join(
      researchDirectory,
      fileName,
    );

  writeFileSafely(
    filePath,
    markdown.trimEnd().concat("\n"),
    options.overwrite === true,
  );

  return filePath;
}