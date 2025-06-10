
-- ایجاد enum برای وضعیت ارسال در صورت عدم وجود
DO $$ BEGIN
    CREATE TYPE submission_status AS ENUM ('pending', 'under_review', 'accepted', 'rejected', 'revision_required');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- بررسی و بهبود جدول submissions
DO $$ 
BEGIN
    -- اضافه کردن ستون status در صورت عدم وجود
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'submissions' AND column_name = 'status') THEN
        ALTER TABLE public.submissions ADD COLUMN status submission_status DEFAULT 'pending';
    END IF;
    
    -- اضافه کردن ستون title در صورت عدم وجود
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'submissions' AND column_name = 'title') THEN
        ALTER TABLE public.submissions ADD COLUMN title TEXT NOT NULL DEFAULT '';
    END IF;
    
    -- اضافه کردن ستون abstract در صورت عدم وجود
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'submissions' AND column_name = 'abstract') THEN
        ALTER TABLE public.submissions ADD COLUMN abstract TEXT;
    END IF;
END $$;

-- ایجاد index برای بهبود عملکرد جستجو
CREATE INDEX IF NOT EXISTS idx_submissions_user_title ON public.submissions(user_id, title);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);

-- تابع بررسی ارسال مجدد مقاله
CREATE OR REPLACE FUNCTION check_duplicate_submission(p_user_id UUID, p_title TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- بررسی وجود مقاله با همین عنوان توسط همین کاربر که در حال بررسی است
    RETURN EXISTS (
        SELECT 1 FROM public.submissions 
        WHERE user_id = p_user_id 
        AND LOWER(TRIM(title)) = LOWER(TRIM(p_title))
        AND status IN ('pending', 'under_review', 'revision_required')
    );
END;
$$;
