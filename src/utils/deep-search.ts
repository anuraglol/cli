import { readdir } from "node:fs/promises";

export const deepReadDir = async (directory: string, separator: string) =>
  await Promise.all(
    (
      await readdir(directory, { withFileTypes: true })
    ).map(async (dirent) => {
      const path = directory + separator + dirent.name;
      return dirent.isDirectory() ? await deepReadDir(path, separator) : path;
    })
  );
