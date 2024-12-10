import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Share2, Copy } from 'lucide-react'
import { QRCodeSVG as QRCode } from 'qrcode.react'

interface ShareResultPanelProps {
  result: any
  shareId?: string
}

export function ShareResultPanel({ result, shareId }: ShareResultPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [shouldGenerate, setShouldGenerate] = useState(false)

  const generateShareUrl = useCallback(async () => {
    if (isGenerating) return
    
    setIsGenerating(true)
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result }),
      })
      
      const data = await response.json()
      const url = `${window.location.origin}/share/${data.shareId}`
      setShareUrl(url)
    } catch (error) {
      console.error('生成分享链接失败:', error)
      toast({
        title: '分享失败',
        description: '生成分享链接时出现错误，请稍后重试',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
      setShouldGenerate(false)
    }
  }, [result, isGenerating])

  useEffect(() => {
    if (shouldGenerate && !shareUrl && !isGenerating) {
      generateShareUrl()
    }
  }, [shouldGenerate, shareUrl, isGenerating, generateShareUrl])

  const handleShare = useCallback(() => {
    setIsOpen(true)
    if (!shareUrl) {
      setShouldGenerate(true)
    }
  }, [shareUrl])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: '复制成功',
        description: '分享链接已复制到剪贴板',
      })
    } catch (error) {
      toast({
        title: '复制失败',
        description: '无法复制到剪贴板，请手动复制',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleShare}
          variant="outline"
          className="gap-2"
        >
          <Share2 className="w-4 h-4" />
          分享结果
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>分享评估结果</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              value={shareUrl}
              readOnly
              className="flex-1"
              placeholder={isGenerating ? "正在生成分享链接..." : "分享链接将在这里显示"}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              disabled={!shareUrl || isGenerating}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg">
              {shareUrl && (
                <div className="qrcode-wrapper">
                  <QRCode 
                    value={shareUrl} 
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              )}
              {!shareUrl && isGenerating && (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-400">
                  生成中...
                </div>
              )}
              {!shareUrl && !isGenerating && (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-400">
                  二维码将在这里显示
                </div>
              )}
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            扫描二维码或复制链接分享给好友
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
