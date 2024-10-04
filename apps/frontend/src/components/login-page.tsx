import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PASSWORD } from '@/utils/env'
import { useAppStore } from '@/store/appStore'

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length: number;
  label: string;
  inputMode?: 'numeric' | 'text';
}

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange, length, label, inputMode = "numeric" }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value
    if (newValue.length <= 1 && !isNaN(Number(newValue))) {
      const newOTP = value.split('')
      newOTP[index] = newValue
      onChange(newOTP.join(''))
      if (newValue && e.target.nextSibling) {
        (e.target.nextSibling as HTMLInputElement).focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      const newOTP = value.split('')
      newOTP[index - 1] = ''
      onChange(newOTP.join(''))
      if (e.currentTarget.previousSibling) {
        (e.currentTarget.previousSibling as HTMLInputElement).focus()
      }
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        {Array.from({ length }, (_, i) => (
          <Input
            key={i}
            type="text"
            inputMode={inputMode}
            maxLength={1}
            value={value[i] || ''}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-12 h-12 text-center text-2xl"
          />
        ))}
      </div>
    </div>
  )
}

export default function LoginPage() {
  const [tableNumber, setTableNumber] = useState('')
  const [password, setPassword] = useState('')
  const setStoreTableNumber = useAppStore(state => state.setTableNumber)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === PASSWORD) {
      setStoreTableNumber(tableNumber)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center text-lg">
            Please enter the table number and password to start
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <OTPInput
              value={tableNumber}
              onChange={setTableNumber}
              length={2}
              label="Table Number"
            />
            <OTPInput
              value={password}
              onChange={setPassword}
              length={6}
              label="Password"
              inputMode="numeric"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full text-lg py-6">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}