import type {UploadedFile} from './UploadedFileList.type'

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg|bmp)(\?|#|$)/i
const ANY_EXT = /\.[a-z0-9]{1,5}(\?|#|$)/i

export function isImageFile(file: UploadedFile): boolean {
  if (file.type) return file.type.startsWith('image/')
  if (file.thumbnailUrl) return true
  if (!file.url) return false
  if (IMAGE_EXT.test(file.url) || file.url.startsWith('data:image/')) return true
  return !ANY_EXT.test(file.url)
}

export function thumbnailOf(file: UploadedFile): string | undefined {
  if (file.thumbnailUrl) return file.thumbnailUrl
  return file.url && isImageFile(file) ? file.url : undefined
}
