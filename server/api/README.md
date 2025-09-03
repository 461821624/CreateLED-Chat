# API 接口文档

本文档描述了 conversations 和 messages 表的增删改查 API 接口。

## 会话 (Conversations) API

### 1. 获取会话列表

**GET** `/api/conversations`

**查询参数:**
- `owner` (可选): 用户ID，过滤特定用户的会话
- `limit` (可选): 每页数量，默认50，最大100
- `offset` (可选): 偏移量，默认0

**响应示例:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "owner": "user123",
      "title": "会话标题",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 1
  }
}
```

### 2. 获取单个会话

**GET** `/api/conversations/{id}`

**路径参数:**
- `id`: 会话ID (UUID)

**响应示例:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "owner": "user123",
    "title": "会话标题",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### 3. 创建会话

**POST** `/api/conversations`

**请求体:**
```json
{
  "owner": "user123",
  "title": "新会话标题"
}
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "owner": "user123",
    "title": "新会话标题",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "message": "会话创建成功"
}
```

### 4. 更新会话

**PUT** `/api/conversations/{id}`

**路径参数:**
- `id`: 会话ID (UUID)

**请求体:**
```json
{
  "title": "更新后的标题"
}
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "owner": "user123",
    "title": "更新后的标题",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T01:00:00Z"
  },
  "message": "会话更新成功"
}
```

### 5. 删除会话

**DELETE** `/api/conversations/{id}`

**路径参数:**
- `id`: 会话ID (UUID)

**响应示例:**
```json
{
  "success": true,
  "message": "会话删除成功"
}
```

## 消息 (Messages) API

### 1. 获取消息列表

**GET** `/api/messages`

**查询参数:**
- `conversation_id` (必需): 会话ID
- `limit` (可选): 每页数量，默认50，最大100
- `offset` (可选): 偏移量，默认0

**响应示例:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "conversation_id": "uuid",
      "role": "user",
      "content": "消息内容",
      "metadata": {},
      "token_count": 10,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 1
  }
}
```

### 2. 获取单个消息

**GET** `/api/messages/{id}`

**路径参数:**
- `id`: 消息ID (UUID)

**响应示例:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "conversation_id": "uuid",
    "role": "user",
    "content": "消息内容",
    "metadata": {},
    "token_count": 10,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### 3. 创建消息

**POST** `/api/messages`

**请求体:**
```json
{
  "conversation_id": "uuid",
  "role": "user",
  "content": "用户消息内容",
  "metadata": {
    "source": "web"
  },
  "token_count": 15
}
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "conversation_id": "uuid",
    "role": "user",
    "content": "用户消息内容",
    "metadata": {
      "source": "web"
    },
    "token_count": 15,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "消息创建成功"
}
```

### 4. 更新消息

**PUT** `/api/messages/{id}`

**路径参数:**
- `id`: 消息ID (UUID)

**请求体:**
```json
{
  "content": "更新后的消息内容",
  "token_count": 20
}
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "conversation_id": "uuid",
    "role": "user",
    "content": "更新后的消息内容",
    "metadata": {},
    "token_count": 20,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "消息更新成功"
}
```

### 5. 删除消息

**DELETE** `/api/messages/{id}`

**路径参数:**
- `id`: 消息ID (UUID)

**响应示例:**
```json
{
  "success": true,
  "message": "消息删除成功"
}
```

## 错误响应格式

所有API在出错时都会返回统一的错误格式：

```json
{
  "statusCode": 400,
  "statusMessage": "请求数据格式错误",
  "data": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["title"],
      "message": "Required"
    }
  ]
}
```

## 数据验证规则

### 会话 (Conversations)
- `owner`: 字符串，1-100字符
- `title`: 字符串，1-200字符

### 消息 (Messages)
- `conversation_id`: UUID格式
- `role`: 枚举值 ('user', 'assistant', 'system')
- `content`: 字符串，1-10000字符
- `metadata`: 对象，可选
- `token_count`: 非负整数，可选

## 注意事项

1. 所有ID参数必须是有效的UUID格式
2. 删除会话时会自动删除其所有相关消息
3. 创建或更新消息时会自动更新对应会话的 `updated_at` 时间戳
4. 分页参数 `limit` 最大值为100
5. 所有时间戳都使用ISO 8601格式