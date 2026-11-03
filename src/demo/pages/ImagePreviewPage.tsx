import ImagePreview, {IMAGE_PREVIEW_FIT} from '~/components/ImagePreview'

import {ComponentSection} from '~/demo/components/ComponentSection'
import {PageHeader} from '~/demo/components/PageHeader'
import {PropTabs} from '~/demo/components/PropTabs'

const TABS = ['preview', 'group', 'size', 'radius', 'fit', 'fallback']

const IMGS = [
  'https://picsum.photos/id/1015/500/400',
  'https://picsum.photos/id/1025/500/400',
  'https://picsum.photos/id/1039/500/400',
  'https://picsum.photos/id/1043/500/400',
  'https://picsum.photos/id/1050/500/400',
  'https://picsum.photos/id/1060/500/400'
]

export function ImagePreviewPage() {
  return (
    <>
      <PageHeader
        title="ImagePreview"
        component="ImagePreview"
        desc="— 이미지 클릭 시 라이트박스(Lightbox)로 확대 미리보기. 갤러리 그룹·줌·회전·썸네일 스트립 지원."
      />
      <PropTabs tabs={TABS}>
        {(tab) => (
          <>
            {tab === 'preview' && (
              <>
                <ComponentSection
                  title="preview={true} (기본) — 클릭 시 라이트박스 열림"
                  preview={
                    <div className="demo-row" style={{gap: 12, flexWrap: 'wrap'}}>
                      {IMGS.slice(0, 3).map((s) => (
                        <ImagePreview key={s} src={s} width={100} height={100} />
                      ))}
                    </div>
                  }
                  code={[
                    "import ImagePreview from 'm2m-uiux-react/ImagePreview'",
                    '',
                    'export function Example() {',
                    '  return <ImagePreview src={url} width={120} height={120} />',
                    '}'
                  ]}
                  notes={[
                    '클릭 → 라이트박스',
                    '라이트박스 내 줌 인/아웃, 90° 회전, 다운로드 지원',
                    'ESC 키 또는 배경 클릭으로 닫기'
                  ]}
                />
                <ComponentSection
                  title="preview={false} — 라이트박스 비활성"
                  preview={<ImagePreview src={IMGS[0]} width={120} height={120} preview={false} />}
                  code={[
                    "import ImagePreview from 'm2m-uiux-react/ImagePreview'",
                    '',
                    'export function Example() {',
                    '  return <ImagePreview src={url} preview={false} />',
                    '}'
                  ]}
                  notes={['클릭해도 라이트박스가 열리지 않습니다']}
                />
              </>
            )}

            {tab === 'group' && (
              <ComponentSection
                title="group — 갤러리 묶음 (라이트박스 내 이동)"
                preview={
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 8,
                      maxWidth: 420
                    }}
                  >
                    {IMGS.map((s) => (
                      <ImagePreview key={s} src={s} group={IMGS} width="100%" height={100} />
                    ))}
                  </div>
                }
                code={[
                  "import ImagePreview from 'm2m-uiux-react/ImagePreview'",
                  '',
                  "const images = ['/a.jpg', '/b.jpg', '/c.jpg']",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {images.map((src) => (',
                  '        <ImagePreview key={src} src={src} group={images} width="100%" height={100} />',
                  '      ))}',
                  '    </>',
                  '  )',
                  '}'
                ]}
                notes={[
                  '같은 group 배열을 공유하는 이미지들은 라이트박스 내에서 ← → 이동 가능',
                  '하단 썸네일 스트립으로 빠른 이동',
                  '키보드 ArrowLeft/Right 로도 이동'
                ]}
              />
            )}

            {tab === 'size' && (
              <ComponentSection
                title="width / height — 픽셀 또는 CSS 문자열"
                preview={
                  <div className="demo-row" style={{gap: 12, alignItems: 'flex-end'}}>
                    {([60, 100, 150] as const).map((w) => (
                      <div key={w} style={{textAlign: 'center'}}>
                        <ImagePreview src={IMGS[0]} width={w} height={100} />
                        <div className="demo-hint">{w}×100</div>
                      </div>
                    ))}
                  </div>
                }
                code={[
                  "import ImagePreview from 'm2m-uiux-react/ImagePreview'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      <ImagePreview src={url} width={60} height={60} />',
                  '      <ImagePreview src={url} width={100} height={100} />',
                  '      <ImagePreview src={url} width="100%" height={200} />',
                  '    </>',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'radius' && (
              <ComponentSection
                title="radius — 모서리 둥글기"
                preview={
                  <div className="demo-row" style={{gap: 16}}>
                    {[0, 8, 16, 999].map((r) => (
                      <div key={r} style={{textAlign: 'center'}}>
                        <ImagePreview src={IMGS[1]} width={80} height={80} radius={r} />
                        <div className="demo-hint">radius={r}</div>
                      </div>
                    ))}
                  </div>
                }
                code={[
                  "import ImagePreview from 'm2m-uiux-react/ImagePreview'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {/* radius=0: 직각 */}',
                  '      <ImagePreview src={url} radius={0} />',
                  '      {/* radius=8: 기본값 */}',
                  '      <ImagePreview src={url} radius={8} />',
                  '      {/* radius=999: 원형 */}',
                  '      <ImagePreview src={url} radius={999} />',
                  '    </>',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'fit' && (
              <ComponentSection
                title="fit — 이미지 채우기 방식"
                preview={
                  <div className="demo-row" style={{gap: 16}}>
                    {(['COVER', 'CONTAIN', 'FILL'] as const).map((f) => (
                      <div key={f} style={{textAlign: 'center'}}>
                        <ImagePreview src={IMGS[2]} width={110} height={80} fit={IMAGE_PREVIEW_FIT[f]} radius={6} />
                        <div className="demo-hint">fit="{IMAGE_PREVIEW_FIT[f]}"</div>
                      </div>
                    ))}
                  </div>
                }
                code={[
                  "import ImagePreview, {IMAGE_PREVIEW_FIT} from 'm2m-uiux-react/ImagePreview'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <>',
                  '      {/* COVER: 기본, 비율 유지 + 잘림 */}',
                  "      <ImagePreview src={url} fit={IMAGE_PREVIEW_FIT['COVER']} />",
                  '      {/* CONTAIN: 비율 유지 + 여백 */}',
                  "      <ImagePreview src={url} fit={IMAGE_PREVIEW_FIT['CONTAIN']} />",
                  '      {/* FILL: 비율 무시 + 가득 채움 */}',
                  "      <ImagePreview src={url} fit={IMAGE_PREVIEW_FIT['FILL']} />",
                  '    </>',
                  '  )',
                  '}'
                ]}
              />
            )}

            {tab === 'fallback' && (
              <ComponentSection
                title="fallback — 이미지 로드 실패 시 대체 이미지"
                preview={
                  <ImagePreview src="https://invalid.invalid/x.jpg" fallback={IMGS[0]} width={120} height={120} />
                }
                code={[
                  "import ImagePreview from 'm2m-uiux-react/ImagePreview'",
                  '',
                  'export function Example() {',
                  '  return (',
                  '    <ImagePreview',
                  '      src="https://broken-url.xyz/img.jpg"',
                  '      fallback="/images/placeholder.png"',
                  '      width={100}',
                  '      height={100}',
                  '    />',
                  '  )',
                  '}'
                ]}
                notes={['이미지 로드 실패 시 fallback URL 의 이미지가 대신 표시됩니다']}
              />
            )}
          </>
        )}
      </PropTabs>
    </>
  )
}
