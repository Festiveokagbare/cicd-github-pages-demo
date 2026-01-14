import { render, screen } from '@testing-library/react'
import App from './App'

test('renders store dashboard title', () => {
  render(<App />)
  const title = screen.getByText(/store dashboard/i)
  expect(title).toBeInTheDocument()
})
