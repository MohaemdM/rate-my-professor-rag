'use client'
import { Box, Button, Stack, TextField, Typography, Switch, useMediaQuery, CircularProgress } from '@mui/material'
import { useState, useMemo, useEffect, useRef } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ])
  const [message, setMessage] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const isMobile = useMediaQuery('(max-width:600px)')
  const chatEndRef = useRef(null)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#90caf9' : '#1976d2',
          },
          secondary: {
            main: darkMode ? '#f48fb1' : '#d32f2f',
          },
        },
      }),
    [darkMode]
  )

  const sendMessage = async () => {
    if (!message.trim()) return

    const newMessage = { role: 'user', content: message }
    setMessage('')
    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage,
      { role: 'assistant', content: '' },
    ])
    setIsTyping(true) // Start typing indicator

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, newMessage]),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let result = ''

      reader.read().then(function processText({ done, value }) {
        if (done) {
          setIsTyping(false) // Stop typing indicator
          return result
        }

        const text = decoder.decode(value || new Uint8Array(), { stream: true })
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1]
          const otherMessages = prevMessages.slice(0, prevMessages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })

        return reader.read().then(processText)
      })
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: 'There was an error processing your request. Please try again.',
        },
      ])
      setIsTyping(false) // Stop typing indicator in case of error
    }
  }

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="background.default"
        p={isMobile ? 1 : 2}
      >
        <Stack
          direction="column"
          width="100%"
          maxWidth={isMobile ? '100%' : '500px'}
          height="100%"
          maxHeight={isMobile ? '100%' : '700px'}
          bgcolor="background.paper"
          borderRadius={isMobile ? 0 : 4}
          boxShadow={isMobile ? 0 : 3}
          p={isMobile ? 2 : 3}
          spacing={3}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" color="text.primary">
              Rate My Professor Assistant
            </Typography>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="default"
            />
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
              >
                <Box
  bgcolor={
    message.role === 'assistant'
      ? 'primary.light'
      : 'secondary.light'
  }
  color="text.primary"
  borderRadius={4} // Reduced border radius for less round corners
  p={2}
  maxWidth="75%"
  boxShadow={2}
  sx={{
    wordWrap: 'break-word', // Ensures long words wrap to the next line
    lineHeight: 1.5, // Adjusts line height to prevent text from overlapping
    whiteSpace: 'pre-wrap', // Ensures that text respects line breaks and wraps as needed
    boxSizing: 'border-box' // Includes padding and borders in the element's width/height
  }}
>
                  {message.content}
                </Box>
              </Box>
            ))}
            {isTyping && (
              <Box display="flex" justifyContent="flex-start" p={2}>
                <CircularProgress size={24} />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Assistant is typing...
                </Typography>
              </Box>
            )}
            <div ref={chatEndRef} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Type your message..."
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage()
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              sx={{
                borderRadius: '50%',
                minWidth: '50px',
                minHeight: '50px',
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  )
}
