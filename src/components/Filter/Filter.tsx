import {useEffect, useMemo, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {CheckboxGroup} from '~/components/CheckboxGroup/CheckboxGroup'
import {Dialog} from '~/components/Dialog/Dialog'
import {DIALOG_DIRECTION, DIALOG_SIZE, DIALOG_VARIANT} from '~/components/Dialog/Dialog.constant'
import {FILTER_DEFAULT} from '~/components/Filter/Filter.constant'
import type {FilterProps, FilterRangeValue, FilterSection, FilterValue} from '~/components/Filter/Filter.type'
import styles from '~/components/Filter/Filter.module.scss'
import {Icon} from '~/components/Icon/Icon'
import {Pagination} from '~/components/Pagination/Pagination'
import {RadioGroup} from '~/components/RadioGroup/RadioGroup'

export function Filter({
  open,
  onClose,
  value = {},
  onChange,
  onConfirm,
  sections,
  title = FILTER_DEFAULT.TITLE,
  resetText = FILTER_DEFAULT.RESET_TEXT,
  confirmText = FILTER_DEFAULT.CONFIRM_TEXT,
  closeOnBackdrop = true,
  classNames
}: FilterProps) {
  const [local, setLocal] = useState<FilterValue>({})
  const [brandSearch, setBrandSearch] = useState('')
  const [brandLetter, setBrandLetter] = useState<string>(FILTER_DEFAULT.ALPHABET_ALL)
  const [brandPage, setBrandPage] = useState(1)

  // open 될 때마다 value 로 로컬 선택 상태를 초기화 (닫힌 동안의 조작은 버려짐)
  useEffect(() => {
    if (!open) return
    setLocal({...value})
    setBrandSearch('')
    setBrandLetter(FILTER_DEFAULT.ALPHABET_ALL)
    setBrandPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function checkboxValue(key: string): string[] {
    const v = local[key]
    return Array.isArray(v) ? v : []
  }
  function setCheckboxValue(key: string, next: string[]) {
    setLocal((prev) => ({...prev, [key]: next}))
  }
  function radioValue(key: string): string | undefined {
    const v = local[key]
    return typeof v === 'string' ? v : undefined
  }
  function setRadioValue(key: string, next: string) {
    setLocal((prev) => ({...prev, [key]: next}))
  }
  function rangeValue(key: string): FilterRangeValue {
    const v = local[key]
    return v && typeof v === 'object' && !Array.isArray(v) ? (v as FilterRangeValue) : {}
  }
  function setRangeValue(key: string, patch: Partial<FilterRangeValue>) {
    setLocal((prev) => ({...prev, [key]: {...rangeValue(key), ...patch}}))
  }

  function sectionActiveCount(section: FilterSection): number {
    const v = local[section.key]
    if (section.type === 'range') {
      const r = v as FilterRangeValue | undefined
      return r?.min || r?.max ? 1 : 0
    }
    if (Array.isArray(v)) return v.length
    return v ? 1 : 0
  }

  const totalActiveCount = sections.reduce((sum, section) => sum + sectionActiveCount(section), 0)

  // ── 브랜드 섹션: 검색어 + 초성/알파벳 탐색 + 페이지네이션 ──────
  const brandSection = sections.find((section) => section.type === 'brand')

  const brandLetters = useMemo(() => {
    const options = brandSection?.options ?? []
    const letters = new Set(options.map((option) => option.label.charAt(0).toUpperCase()))
    return [FILTER_DEFAULT.ALPHABET_ALL, ...Array.from(letters).sort()]
  }, [brandSection])

  const filteredBrandOptions = useMemo(() => {
    const options = brandSection?.options ?? []
    const keyword = brandSearch.trim().toLowerCase()
    return options.filter((option) => {
      const matchesKeyword = !keyword || option.label.toLowerCase().includes(keyword)
      const matchesLetter =
        brandLetter === FILTER_DEFAULT.ALPHABET_ALL || option.label.charAt(0).toUpperCase() === brandLetter
      return matchesKeyword && matchesLetter
    })
  }, [brandSection, brandSearch, brandLetter])

  const pagedBrandOptions = useMemo(() => {
    const size = FILTER_DEFAULT.BRAND_PAGE_SIZE
    const start = (brandPage - 1) * size
    return filteredBrandOptions.slice(start, start + size)
  }, [filteredBrandOptions, brandPage])

  useEffect(() => {
    setBrandPage(1)
  }, [filteredBrandOptions])

  function resetAll() {
    setLocal({})
    setBrandSearch('')
    setBrandLetter(FILTER_DEFAULT.ALPHABET_ALL)
    setBrandPage(1)
  }

  function handleConfirm() {
    onChange?.(local)
    onConfirm?.(local)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      variant={DIALOG_VARIANT.DRAWER}
      direction={DIALOG_DIRECTION.BOTTOM}
      size={DIALOG_SIZE.FULL}
      closeOnBackdrop={closeOnBackdrop}
      classNames={cx(styles.bsFilterPanel, resolveClassNames(classNames))}
      ariaLabel={title}
      title={title}
      footer={
        <div className={styles.bsFilterActions}>
          <button type="button" className={styles.bsFilterReset} onClick={resetAll}>
            <Icon name="refresh" size={14} />
            {resetText}
          </button>
          <button type="button" className={styles.bsFilterConfirm} onClick={handleConfirm}>
            {confirmText}
            {totalActiveCount > 0 && <span>&nbsp;({totalActiveCount})</span>}
          </button>
        </div>
      }
    >
      <div className={styles.bsFilterBody}>
        {sections.map((section) => (
          <section key={section.key} className={styles.bsFilterSection}>
            <h3 className={styles.bsFilterSectionTitle}>{section.title}</h3>

            {section.type === 'brand' ? (
              <>
                <div className={styles.bsFilterBrandSearch}>
                  <Icon name="search" size={16} />
                  <input
                    type="text"
                    value={brandSearch}
                    placeholder={FILTER_DEFAULT.BRAND_SEARCH_PLACEHOLDER}
                    className={styles.bsFilterBrandSearchInput}
                    onChange={(e) => setBrandSearch(e.target.value)}
                  />
                </div>
                <div className={styles.bsFilterAlphabet} role="tablist">
                  {brandLetters.map((letter) => (
                    <button
                      key={letter}
                      type="button"
                      role="tab"
                      aria-selected={letter === brandLetter}
                      className={cx(styles.bsFilterAlphabetItem, letter === brandLetter && styles['is-active'])}
                      onClick={() => setBrandLetter(letter)}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                {pagedBrandOptions.length > 0 ? (
                  <CheckboxGroup
                    options={pagedBrandOptions}
                    value={checkboxValue(section.key)}
                    onChange={(next) => setCheckboxValue(section.key, next)}
                  />
                ) : (
                  <p className={styles.bsFilterEmpty}>{FILTER_DEFAULT.BRAND_EMPTY_TEXT}</p>
                )}
                {filteredBrandOptions.length > FILTER_DEFAULT.BRAND_PAGE_SIZE && (
                  <Pagination
                    page={brandPage}
                    onChange={setBrandPage}
                    total={filteredBrandOptions.length}
                    pageSize={FILTER_DEFAULT.BRAND_PAGE_SIZE}
                    size="sm"
                    classNames={styles.bsFilterBrandPagination}
                  />
                )}
              </>
            ) : section.type === 'checkbox' ? (
              <CheckboxGroup
                options={section.options ?? []}
                value={checkboxValue(section.key)}
                onChange={(next) => setCheckboxValue(section.key, next)}
              />
            ) : section.type === 'radio' ? (
              <RadioGroup
                options={section.options ?? []}
                value={radioValue(section.key)}
                name={section.key}
                onChange={(next) => setRadioValue(section.key, next)}
              />
            ) : (
              <div className={styles.bsFilterRange}>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={section.minPlaceholder}
                  value={rangeValue(section.key).min ?? ''}
                  className={styles.bsFilterRangeInput}
                  onChange={(e) => setRangeValue(section.key, {min: e.target.value})}
                />
                <span className={styles.bsFilterRangeSeparator}>~</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={section.maxPlaceholder}
                  value={rangeValue(section.key).max ?? ''}
                  className={styles.bsFilterRangeInput}
                  onChange={(e) => setRangeValue(section.key, {max: e.target.value})}
                />
              </div>
            )}
          </section>
        ))}
      </div>
    </Dialog>
  )
}
