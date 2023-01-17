import { readdir } from "node:fs/promises";

export const deepReadDir = async (directory: string) =>
  await Promise.all(
    (
      await readdir(directory, { withFileTypes: true })
    ).map(async (dirent) => {
      const path = directory + "/" + dirent.name.replace(/\\/g, "/");
      return dirent.isDirectory() ? await deepReadDir(path) : path;
    })
  );
