export function getFileIndex (files, fileId) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file.id === fileId) return i
  }
}

export function getFile (files, fileId) {
  return files[getFileIndex(fileId)]
}
