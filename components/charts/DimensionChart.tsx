'use client'

import { ResponsiveRadar } from '@nivo/radar'
import { cn } from '@/lib/utils'

interface DimensionChartProps {
  dimensions: Record<string, number>
  width?: number
  height?: number
  className?: string
}

export function DimensionChart({ dimensions, className }: DimensionChartProps) {
  // 转换数据格式为 Nivo 需要的格式
  const chartData = Object.entries(dimensions).map(([key, value]) => ({
    dimension: key,
    value: value
  }))

  console.log('DimensionChart received dimensions:', dimensions)
  console.log('Transformed data for chart:', chartData)

  if (Object.keys(dimensions).length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        维度数据格式错误
      </div>
    )
  }

  return (
    <div className={cn('w-full h-full min-h-[500px]', className)}>
      <ResponsiveRadar
        data={chartData}
        keys={['value']}
        indexBy="dimension"
        maxValue={100}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ theme: 'background' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={20}
        enableDots={true}
        dotSize={8}
        dotColor="#FF69B4"
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel={function(dot) {
          return `${Math.round(dot.value)}`;
        }}
        dotLabelYOffset={-12}
        colors={['rgba(255, 105, 180, 0.6)']}
        fillOpacity={0.35}
        blendMode="multiply"
        motionConfig="gentle"
        theme={{
          background: 'transparent',
          textColor: '#4A5568',
          fontSize: 12,
          grid: {
            line: {
              stroke: '#FFC0CB',
              strokeWidth: 1,
              strokeDasharray: '4 4',
            },
          },
          dots: {
            text: {
              fontSize: 12,
              fontWeight: 600,
              fill: '#4A5568',
            },
          },
        }}
      />
    </div>
  )
}
