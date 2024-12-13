import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import cache from 'memory-cache'

const INVITE_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7天缓存

export async function POST(request: Request) {
  try {
    const { person1Answers } = await request.json()
    
    // 生成唯一的邀请ID
    const inviteId = nanoid()
    
    // 将第一个人的答案存储在缓存中
    cache.put(`invite:${inviteId}`, {
      person1Answers,
      createdAt: new Date().toISOString()
    }, INVITE_CACHE_DURATION)
    
    return NextResponse.json({ inviteId })
  } catch (error) {
    console.error('创建邀请失败:', error)
    return NextResponse.json(
      { error: '创建邀请失败' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const inviteId = url.searchParams.get('id')
    
    if (!inviteId) {
      return NextResponse.json(
        { error: '邀请ID不能为空' },
        { status: 400 }
      )
    }
    
    // 从缓存中获取第一个人的答案
    const inviteData = cache.get(`invite:${inviteId}`)
    
    if (!inviteData) {
      return NextResponse.json(
        { error: '邀请不存在或已过期' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(inviteData)
  } catch (error) {
    console.error('获取邀请数据失败:', error)
    return NextResponse.json(
      { error: '获取邀请数据失败' },
      { status: 500 }
    )
  }
}
