import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Copy, QrCode } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

interface InvitePanelProps {
  inviteId: string
  onClose: () => void
}

export default function InvitePanel({ inviteId, onClose }: InvitePanelProps) {
  const [copied, setCopied] = useState(false)
  const inviteUrl = `${window.location.origin}/invite/${inviteId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl)
      setCopied(true)
      toast({
        title: '复制成功',
        description: '邀请链接已复制到剪贴板',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: '复制失败',
        description: '无法复制到剪贴板，请手动复制',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>邀请填写</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input
              value={inviteUrl}
              readOnly
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white p-2 rounded-lg">
              <QRCodeSVG value={inviteUrl} size={200} />
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            将此链接分享给您的伴侣，邀请他/她完成测评问卷
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
