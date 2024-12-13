import { ResponsiveRadar } from '@nivo/radar'
import { cn } from '@/lib/utils'
import { formatDimensionData } from '@/utils/analysis'

interface RadarChartProps {
  data: Record<string, number>
  className?: string
}

export function RadarChart({ data, className }: RadarChartProps) {
  const formattedData = formatDimensionData(data)
  
  if (!formattedData || formattedData.length === 0) {
    return (
      <div className={cn("flex items-center justify-center h-[300px]", className)}>
        暂无数据
      </div>
    )
  }

  return (
    <div className={cn("h-[300px]", className)}>
      <ResponsiveRadar
        data={formattedData}
        keys={["value"]}
        indexBy="dimension"
        maxValue={100}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        borderWidth={2}
        gridLabelOffset={24}
        dotSize={8}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={{ scheme: "category10" }}
        blendMode="multiply"
        motionConfig="gentle"
        gridShape="circular"
        theme={{
          text: {
            fontSize: 12,
            fill: "#374151",
          },
          grid: {
            line: {
              stroke: "#E5E7EB",
            },
          },
        }}
      />
    </div>
  )
}
