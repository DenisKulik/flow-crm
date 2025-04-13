import { toast } from '~/components/ui/toast'

export const showErrorToast = (error: unknown, fallback = 'Something went wrong, please try again.') => {
  toast({
    title: 'Error',
    description: error instanceof Error ? error.message : fallback,
    variant: 'destructive'
  })
}
