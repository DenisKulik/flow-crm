import { Temporal } from '@js-temporal/polyfill'

import { toast } from '~/components/ui/toast'

export const showErrorToast = (error: unknown, fallback = 'Something went wrong, please try again.') => {
  toast({
    title: 'Error',
    description: error instanceof Error ? error.message : fallback,
    variant: 'destructive'
  })
}

export const formatDate = (date: string) => {
  return Temporal.Instant.from(date)
    .toZonedDateTimeISO('UTC')
    .toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

export const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
