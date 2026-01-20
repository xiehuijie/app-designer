<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Graph } from '@antv/x6'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { setProvider, getProvider, type FileEntry } from './provider'
import { createRemoteProvider } from './provider/remote'

const containerRef = ref<HTMLDivElement | null>(null)

// PrimeVue demo
const buttonText = ref('Click Me!')
const messageText = ref('Welcome to PrimeVue!')

const handleButtonClick = () => {
  messageText.value = `Button clicked at ${new Date().toLocaleTimeString()}`
}

// Provider 测试相关
const providerStatus = ref<'idle' | 'loading' | 'connected' | 'error'>('idle')
const providerMessage = ref('')
const directoryPath = ref('/workspaces/app-designer')
const directoryItems = ref<FileEntry[]>([])
const isLoadingDir = ref(false)
const dirError = ref('')

// 初始化 Provider
const initProvider = async () => {
  providerStatus.value = 'loading'
  providerMessage.value = '正在连接到后端服务...'
  
  try {
    const provider = createRemoteProvider('http://localhost:3001')
    setProvider(provider)
    
    // 健康检查
    const health = await provider.healthCheck()
    providerStatus.value = 'connected'
    providerMessage.value = `已连接到 ${health.provider} 后端，状态: ${health.status}`
  } catch (error) {
    providerStatus.value = 'error'
    providerMessage.value = `连接失败: ${(error as Error).message}`
  }
}

// 列出目录内容
const listDirectory = async () => {
  if (providerStatus.value !== 'connected') {
    dirError.value = '请先连接到后端服务'
    return
  }
  
  isLoadingDir.value = true
  dirError.value = ''
  directoryItems.value = []
  
  try {
    const provider = getProvider()
    const result = await provider.listDirectory(directoryPath.value)
    directoryItems.value = result.items
  } catch (error) {
    dirError.value = `读取目录失败: ${(error as Error).message}`
  } finally {
    isLoadingDir.value = false
  }
}

// 点击目录项导航
const navigateTo = (item: FileEntry) => {
  if (item.isDirectory) {
    directoryPath.value = item.path
    listDirectory()
  }
}

// 返回上级目录
const goUp = () => {
  const parts = directoryPath.value.split('/')
  if (parts.length > 1) {
    parts.pop()
    directoryPath.value = parts.join('/') || '/'
    listDirectory()
  }
}

// X6 graph initialization
onMounted(() => {
  if (containerRef.value) {
    const graph = new Graph({
      container: containerRef.value,
      width: 800,
      height: 600,
      background: {
        color: '#F2F7FA'
      },
      grid: {
        size: 10,
        visible: true
      }
    })

    // Add some sample nodes and edges
    graph.addNode({
      id: 'node-1',
      shape: 'rect',
      x: 100,
      y: 100,
      width: 100,
      height: 60,
      label: 'Node 1',
      attrs: {
        body: {
          fill: '#5F95FF',
          stroke: '#0051CC'
        },
        label: {
          fill: '#ffffff',
          fontSize: 14
        }
      }
    })

    graph.addNode({
      id: 'node-2',
      shape: 'rect',
      x: 320,
      y: 100,
      width: 100,
      height: 60,
      label: 'Node 2',
      attrs: {
        body: {
          fill: '#F08080',
          stroke: '#D82828'
        },
        label: {
          fill: '#ffffff',
          fontSize: 14
        }
      }
    })

    graph.addEdge({
      source: 'node-1',
      target: 'node-2',
      attrs: {
        line: {
          stroke: '#999999',
          strokeWidth: 2
        }
      }
    })
  }
})
</script>

<template>
  <div class="app-container">
    <h1>Vue 3 + PrimeVue + AntV X6 Demo</h1>
    
    <!-- Provider 测试区域 -->
    <div class="demo-section">
      <Card>
        <template #title>🔌 Provider 连接测试</template>
        <template #subtitle>测试与 @app-designer/local 后端的连接</template>
        <template #content>
          <div class="provider-demo">
            <div class="connection-status">
              <span 
                class="status-indicator" 
                :class="{
                  'status-idle': providerStatus === 'idle',
                  'status-loading': providerStatus === 'loading',
                  'status-connected': providerStatus === 'connected',
                  'status-error': providerStatus === 'error'
                }"
              ></span>
              <span>{{ providerMessage || '未连接' }}</span>
            </div>
            <Button 
              label="连接后端" 
              @click="initProvider"
              :loading="providerStatus === 'loading'"
              :disabled="providerStatus === 'connected'"
              class="p-button-primary"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- 文件系统浏览器 -->
    <div class="demo-section" v-if="providerStatus === 'connected'">
      <Card>
        <template #title>📁 文件系统浏览器</template>
        <template #subtitle>通过 Provider 访问本地文件系统</template>
        <template #content>
          <div class="file-browser">
            <div class="path-input">
              <input 
                v-model="directoryPath" 
                type="text" 
                placeholder="输入目录路径"
                @keyup.enter="listDirectory"
              />
              <Button label="浏览" @click="listDirectory" :loading="isLoadingDir" />
              <Button label="↑ 上级" @click="goUp" severity="secondary" />
            </div>
            
            <div v-if="dirError" class="error-message">{{ dirError }}</div>
            
            <div class="file-list" v-if="directoryItems.length > 0">
              <div 
                v-for="item in directoryItems" 
                :key="item.path"
                class="file-item"
                :class="{ 'is-directory': item.isDirectory }"
                @click="navigateTo(item)"
              >
                <span class="file-icon">{{ item.isDirectory ? '📂' : '📄' }}</span>
                <span class="file-name">{{ item.name }}</span>
              </div>
            </div>
            
            <div v-else-if="!isLoadingDir && !dirError" class="empty-message">
              点击"浏览"按钮查看目录内容
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div class="demo-section">
      <Card>
        <template #title>PrimeVue Components Demo</template>
        <template #subtitle>Interactive PrimeVue Button Component</template>
        <template #content>
          <div class="primevue-demo">
            <Button 
              :label="buttonText" 
              @click="handleButtonClick"
              class="p-button-success"
            />
            <p class="message">{{ messageText }}</p>
          </div>
        </template>
      </Card>
    </div>

    <div class="demo-section">
      <Card>
        <template #title>AntV X6 Graph Editor Demo</template>
        <template #subtitle>Interactive Graph with Nodes and Edges</template>
        <template #content>
          <div 
            ref="containerRef" 
            class="x6-container"
          ></div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

h1 {
  text-align: center;
  color: #ffffff;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.demo-section {
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.primevue-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.message {
  font-size: 1.1rem;
  color: #333;
  min-height: 1.5rem;
  margin: 0;
}

.x6-container {
  width: 100%;
  height: 600px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #f5f5f5;
}

/* Provider 测试样式 */
.provider-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.status-idle {
  background-color: #9e9e9e;
}

.status-loading {
  background-color: #ff9800;
  animation: pulse 1s infinite;
}

.status-connected {
  background-color: #4caf50;
}

.status-error {
  background-color: #f44336;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 文件浏览器样式 */
.file-browser {
  padding: 1rem;
}

.path-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.path-input input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
}

.file-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.file-item:hover {
  background-color: #f5f5f5;
}

.file-item.is-directory {
  font-weight: 500;
}

.file-item:last-child {
  border-bottom: none;
}

.file-icon {
  font-size: 1.2rem;
}

.file-name {
  flex: 1;
}

.error-message {
  color: #f44336;
  padding: 0.5rem;
  background-color: #ffebee;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.empty-message {
  color: #666;
  text-align: center;
  padding: 2rem;
}
</style>
