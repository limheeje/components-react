# Cascader

연관된 계층 옵션을 단계별 메뉴로 선택하는 컴포넌트입니다. 단일·다중 선택, 검색, 독립 선택,
동적 로딩, 커스텀 옵션 키와 단독 `CascaderPanel`을 지원합니다.

```tsx
import Cascader from 'm2m-uiux-react/Cascader'

const options = [
  {value: 'seoul', label: '서울', children: [{value: 'gangnam', label: '강남구'}]}
]

<Cascader options={options} value={value} onChange={setValue} clearable />
```

React 제어 API는 `value` / `onChange`이며, 비제어 사용 시 `defaultValue`를 사용합니다.
`config`에서 `multiple`, `checkStrictly`, `emitPath`, `expandTrigger`, `lazy`, 옵션 키 매핑을 설정합니다.
