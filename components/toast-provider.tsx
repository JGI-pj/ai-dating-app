'use client'

import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          style: {
            background: 'rgb(34 197 94)',
          },
        },
        error: {
          style: {
            background: 'rgb(239 68 68)',
          },
        },
      }}
    />
  )
}