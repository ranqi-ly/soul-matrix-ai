// 实现一个简单的请求队列
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private requestInterval = 20000; // 20秒间隔

  async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      if (!this.processing) {
        this.process();
      }
    });
  }

  private async process() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const request = this.queue.shift();

    if (request) {
      try {
        await request();
      } catch (error) {
        console.error('Queue processing error:', error);
      }

      // 等待指定时间间隔后处理下一个请求
      await new Promise(resolve => setTimeout(resolve, this.requestInterval));
      this.process();
    }
  }
}

export const apiQueue = new RequestQueue();
