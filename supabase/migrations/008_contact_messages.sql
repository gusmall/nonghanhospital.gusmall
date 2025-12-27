-- =============================================
-- Contact Messages Table
-- For storing messages from the Contact Us form
-- =============================================

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now() -- Copied trigger logic will handle this
);

-- Add comments
COMMENT ON TABLE public.contact_messages IS 'ตารางเก็บข้อความจากฟอร์มติดต่อเรา';
COMMENT ON COLUMN public.contact_messages.is_read IS 'สถานะการอ่านข้อความ';

-- =============================================
-- RLS POLICIES
-- =============================================
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can view messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can update messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can delete messages" ON public.contact_messages;

-- Public: Anyone can send a message (Insert only)
CREATE POLICY "Anyone can insert messages"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Admin: Can view, update (mark read), delete
-- Note: In production, check for admin role. Using true for now as requested.
CREATE POLICY "Admin can view messages"
  ON public.contact_messages
  FOR SELECT
  USING (true);

CREATE POLICY "Admin can update messages"
  ON public.contact_messages
  FOR UPDATE
  USING (true);

CREATE POLICY "Admin can delete messages"
  ON public.contact_messages
  FOR DELETE
  USING (true);

-- =============================================
-- TRIGGERS
-- =============================================
-- Re-use the existing function update_updated_at_column

DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON public.contact_messages;

CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON public.contact_messages(is_read);
