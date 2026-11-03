import {forwardRef, useId} from 'react'
import type {ReactElement} from 'react'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import {cx, resolveClassNames} from '~/lib/cx'

import {CHART_DEFAULT, CHART_PALETTE, CHART_TYPE} from '~/components/Chart/Chart.constant'
import type {ChartProps} from '~/components/Chart/Chart.type'
import styles from '~/components/Chart/Chart.module.scss'

const AXIS_TICK = {fontSize: 11, fill: 'var(--m2m-pg-comp-text-muted)'}
const GRID_STROKE = 'var(--m2m-pg-comp-border)'
const TOOLTIP_STYLE = {
  contentStyle: {
    background: 'var(--m2m-pg-comp-bg)',
    border: '1px solid var(--m2m-pg-comp-border)',
    borderRadius: 8,
    fontSize: 12,
    color: 'var(--m2m-pg-comp-text)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
  },
  labelStyle: {color: 'var(--m2m-pg-comp-text-muted)', marginBottom: 4}
} as const
const LEGEND_STYLE = {fontSize: 12}

const RADIAN = Math.PI / 180
/** pie 조각 내부 퍼센트 라벨 */
function PIE_PERCENT_LABEL({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}) {
  if (percent < 0.06) return null
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      style={{fontSize: 11, fontWeight: 700}}
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  )
}

export const Chart = forwardRef<HTMLDivElement, ChartProps>(function Chart(
  {
    type = CHART_DEFAULT.TYPE,
    data,
    xKey,
    series,
    height = CHART_DEFAULT.HEIGHT,
    colors = CHART_PALETTE as string[],
    showGrid = true,
    showAxis = true,
    showLegend = true,
    showTooltip = true,
    stacked = false,
    layout = 'horizontal',
    referenceLines,
    maxValue,
    valueFormatter,
    classNames
  },
  ref
) {
  const gid = useId().replace(/[:]/g, '')
  const norm = series.map((s, i) => {
    const base = typeof s === 'string' ? {key: s} : s
    return {
      key: base.key,
      label: base.label ?? base.key,
      color: base.color ?? colors[i % colors.length],
      type: typeof s === 'string' ? undefined : s.type,
      dashed: typeof s === 'string' ? undefined : s.dashed,
      gradId: `${gid}-${i}`
    }
  })

  /** area 세로 그라디언트 defs */
  const areaDefs = (
    <defs>
      {norm.map((s) => (
        <linearGradient key={s.gradId} id={s.gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={s.color} stopOpacity={0.28} />
          <stop offset="95%" stopColor={s.color} stopOpacity={0.02} />
        </linearGradient>
      ))}
    </defs>
  )

  const refLines = (referenceLines ?? []).map((r, i) => (
    <ReferenceLine
      key={`ref-${i}`}
      y={r.value}
      stroke={r.color ?? 'var(--m2m-pg-comp-text-muted)'}
      strokeDasharray="4 4"
      label={r.label ? {value: r.label, position: 'insideTopRight', fontSize: 10} : undefined}
    />
  ))

  const tooltipEl = showTooltip ? <Tooltip key="tt" {...TOOLTIP_STYLE} formatter={valueFormatter} /> : null
  const legendEl = showLegend ? <Legend key="lg" wrapperStyle={LEGEND_STYLE} /> : null

  /* recharts 2.x 는 Fragment 자식을 인식하지 못한다 → 축·그리드는 항상 배열로 평탄화해 넘긴다 */
  const cartesian = (xAxis: ReactElement, yAxis: ReactElement, gridProps?: object) =>
    [
      showGrid && <CartesianGrid key="cg" strokeDasharray="3 3" stroke={GRID_STROKE} {...gridProps} />,
      showAxis && xAxis,
      showAxis && yAxis,
      tooltipEl,
      legendEl,
      ...refLines
    ].filter(Boolean)

  const catX = <XAxis key="x" dataKey={xKey} tick={AXIS_TICK} tickLine={false} axisLine={{stroke: GRID_STROKE}} />
  const catY = (
    <YAxis
      key="y"
      tick={AXIS_TICK}
      tickLine={false}
      axisLine={false}
      width={44}
      domain={maxValue != null ? [0, maxValue] : undefined}
      tickFormatter={valueFormatter}
    />
  )

  let chart: ReactElement

  if (type === CHART_TYPE.PIE || type === CHART_TYPE.DONUT) {
    const key = norm[0]?.key ?? 'value'
    chart = (
      <PieChart>
        <Pie
          data={data}
          dataKey={key}
          nameKey={xKey}
          cx="50%"
          cy="50%"
          outerRadius="80%"
          innerRadius={type === CHART_TYPE.DONUT ? '55%' : 0}
          paddingAngle={type === CHART_TYPE.DONUT ? 2 : 0}
          labelLine={false}
          label={type === CHART_TYPE.DONUT ? undefined : PIE_PERCENT_LABEL}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip {...TOOLTIP_STYLE} formatter={valueFormatter} />}
        {showLegend && <Legend wrapperStyle={LEGEND_STYLE} />}
      </PieChart>
    )
  } else if (type === CHART_TYPE.RADAR) {
    chart = (
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
        {showGrid && <PolarGrid stroke={GRID_STROKE} />}
        <PolarAngleAxis dataKey={xKey} tick={AXIS_TICK} />
        {showAxis && (
          <PolarRadiusAxis
            tick={{fontSize: 9, fill: 'var(--m2m-pg-comp-text-disabled)'}}
            domain={maxValue != null ? [0, maxValue] : undefined}
          />
        )}
        {norm.map((s) => (
          <Radar
            key={s.key}
            name={s.label}
            dataKey={s.key}
            stroke={s.color}
            fill={s.color}
            fillOpacity={0.18}
            strokeWidth={2}
          />
        ))}
        {showTooltip && <Tooltip {...TOOLTIP_STYLE} />}
        {showLegend && <Legend wrapperStyle={LEGEND_STYLE} />}
      </RadarChart>
    )
  } else if (type === CHART_TYPE.SCATTER) {
    chart = (
      <ScatterChart>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />}
        {showAxis && <XAxis key="x" type="number" dataKey={xKey} tick={AXIS_TICK} />}
        {showAxis && <YAxis key="y" type="number" dataKey={norm[0]?.key} tick={AXIS_TICK} />}
        {showTooltip && <Tooltip {...TOOLTIP_STYLE} cursor={{strokeDasharray: '3 3'}} />}
        {showLegend && <Legend wrapperStyle={LEGEND_STYLE} />}
        {norm.map((s) => (
          <Scatter key={s.key} name={s.label} data={data} dataKey={s.key} fill={s.color} fillOpacity={0.72} />
        ))}
      </ScatterChart>
    )
  } else if (type === CHART_TYPE.BAR && !norm.some((s) => s.type)) {
    const isVertical = layout === 'vertical'
    chart = (
      <BarChart data={data} layout={isVertical ? 'vertical' : 'horizontal'} barCategoryGap="28%">
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={isVertical} horizontal={!isVertical} />
        )}
        {showAxis && isVertical && (
          <XAxis
            key="x"
            type="number"
            tick={AXIS_TICK}
            domain={maxValue != null ? [0, maxValue] : undefined}
            tickFormatter={valueFormatter}
          />
        )}
        {showAxis && isVertical && <YAxis key="y" type="category" dataKey={xKey} tick={AXIS_TICK} width={64} />}
        {showAxis && !isVertical && <XAxis key="x" dataKey={xKey} tick={AXIS_TICK} />}
        {showAxis && !isVertical && (
          <YAxis
            key="y"
            tick={AXIS_TICK}
            domain={maxValue != null ? [0, maxValue] : undefined}
            tickFormatter={valueFormatter}
          />
        )}
        {showTooltip && <Tooltip {...TOOLTIP_STYLE} formatter={valueFormatter} />}
        {showLegend && <Legend wrapperStyle={LEGEND_STYLE} />}
        {!isVertical && refLines}
        {norm.map((s, i) => (
          <Bar
            key={s.key}
            name={s.label}
            dataKey={s.key}
            fill={s.color}
            stackId={stacked ? 'stack' : undefined}
            radius={stacked && i < norm.length - 1 ? [0, 0, 0, 0] : isVertical ? [0, 6, 6, 0] : [6, 6, 0, 0]}
            maxBarSize={isVertical ? 28 : norm.length > 1 ? 24 : 44}
          />
        ))}
      </BarChart>
    )
  } else if (type === CHART_TYPE.AREA && !norm.some((s) => s.type)) {
    chart = (
      <AreaChart data={data} margin={{top: 8, right: 16, left: 0, bottom: 0}}>
        {areaDefs}
        {cartesian(catX, catY)}
        {norm.map((s) => (
          <Area
            key={s.key}
            name={s.label}
            type="monotone"
            dataKey={s.key}
            stroke={s.color}
            fill={`url(#${s.gradId})`}
            strokeWidth={2}
            strokeDasharray={s.dashed ? '5 3' : undefined}
            stackId={stacked ? 'stack' : undefined}
            dot={false}
            activeDot={{r: 5}}
          />
        ))}
      </AreaChart>
    )
  } else if (type === CHART_TYPE.LINE && !norm.some((s) => s.type)) {
    chart = (
      <LineChart data={data} margin={{top: 8, right: 16, left: 0, bottom: 0}}>
        {cartesian(catX, catY)}
        {norm.map((s) => (
          <Line
            key={s.key}
            name={s.label}
            type="monotone"
            dataKey={s.key}
            stroke={s.color}
            strokeWidth={2}
            strokeDasharray={s.dashed ? '5 3' : undefined}
            dot={{r: 3, fill: s.color, strokeWidth: 0}}
            activeDot={{r: 5}}
          />
        ))}
      </LineChart>
    )
  } else {
    // composed — 계열별 type override
    chart = (
      <ComposedChart data={data} margin={{top: 8, right: 16, left: 0, bottom: 0}}>
        {areaDefs}
        {cartesian(catX, catY)}
        {norm.map((s) => {
          const seriesType = s.type ?? type
          if (seriesType === 'bar') {
            return (
              <Bar key={s.key} name={s.label} dataKey={s.key} fill={s.color} radius={[6, 6, 0, 0]} maxBarSize={40} />
            )
          }
          if (seriesType === 'area') {
            return (
              <Area
                key={s.key}
                name={s.label}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                fill={`url(#${s.gradId})`}
                strokeWidth={2}
                dot={false}
              />
            )
          }
          return (
            <Line
              key={s.key}
              name={s.label}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={2}
              strokeDasharray={s.dashed ? '5 3' : undefined}
              dot={{r: 3, fill: s.color, strokeWidth: 0}}
              activeDot={{r: 5}}
            />
          )
        })}
      </ComposedChart>
    )
  }

  return (
    <div ref={ref} className={cx(styles.bsChart, resolveClassNames(classNames))} style={{height}}>
      <ResponsiveContainer width="100%" height="100%">
        {chart}
      </ResponsiveContainer>
    </div>
  )
})
