import {useEffect, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Dialog} from '~/components/Dialog/Dialog'
import {DIALOG_DIRECTION, DIALOG_SIZE, DIALOG_VARIANT} from '~/components/Dialog/Dialog.constant'
import {Icon} from '~/components/Icon/Icon'
import {DEFAULT_REGIONS, REGION_PICKER_DEFAULT} from '~/components/RegionPicker/RegionPicker.constant'
import type {RegionPickerProps, RegionValue} from '~/components/RegionPicker/RegionPicker.type'
import styles from '~/components/RegionPicker/RegionPicker.module.scss'

export function RegionPicker({
  open,
  onClose,
  value = null,
  onChange,
  onConfirm,
  multiple = true,
  title = REGION_PICKER_DEFAULT.TITLE,
  hint = REGION_PICKER_DEFAULT.HINT,
  regions = DEFAULT_REGIONS,
  confirmText,
  resetText = REGION_PICKER_DEFAULT.RESET_TEXT,
  closeOnBackdrop = true,
  classNames
}: RegionPickerProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [selections, setSelections] = useState<RegionValue[]>([])
  /** 헤더 설명에 표시할 "마지막으로 만진 항목" (province > city) */
  const [lastTouched, setLastTouched] = useState<RegionValue | null>(null)

  // open 될 때마다 value 로 로컬 선택 상태를 초기화 (닫힌 동안의 조작은 버려짐)
  useEffect(() => {
    if (!open) return
    const initial = multiple ? (Array.isArray(value) ? value : []) : !Array.isArray(value) && value ? [value] : []
    setSelections([...initial])
    setLastTouched(initial[initial.length - 1] ?? null)
    setSelectedProvince(initial[initial.length - 1]?.province ?? initial[0]?.province ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const activeCities = regions.find((g) => g.province === selectedProvince)?.cities ?? []
  const canConfirm = selections.length > 0
  const confirmLabel = confirmText ?? (multiple ? REGION_PICKER_DEFAULT.APPLY_TEXT : REGION_PICKER_DEFAULT.CONFIRM_TEXT)
  const summaryText = lastTouched ? `${lastTouched.province} > ${lastTouched.city}` : hint

  function isCitySelected(city: string) {
    return selections.some((v) => v.province === selectedProvince && v.city === city)
  }
  function provinceSelectionCount(province: string) {
    return selections.filter((v) => v.province === province).length
  }

  function selectProvince(province: string) {
    setSelectedProvince(province)
  }

  function toggleCity(city: string) {
    const province = selectedProvince
    if (!province) return
    setLastTouched({province, city})
    if (!multiple) {
      setSelections([{province, city}])
      return
    }
    setSelections((prev) => {
      const idx = prev.findIndex((v) => v.province === province && v.city === city)
      if (idx >= 0) return prev.filter((_, i) => i !== idx)
      return [...prev, {province, city}]
    })
  }

  function removeSelection(target: RegionValue) {
    setSelections((prev) => prev.filter((v) => !(v.province === target.province && v.city === target.city)))
  }

  function resetSelections() {
    setSelections([])
    setLastTouched(null)
  }

  function handleConfirm() {
    if (!canConfirm) return
    const result = multiple ? [...selections] : selections[0]!
    onChange?.(result)
    onConfirm?.(result)
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
      classNames={cx(styles.bsRegionPickerPanel, resolveClassNames(classNames))}
      ariaLabel={title}
      title={
        <span className={styles.bsRegionPickerTitleRow}>
          <button type="button" className={styles.bsRegionPickerBack} aria-label="뒤로가기" onClick={onClose}>
            <Icon name="arrow-left" size={20} />
          </button>
          <span>{title}</span>
        </span>
      }
      description={summaryText}
      footer={
        multiple ? (
          <div className={styles.bsRegionPickerMultiFooter}>
            {selections.length > 0 && (
              <div className={styles.bsRegionPickerChips}>
                {selections.map((sel) => (
                  <span key={`${sel.province}-${sel.city}`} className={styles.bsRegionPickerChip}>
                    {sel.province} &gt; {sel.city}
                    <button
                      type="button"
                      className={styles.bsRegionPickerChipRemove}
                      aria-label="선택 해제"
                      onClick={() => removeSelection(sel)}
                    >
                      <Icon name="close" size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className={styles.bsRegionPickerActions}>
              <button type="button" className={styles.bsRegionPickerReset} onClick={resetSelections}>
                <Icon name="refresh" size={14} />
                {resetText}
              </button>
              <button
                type="button"
                className={styles.bsRegionPickerConfirm}
                disabled={!canConfirm}
                onClick={handleConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={styles.bsRegionPickerConfirmFull}
            disabled={!canConfirm}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </button>
        )
      }
    >
      <div className={styles.bsRegionPickerColumns}>
        <div className={styles.bsRegionPickerColumn}>
          <div className={styles.bsRegionPickerColumnHead}>행정구역</div>
          <ul className={styles.bsRegionPickerList} role="listbox">
            {regions.map((group) => (
              <li key={group.province}>
                <button
                  type="button"
                  role="option"
                  aria-selected={group.province === selectedProvince}
                  className={cx(
                    styles.bsRegionPickerItem,
                    group.province === selectedProvince && styles['is-selected']
                  )}
                  onClick={() => selectProvince(group.province)}
                >
                  <span>{group.province}</span>
                  {multiple && provinceSelectionCount(group.province) > 0 && (
                    <span className={styles.bsRegionPickerCount}>{provinceSelectionCount(group.province)}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bsRegionPickerColumn}>
          <div className={styles.bsRegionPickerColumnHead}>시군구</div>
          {activeCities.length > 0 ? (
            <ul className={styles.bsRegionPickerList} role="listbox">
              {activeCities.map((city) => (
                <li key={city}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isCitySelected(city)}
                    className={cx(styles.bsRegionPickerItem, isCitySelected(city) && styles['is-selected'])}
                    onClick={() => toggleCity(city)}
                  >
                    {multiple && (
                      <span
                        className={cx(styles.bsRegionPickerCheckbox, isCitySelected(city) && styles['is-selected'])}
                      >
                        {isCitySelected(city) && <Icon name="check" size={12} color="#fff" />}
                      </span>
                    )}
                    <span>{city}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.bsRegionPickerEmpty}>
              <span>{hint}</span>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}
