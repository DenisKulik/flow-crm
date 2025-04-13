import { toast } from '~/components/ui/toast'

type ToastVariant = 'default' | 'destructive' | null | undefined

export const showErrorToast = (error: unknown, fallback = 'Something went wrong, please try again.') => {
  toast({
    title: 'Error',
    description: error instanceof Error ? error.message : fallback,
    variant: 'destructive'
  })
}
