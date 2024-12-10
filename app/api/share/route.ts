import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import cache from 'memory-cache'

const SHARE_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7天缓存

export async function POST(request: Request) {
  try {
    const { result } = await request.json()
    
    // 生成唯一的分享ID
    const shareId = nanoid()
    
    // 将结果存储在缓存中
    cache.put(`share:${shareId}`, result, SHARE_CACHE_DURATION)
    
    return NextResponse.json({ shareId })
  } catch (error) {
    console.error('分享结果保存失败:', error)
    return NextResponse.json(
      { error: '保存分享结果失败' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const shareId = url.searchParams.get('id')
    
    if (!shareId) {
      return NextResponse.json(
        { error: '分享ID不能为空' },
        { status: 400 }
      )
    }
    
    // 从缓存中获取结果
    const result = cache.get(`share:${shareId}`)
    
    if (!result) {
      return NextResponse.json(
        { error: '分享内容不存在或已过期' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ result })
  } catch (error) {
    console.error('获取分享结果失败:', error)
    return NextResponse.json(
      { error: '获取分享结果失败' },
      { status: 500 }
    )
  }
}
