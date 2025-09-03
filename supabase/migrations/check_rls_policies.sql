-- 删除现有策略（如果存在）
DROP POLICY IF EXISTS "Users can create their own conversations" ON conversations;
DROP POLICY IF EXISTS "Users can view their own conversations" ON conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON conversations;
DROP POLICY IF EXISTS "Users can delete their own conversations" ON conversations;

-- 创建基本的 RLS 策略
-- 允许用户创建自己的会话
CREATE POLICY "Users can create their own conversations" 
ON conversations 
FOR INSERT 
WITH CHECK (auth.uid() = owner);

-- 允许用户查看自己的会话
CREATE POLICY "Users can view their own conversations" 
ON conversations 
FOR SELECT 
USING (auth.uid() = owner);

-- 允许用户更新自己的会话
CREATE POLICY "Users can update their own conversations" 
ON conversations 
FOR UPDATE 
USING (auth.uid() = owner);

-- 允许用户删除自己的会话
CREATE POLICY "Users can delete their own conversations" 
ON conversations 
FOR DELETE 
USING (auth.uid() = owner);