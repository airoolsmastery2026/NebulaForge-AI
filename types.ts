export enum Page {
    // Group 1: Main Navigation
    DASHBOARD = 'Dashboard', // Trang chủ
    AI_SYSTEM_OVERVIEW = 'AI System Overview',
    CONTROL_CENTER = 'Control Center',
    AUTOMATION = 'Automation', // Tự động hóa đa nền tảng
    APP_GUIDE = 'App Guide', // Kho tài liệu / Hướng dẫn
    
    // Group 2: AI Modules
    PRODUCT_SCOUT = 'Product Scout',
    CONTENT_GENERATOR = 'Content Generator', // AI Script Generator
    PUBLISHER = 'Publisher',
    AI_VIDEO_STUDIO = 'AI Video Studio',
    RENDER_QUEUE = 'Render Queue',
    PROMPT_TEMPLATES = 'Prompt Templates',
    AI_REVIEW_MARKETPLACE = 'AI Review Marketplace',
    AI_VIDEO_SELLING_AUTOMATION = 'AI Video Selling Automation',
    AI_SOCIAL_POSTING = 'AI Social Posting',

    // Group 3: Social Media
    FACEBOOK_HUB = 'Facebook Control Hub',
    TIKTOK_HUB = 'TikTok Automation',
    YOUTUBE_HUB = 'YouTube Studio AI',
    ZALO_HUB = 'Zalo OA Manager',
    TELEGRAM_HUB = 'Telegram Automation',
    INSTAGRAM_HUB = 'Instagram Boost Panel',
    X_HUB = 'Twitter/X Auto-Agent',

    // Group 4: E-commerce
    SHOPEE_HUB = 'Shopee Seller AI',
    LAZADA_HUB = 'Lazada Seller AI',
    TIKI_HUB = 'Tiki Seller Center',
    AMAZON_HUB = 'Amazon FBA Panel',

    // Group 5: System Settings
    CONNECTIONS = 'Connections', // Cài API / OAuth
    ANALYTICS = 'Analytics',
    GITHUB_SYNC = 'GitHub Sync',
    API_DOCS = 'API Docs',
    SUPABASE_GUIDE = 'Supabase Guide',
    DEBUGGING_GUIDE = 'Debugging Guide',
}


export interface Product {
    id: string;
    name: string;
    description: string;
    features: string;
    affiliateLink: string;
    commission?: number;
    rating?: number;
    conversions?: number;
}

export interface GeneratedContent {
    script?: string;
    titles?: string[];
    seoDescription?: string;
    captions?: {
        caption: string;
        hashtags: string[];
    };
}

export interface ProductWithContent extends Product {
    content: GeneratedContent;
}

export enum GenerationType {
    SCRIPT = 'script',
    TITLES = 'titles',
    DESCRIPTION = 'description',
    CAPTIONS = 'captions'
}

export type IdeaStatus = 'Generated' | 'In Production' | 'Published';

export interface VideoIdea {
    id: number;
    title: string;
    category: string;
    status: IdeaStatus;
}

export interface PlatformPerformance {
    platform: 'YouTube' | 'TikTok' | 'Instagram';
    views: number;
    likes: number;
    shares: number;
}

export type RenderStatus = 'Queued' | 'Rendering' | 'Completed' | 'Composing' | 'Ready' | 'Failed';
export type AIModel = 'Sora 2' | 'VEO 3.1 (Fast)' | 'VEO 3.1 (HQ)' | 'Suno' | 'Dreamina' | 'KlingAI' | 'ElevenLabs Voice AI' | 'gemini-2.5-flash-preview-tts' | 'Gemini SFX Generator';

export type VideoEffect = 'glitch' | 'vintage' | 'neon';

export interface Scene {
    id: number;
    text: string;
    prompt: string;
    model: AIModel;
    generationStatus: 'idle' | 'generating' | 'completed' | 'failed';
    videoOperation?: any;
    videoUrl?: string; // This will be a local blob URL
    effects?: VideoEffect[];
}

export interface SoundEffect {
    id: number;
    name: string;
    audioData: string; // base64 encoded
}

export interface RenderJob {
  id: number;
  productName: string;
  status: RenderStatus;
  progress: number;
  createdAt: string;
  models: AIModel[];
  videoOperation?: any;
  audioData?: string; // base64 encoded
  videoUrl?: string;
  scenes?: Scene[];
}

export type ScoutStatus = 'pending' | 'approved' | 'declined' | 'skipped' | 'auto-producing';

export interface ScoutedProduct extends Product {
    status: ScoutStatus;
    foundAt: number; // Timestamp
}

export interface Trend {
    topic: string;
    description: string;
}

export interface FacebookTokenData {
    longLivedToken: string;
    expiresAt: number;
    lastUpdated: number;
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'refreshing';

export interface Connection {
    id: string;
    username: string;
    status: ConnectionStatus;
    autoMode: boolean;
    credentials: Record<string, string>;
}

export type RepoStatus = 'synced' | 'pending' | 'syncing' | 'error' | 'cloning';

export interface GitHubRepo {
  fullName: string; // e.g., "username/repo-name"
  status: RepoStatus;
  lastSync: number | null; // Timestamp
}

export type PostStatus = 'Scheduled' | 'Published' | 'Failed';

export interface ScheduledPost {
  id: number;
  productId: string;
  productName: string;
  platforms: string[];
  content: string;
  scheduledAt: string; // ISO string for datetime-local
  status: PostStatus;
}

export interface AffiliateStat {
  name: string;
  revenue: number;
  clicks: number;
  conversions: number;
  error?: string;
  connected: boolean;
}

export interface AppNotification {
    id: number;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

// --- Supabase Auth Types ---
export interface User {
  id: string;
  email?: string;
  user_metadata: {
    [key: string]: any;
    avatar_url?: string;
    full_name?: string;
    name?: string;
  };
}

export interface Session {
  access_token: string;
  refresh_token: string;
  user: User;
}