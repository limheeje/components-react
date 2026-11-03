import {useRef, useState} from 'react'

import {UPLOADED_FILE_STATUS} from '~/components/UploadedFileList'
import type {UploadedFile} from '~/components/UploadedFileList'

/** 데모용 가짜 서버 업로드. 파일명에 fail이 포함되면 실패한다. */
export const fakeUpload = (file: File) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (file.name.toLowerCase().includes('fail')) reject(new Error('서버 오류 (500)'))
      else resolve(URL.createObjectURL(file))
    }, 1200)
  })

/** 선택 File[]을 업로드하고 서버 응답 URL을 제어형 목록에 반영하는 데모 훅 */
export function useServerUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [rejectLog, setRejectLog] = useState('')
  const sequence = useRef(0)

  const patch = (id: string, next: Partial<UploadedFile>) =>
    setFiles((current) => current.map((file) => (file.id === id ? {...file, ...next} : file)))

  const onPicked = async (picked: File[]) => {
    await Promise.all(
      picked.map(async (file) => {
        const id = `up-${++sequence.current}`
        setFiles((current) => [
          ...current,
          {
            id,
            name: file.name,
            size: file.size,
            type: file.type,
            status: UPLOADED_FILE_STATUS.UPLOADING
          }
        ])
        try {
          const url = await fakeUpload(file)
          patch(id, {url, status: UPLOADED_FILE_STATUS.DONE})
        } catch (error) {
          patch(id, {
            status: UPLOADED_FILE_STATUS.ERROR,
            errorMessage: error instanceof Error ? error.message : '업로드 실패'
          })
        }
      })
    )
  }

  const onReject = (items: Array<{file: File; message: string}>) =>
    setRejectLog(items.map(({file, message}) => `${file.name}: ${message}`).join(' / '))

  return {files, setFiles, rejectLog, onPicked, onReject}
}

const swatch = (color: string, text: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320"><rect width="320" height="320" fill="${color}"/><text x="160" y="180" font-size="72" text-anchor="middle" fill="#fff">${text}</text></svg>`
  )}`

export const savedSample = (): UploadedFile[] => [
  {name: 'banner.png', url: swatch('#f97316', 'A'), size: 183_000},
  {name: 'logo.png', url: swatch('#3b82f6', 'B'), size: 52_300}
]
