/** @format */

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

export const deleteImage = (oldImage: string) => {
  const currentFileURL = import.meta.url;
  const currentFilePath = fileURLToPath(currentFileURL);
  const currentDir = dirname(currentFilePath);

  const imagePath = path.join(currentDir, '..', 'public', oldImage);
  fs.unlinkSync(imagePath);
};
