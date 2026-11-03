import ImageUploadPreview from '~/components/ImageUploadPreview'
import UploadedFileList from '~/components/UploadedFileList'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'
import {useServerUpload} from '~/demo/serverUploadDemo'

const TABS = ['basic', 'drag', 'listView', 'cols', 'maxCount', 'maxSize', 'disabled', 'serverUpload']

const MB = 1024 * 1024

const imp = "import ImageUploadPreview from 'm2m-uiux-react/ImageUploadPreview'"

function ServerUploadDemo() {
  const {files, setFiles, rejectLog, onPicked, onReject} = useServerUpload()
  return (
    <div className="demo-col" style={{width: 420, maxWidth: '100%'}}>
      <ImageUploadPreview showList={false} maxCount={8} onChange={onPicked} onReject={onReject} />
      <UploadedFileList value={files} onChange={setFiles} />
      {rejectLog && <span className="demo-hint">제외됨: {rejectLog}</span>}
    </div>
  )
}

export function ImageUploadPreviewPage() {
  return (
    <>
      <PageHeader
        title="ImageUploadPreview"
        component="ImageUploadPreview"
        desc="— 이미지를 업로드하고 그리드·리스트·라이트박스로 미리보기까지 한 컴포넌트에서 처리. 드래그 & 드롭, 크기/개수 제한을 지원합니다."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'basic' && (
              <ComponentSection
                title="기본 — 그리드 썸네일 + 라이트박스"
                preview={<ImageUploadPreview maxCount={8} cols={4} />}
                code={[
                  imp,
                  '',
                  'export function Example() {',
                  '  return <ImageUploadPreview maxCount={8} cols={4} onChange={(files) => console.log(files)} />',
                  '}'
                ]}
                notes={[
                  '+ 카드 클릭으로 이미지 추가',
                  '썸네일 호버 시 줌 아이콘 + 삭제(×) 버튼',
                  '썸네일 클릭 → 라이트박스 (줌/회전/다운로드/키보드 이동)',
                  'ESC 또는 배경 클릭으로 닫기'
                ]}
              />
            )}

            {tab === 'drag' && (
              <ComponentSection
                title="drag={true} — 드래그 & 드롭 업로드"
                preview={<ImageUploadPreview drag maxCount={6} cols={3} />}
                code={[
                  imp,
                  '',
                  'export function Example() {',
                  '  return <ImageUploadPreview drag maxCount={6} cols={3} />',
                  '}'
                ]}
                notes={['드래그 시 테두리·배경이 오렌지로', 'maxCount 도달 시 드롭 영역이 숨겨짐']}
              />
            )}

            {tab === 'listView' && (
              <>
                <ComponentSection
                  title="listView={true} — 리스트형 미리보기"
                  preview={<ImageUploadPreview listView maxCount={5} />}
                  code={[
                    imp,
                    '',
                    'export function Example() {',
                    '  return <ImageUploadPreview listView maxCount={5} />',
                    '}'
                  ]}
                  notes={['파일명·크기·미리보기/삭제 버튼이 행으로 표시', '크기 초과 파일은 에러 행으로 표시']}
                />
                <ComponentSection
                  title="drag + listView"
                  preview={<ImageUploadPreview drag listView maxCount={5} />}
                  code={[
                    imp,
                    '',
                    'export function Example() {',
                    '  return <ImageUploadPreview drag listView maxCount={5} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'cols' && (
              <>
                {([2, 3, 4, 5] as const).map((c) => (
                  <ComponentSection
                    key={c}
                    title={`cols={${c}} — ${c}열 그리드`}
                    preview={<ImageUploadPreview cols={c} maxCount={c * 2} thumbSize={80} />}
                    code={[
                      imp,
                      '',
                      'export function Example() {',
                      `  return <ImageUploadPreview cols={${c}} thumbSize={80} maxCount={${c * 2}} />`,
                      '}'
                    ]}
                  />
                ))}
              </>
            )}

            {tab === 'maxCount' && (
              <>
                <ComponentSection
                  title="maxCount={3} — 최대 3장"
                  preview={<ImageUploadPreview maxCount={3} cols={3} />}
                  code={[imp, '', 'export function Example() {', '  return <ImageUploadPreview maxCount={3} />', '}']}
                  notes={['도달 시 + 추가 카드가 사라집니다']}
                />
                <ComponentSection
                  title="maxCount={1} — 단일 (대표 이미지)"
                  preview={<ImageUploadPreview maxCount={1} cols={1} thumbSize={120} />}
                  code={[
                    imp,
                    '',
                    'export function Example() {',
                    '  return <ImageUploadPreview maxCount={1} thumbSize={120} />',
                    '}'
                  ]}
                />
              </>
            )}

            {tab === 'maxSize' && (
              <ComponentSection
                title="maxSize={1MB} — 초과 시 에러 카드"
                preview={<ImageUploadPreview maxSize={MB} maxCount={6} cols={3} />}
                code={[
                  imp,
                  '',
                  'export function Example() {',
                  '  return <ImageUploadPreview maxSize={1 * 1024 * 1024} maxCount={6} />',
                  '}'
                ]}
                notes={['초과 파일은 빨간 에러 카드/행으로 표시, × 삭제 가능']}
              />
            )}

            {tab === 'disabled' && (
              <>
                <ComponentSection
                  title="disabled={true}"
                  preview={<ImageUploadPreview disabled maxCount={4} cols={4} />}
                  code={[imp, '', 'export function Example() {', '  return <ImageUploadPreview disabled />', '}']}
                  notes={['+ 카드가 표시되지 않아 추가 불가']}
                />
                <ComponentSection
                  title="disabled + drag"
                  preview={<ImageUploadPreview disabled drag maxCount={4} cols={3} />}
                  code={[imp, '', 'export function Example() {', '  return <ImageUploadPreview disabled drag />', '}']}
                />
              </>
            )}

            {tab === 'serverUpload' && (
              <ComponentSection
                title="serverUpload callback — 이미지 선택 후 서버에 올리고, 받은 url로 썸네일 표시"
                preview={<ServerUploadDemo />}
                code={[
                  "import {useState} from 'react'",
                  "import ImageUploadPreview from 'm2m-uiux-react/ImageUploadPreview'",
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
                  '    <ImageUploadPreview showList={false} onChange={onPicked} />',
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
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
