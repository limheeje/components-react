import {useState} from 'react'

import FileUpload, {FILE_UPLOAD_LIST_TYPE} from '~/components/FileUpload'
import UploadedFileList from '~/components/UploadedFileList'
import type {UploadedFile} from '~/components/UploadedFileList'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'
import {savedSample, useServerUpload} from '~/demo/serverUploadDemo'

const TABS = ['button', 'drag', 'accept', 'multiple', 'maxSize', 'maxCount', 'disabled', 'listType', 'serverUpload']

const MB = 1024 * 1024

function ServerFilesDemo() {
  const {files, setFiles, rejectLog, onPicked, onReject} = useServerUpload()
  return (
    <div className="demo-col" style={{width: 420, maxWidth: '100%'}}>
      <FileUpload multiple accept="image/*" showList={false} onChange={onPicked} onReject={onReject} />
      <UploadedFileList value={files} onChange={setFiles} />
      {rejectLog && <span className="demo-hint">제외됨: {rejectLog}</span>}
    </div>
  )
}

function SavedFilesDemo() {
  const [files, setFiles] = useState<UploadedFile[]>(savedSample)
  return <UploadedFileList value={files} onChange={setFiles} />
}

export function FileUploadPage() {
  return (
    <>
      <PageHeader
        title="FileUpload"
        component="FileUpload"
        desc="— 파일을 선택하거나 드래그 & 드롭으로 업로드하는 컴포넌트. 확장자·크기·개수 제한을 지원합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'button' && (
              <ComponentSection
                title="Button 모드 — 버튼 클릭으로 파일 선택"
                preview={<FileUpload multiple maxCount={5} />}
                code={[
                  "import FileUpload from 'm2m-uiux-react/FileUpload'",
                  '',
                  'export function Example() {',
                  '  return <FileUpload multiple maxCount={5} onChange={(files) => console.log(files)} />',
                  '}'
                ]}
                notes={['파일 선택 후 목록이 표시됩니다', '유효 파일은 onChange 로 전달']}
              />
            )}

            {tab === 'serverUpload' && (
              <>
                <ComponentSection
                  title="serverUpload callback — 파일 선택 후 서버에 올리고, 받은 url로 썸네일 표시"
                  preview={<ServerFilesDemo />}
                  code={[
                    "import {useState} from 'react'",
                    "import FileUpload from 'm2m-uiux-react/FileUpload'",
                    "import UploadedFileList, {UPLOADED_FILE_STATUS} from 'm2m-uiux-react/UploadedFileList'",
                    "import type {UploadedFile} from 'm2m-uiux-react/UploadedFileList'",
                    '',
                    'export function Example() {',
                    '  const [files, setFiles] = useState<UploadedFile[]>([])',
                    '  async function onPicked(picked: File[]) {',
                    '    await Promise.all(picked.map(async (file) => {',
                    '      const id = crypto.randomUUID()',
                    '      setFiles((current) => [...current, {',
                    '        id, name: file.name, size: file.size, type: file.type, status: UPLOADED_FILE_STATUS.UPLOADING',
                    '      }])',
                    '      try {',
                    '        const body = new FormData()',
                    "        body.append('file', file)",
                    "        const {url} = await (await fetch('/api/upload', {method: 'POST', body})).json()",
                    '        setFiles((current) => current.map((item) =>',
                    '          item.id === id ? {...item, url, status: UPLOADED_FILE_STATUS.DONE} : item',
                    '        ))',
                    '      } catch {',
                    '        setFiles((current) => current.map((item) =>',
                    "          item.id === id ? {...item, status: UPLOADED_FILE_STATUS.ERROR, errorMessage: '업로드 실패'} : item",
                    '        ))',
                    '      }',
                    '    }))',
                    '  }',
                    '  return <>',
                    '    <FileUpload multiple accept="image/*" showList={false} onChange={onPicked} />',
                    '    <UploadedFileList value={files} onChange={setFiles} />',
                    '  </>',
                    '}'
                  ]}
                  notes={[
                    '선택 즉시 status=uploading 항목 추가 → 완료 후 url + status=done으로 변경',
                    '파일명에 fail을 포함하면 데모 업로드가 실패하며 error 상태로 표시됩니다',
                    '크기·개수 제한 파일은 onReject로 전달되고, 삭제 시 서버 삭제 API를 호출할 수 있습니다'
                  ]}
                />
                <ComponentSection
                  title="이미 서버에 있는 파일 — url(정적 경로)만 넘기면 썸네일 표시"
                  preview={<SavedFilesDemo />}
                  code={[
                    "import {useState} from 'react'",
                    "import UploadedFileList from 'm2m-uiux-react/UploadedFileList'",
                    "import type {UploadedFile} from 'm2m-uiux-react/UploadedFileList'",
                    '',
                    'const savedFiles: UploadedFile[] = [',
                    "  {name: 'banner.png', url: 'https://cdn.example.com/files/banner.png', size: 183000}",
                    ']',
                    '',
                    'export function Example() {',
                    '  const [files, setFiles] = useState(savedFiles)',
                    '  return <UploadedFileList value={files} onChange={setFiles} />',
                    '}'
                  ]}
                  notes={['이미지가 아니거나 서버 이미지 로딩에 실패하면 파일 아이콘으로 대체합니다']}
                />
              </>
            )}

            {tab === 'drag' && (
              <ComponentSection
                title="Drag & Drop 모드 — drag={true}"
                preview={<FileUpload drag multiple maxSize={10 * MB} />}
                code={[
                  "import FileUpload from 'm2m-uiux-react/FileUpload'",
                  '',
                  'export function Example() {',
                  '  return <FileUpload drag multiple maxSize={10 * 1024 * 1024} />',
                  '}'
                ]}
                notes={['드래그 시 영역 색이 변합니다', '클릭으로도 파일 선택 가능']}
              />
            )}

            {tab === 'accept' && (
              <>
                <ComponentSection
                  title='accept="image/*" — 이미지만 (listType="picture")'
                  preview={<FileUpload accept="image/*" multiple listType={FILE_UPLOAD_LIST_TYPE['PICTURE']} />}
                  code={[
                    "import FileUpload, {FILE_UPLOAD_LIST_TYPE} from 'm2m-uiux-react/FileUpload'",
                    '',
                    'export function Example() {',
                    '  return <FileUpload accept="image/*" multiple listType={FILE_UPLOAD_LIST_TYPE[\'PICTURE\']} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title='accept=".pdf,.doc,.docx" — 문서만'
                  preview={<FileUpload accept=".pdf,.doc,.docx" multiple />}
                  code={[
                    "import FileUpload from 'm2m-uiux-react/FileUpload'",
                    '',
                    'export function Example() {',
                    '  return <FileUpload accept=".pdf,.doc,.docx" multiple />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'multiple' && (
              <>
                <ComponentSection
                  title="multiple={true} — 여러 파일 선택"
                  preview={<FileUpload multiple maxCount={5} />}
                  code={[
                    "import FileUpload from 'm2m-uiux-react/FileUpload'",
                    '',
                    'export function Example() {',
                    '  return <FileUpload multiple maxCount={5} />',
                    '}'
                  ]}
                />
                <ComponentSection
                  title="multiple={false} (기본) — 단일 파일"
                  preview={<FileUpload />}
                  code={[
                    "import FileUpload from 'm2m-uiux-react/FileUpload'",
                    '',
                    'export function Example() {',
                    '  return <FileUpload />',
                    '}'
                  ]}
                  notes={['단일 모드는 새 파일 선택 시 이전 파일 교체']}
                />
              </>
            )}

            {tab === 'maxSize' && (
              <ComponentSection
                title="maxSize={1MB} — 초과 파일은 에러 항목"
                preview={<FileUpload multiple maxSize={MB} maxCount={5} />}
                code={[
                  "import FileUpload from 'm2m-uiux-react/FileUpload'",
                  '',
                  'export function Example() {',
                  '  return <FileUpload maxSize={1 * 1024 * 1024} multiple />',
                  '}'
                ]}
                notes={['초과 파일은 목록에 빨간 에러 상태로 표시됩니다']}
              />
            )}

            {tab === 'maxCount' && (
              <ComponentSection
                title="maxCount={3} — 최대 3개"
                preview={<FileUpload multiple maxCount={3} />}
                code={[
                  "import FileUpload from 'm2m-uiux-react/FileUpload'",
                  '',
                  'export function Example() {',
                  '  return <FileUpload multiple maxCount={3} />',
                  '}'
                ]}
                notes={['maxCount 도달 시 버튼이 비활성화됩니다']}
              />
            )}

            {tab === 'disabled' && (
              <ComponentSection
                title="disabled={true}"
                preview={<FileUpload disabled />}
                code={[
                  "import FileUpload from 'm2m-uiux-react/FileUpload'",
                  '',
                  'export function Example() {',
                  '  return <FileUpload disabled />',
                  '}'
                ]}
                notes={['버튼 클릭 및 드래그 모두 차단됩니다']}
              />
            )}

            {tab === 'listType' && (
              <>
                <ComponentSection
                  title='listType="text" (기본) — 파일명 텍스트'
                  preview={<FileUpload multiple maxCount={4} listType={FILE_UPLOAD_LIST_TYPE['TEXT']} />}
                  code={[
                    "import FileUpload, {FILE_UPLOAD_LIST_TYPE} from 'm2m-uiux-react/FileUpload'",
                    '',
                    'export function Example() {',
                    "  return <FileUpload multiple listType={FILE_UPLOAD_LIST_TYPE['TEXT']} />",
                    '}'
                  ]}
                />
                <ComponentSection
                  title='listType="picture" — 이미지 썸네일'
                  preview={
                    <FileUpload accept="image/*" multiple maxCount={4} listType={FILE_UPLOAD_LIST_TYPE['PICTURE']} />
                  }
                  code={[
                    "import FileUpload, {FILE_UPLOAD_LIST_TYPE} from 'm2m-uiux-react/FileUpload'",
                    '',
                    'export function Example() {',
                    '  return <FileUpload accept="image/*" multiple listType={FILE_UPLOAD_LIST_TYPE[\'PICTURE\']} />',
                    '}'
                  ]}
                  notes={['이미지 파일 선택 시 36×36 썸네일 미리보기']}
                />
              </>
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
