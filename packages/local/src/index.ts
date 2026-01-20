import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { createServer, Server } from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import fsSync from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app: Application = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// API Routes

/**
 * Get directory listing
 */
app.get('/api/fs/list', async (req: Request, res: Response): Promise<void> => {
  try {
    const dirPath = req.query.path as string
    if (!dirPath) {
      res.status(400).json({ error: 'Path parameter is required' })
      return
    }

    const absolutePath = path.resolve(dirPath)
    const entries = await fs.readdir(absolutePath, { withFileTypes: true })
    
    const items = entries.map(entry => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
      isFile: entry.isFile(),
      path: path.join(absolutePath, entry.name)
    }))

    res.json({ path: absolutePath, items })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

/**
 * Read file content
 */
app.get('/api/fs/read', async (req: Request, res: Response): Promise<void> => {
  try {
    const filePath = req.query.path as string
    if (!filePath) {
      res.status(400).json({ error: 'Path parameter is required' })
      return
    }

    const absolutePath = path.resolve(filePath)
    const content = await fs.readFile(absolutePath, 'utf-8')
    
    res.json({ path: absolutePath, content })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

/**
 * Write file content
 */
app.post('/api/fs/write', async (req: Request, res: Response): Promise<void> => {
  try {
    const { path: filePath, content } = req.body
    if (!filePath) {
      res.status(400).json({ error: 'Path is required' })
      return
    }

    const absolutePath = path.resolve(filePath)
    await fs.writeFile(absolutePath, content, 'utf-8')
    
    res.json({ success: true, path: absolutePath })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

/**
 * Create directory
 */
app.post('/api/fs/mkdir', async (req: Request, res: Response): Promise<void> => {
  try {
    const { path: dirPath } = req.body
    if (!dirPath) {
      res.status(400).json({ error: 'Path is required' })
      return
    }

    const absolutePath = path.resolve(dirPath)
    await fs.mkdir(absolutePath, { recursive: true })
    
    res.json({ success: true, path: absolutePath })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

/**
 * Delete file or directory
 */
app.delete('/api/fs/delete', async (req: Request, res: Response): Promise<void> => {
  try {
    const filePath = req.query.path as string
    if (!filePath) {
      res.status(400).json({ error: 'Path parameter is required' })
      return
    }

    const absolutePath = path.resolve(filePath)
    await fs.rm(absolutePath, { recursive: true })
    
    res.json({ success: true, path: absolutePath })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

/**
 * Get file/directory stats
 */
app.get('/api/fs/stat', async (req: Request, res: Response): Promise<void> => {
  try {
    const filePath = req.query.path as string
    if (!filePath) {
      res.status(400).json({ error: 'Path parameter is required' })
      return
    }

    const absolutePath = path.resolve(filePath)
    const stats = await fs.stat(absolutePath)
    
    res.json({
      path: absolutePath,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime
    })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

/**
 * Check if path exists
 */
app.get('/api/fs/exists', async (req: Request, res: Response): Promise<void> => {
  try {
    const filePath = req.query.path as string
    if (!filePath) {
      res.status(400).json({ error: 'Path parameter is required' })
      return
    }

    const absolutePath = path.resolve(filePath)
    const exists = fsSync.existsSync(absolutePath)
    
    res.json({ path: absolutePath, exists })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok', provider: 'local' })
})

// In production, serve the webui static files
const webuiDistPath = path.join(__dirname, '..', 'webui')
if (fsSync.existsSync(webuiDistPath)) {
  app.use(express.static(webuiDistPath))
  app.get('*', (_req: Request, res: Response): void => {
    res.sendFile(path.join(webuiDistPath, 'index.html'))
  })
}

const server: Server = createServer(app)

server.listen(PORT, () => {
  console.log(`🚀 Local server is running on http://localhost:${PORT}`)
  console.log(`📁 File system API available at http://localhost:${PORT}/api/fs`)
})

export { app, server }
