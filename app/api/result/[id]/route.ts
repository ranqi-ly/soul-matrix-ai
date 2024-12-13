import { NextRequest, NextResponse } from 'next/server';
import cache from 'memory-cache';

// 设置缓存时间为30分钟
const CACHE_DURATION = parseInt(process.env.CACHE_DURATION || '1800000'); // 30分钟

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // 确保在使用之前正确获取 id
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: {
          message: '缺少结果ID'
        }
      }, { status: 400 });
    }

    // 获取缓存的结果
    const result = cache.get(id);
    const cacheTime = cache.get(`cacheTime_${id}`);

    if (!result) {
      return NextResponse.json({
        success: false,
        error: {
          message: '结果不存在或已过期'
        }
      }, { status: 404 });
    }

    // 检查缓存是否过期
    if (cacheTime && Date.now() - cacheTime > CACHE_DURATION) {
      cache.del(id);
      cache.del(`cacheTime_${id}`);
      return NextResponse.json({
        success: false,
        error: {
          message: '结果已过期'
        }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('获取结果时出错:', error);
    return NextResponse.json({
      success: false,
      error: {
        message: '获取结果时出错'
      }
    }, { status: 500 });
  }
}
