
export const translations = {
  en: {
    // General
    appName: "NebulaForge AI",
    appSlogan: "Intelligent Automation, Simplified.",
    copyright: "© {year} All rights reserved",
    conversions: "conversions",
    commission: "Commission",
    
    // Sidebar Page Names (used as keys)
    Dashboard: "Dashboard",
    'AI System Overview': "AI System Overview",
    'Control Center': "Control Center",
    Automation: "Automation",
    'App Guide': "App Guide",

    'Product Scout': "Product Scout",
    'Content Generator': "Content Generator",
    Publisher: "Publisher",
    'AI Video Studio': "AI Video Studio",
    'Render Queue': "Render Queue",
    'Prompt Templates': "Prompt Templates",
    'AI Review Marketplace': "AI Review Marketplace",
    'AI Video Selling Automation': "AI Video Selling Automation",
    'AI Social Posting': "AI Social Posting",

    'Facebook Control Hub': "Facebook Control Hub",
    'TikTok Automation': "TikTok Automation",
    'YouTube Studio AI': "YouTube Studio AI",
    'Zalo OA Manager': "Zalo OA Manager",
    'Telegram Automation': "Telegram Automation",
    'Instagram Boost Panel': "Instagram Boost Panel",
    'Twitter/X Auto-Agent': "Twitter/X Auto-Agent",

    'Shopee Seller AI': "Shopee Seller AI",
    'Lazada Seller AI': "Lazada Seller AI",
    'Tiki Seller Center': "Tiki Seller Center",
    'Amazon FBA Panel': "Amazon FBA Panel",
    
    Connections: "Connections",
    Analytics: "Analytics",
    'GitHub Sync': 'GitHub Sync',
    'API Docs': 'API Docs',
    
    // Sidebar Groups
    sidebar: {
      group1: "Main Navigation",
      group2: "AI Modules",
      group3: "Social Media",
      group4: "E-Commerce",
      group5: "System Settings",
    },

    // Header Clock
    headerClock: {
        day: 'Day',
        date: 'Date',
        time: 'Time',
        timezone: 'Timezone',
        "America/New_York": "New York",
        "Europe/London": "London",
        "Asia/Tokyo": "Tokyo",
        "America/Los_Angeles": "San Francisco",
        "Asia/Ho_Chi_Minh": "Vietnam"
    },

    // Header
    header: {
      title: "NebulaForge AI",
      systemStatus: "System Status",
      statusActive: "Core AI Active",
      statusInactive: "Core AI Inactive - API Key Required",
      startDemo: "Start Demo",
      demoActive: "Demo Active",
    },

    // Dashboard
    dashboard: {
      autocreator_prime: "AUTOCREATOR PRIME",
      viral_idea_generator: "Viral Idea Generator",
      script_production_studio: "Script & Production Studio",
      channel_policy_adapter: "Channel & Policy Adapter",
      multi_channel_scheduler: "Multi-channel Scheduler & Publisher",
      system_activated: "SYSTEM ACTIVATED",
      rpm_optimizer_analytics: "RPM Optimizer & Analytics",
      revenue_trends: "Revenue Trends",
      welcome_title: "Welcome Back to Your Command Center",
      welcome_description: "Everything is running smoothly. Here’s a snapshot of your AI empire.",
      totalViews: "Total Views",
      totalLikes: "Total Likes",
      totalShares: "Total Shares",
      videosCreated: "Videos Created",
      videoIdeasTitle: "Video Ideas",
      videoIdeasDescription: "Your current content pipeline.",
      productHuntingTitle: "Product Hunting",
      productHuntingDescription: "High commission products.",
      findMoreProducts: "Find More Products",
      digistoreTitle: "Digistore24 Integration",
      digistoreDescription: "Summary of your digital product store.",
      activeProducts: "Active Products",
      totalEarnings: "Total Earnings",
      avgCommission: "Avg. Commission",
      conversionRate: "Conversion Rate",
      systemLogTitle: "System Log",
      systemLogDescription: "Live feed of all automated agent activities.",
      ctaTitle: "Ready to Automate?",
      ctaDescription: "Start the full pipeline to find a product, generate content, and create a video with just one click.",
      ctaButton: "Go to Product Scout",
    },

    // Product Scout
    productScout: {
      title: "Affiliate Video AI Studio PRO",
      description: "Enter a product URL to start the fully automated video creation pipeline.",
      urlLabel: "Product URL",
      urlPlaceholder: "e.g., https://shopee.vn/product/...",
      button: "Start Full Auto Pipeline",
      buttonLoading: "Pipeline in Progress...",
      scrapeError: "Could not retrieve product information. Please check the URL or try another product.",
    },
    
    // Content Generator
    contentGenerator: {
      title: "Content Generator",
      description: "Select a product and generate all necessary assets for your video.",
      selectLabel: "Select a product from your pipeline:",
      noProducts: "No products in pipeline. Go to Product Scout first.",
      videoScript: "Video Script",
      videoTitles: "Video Titles",
      seoDescription: "SEO Description",
      captionsHashtags: "Captions & Hashtags",
      generatedSuccess: "Content generated successfully.",
      generateDescription: "Generate {type} for the selected product.",
      generating: "Generating...",
      regenerate: "Regenerate",
      generate: "Generate",
      caption: "Caption:",
      hashtags: "Hashtags:",
    },

    // Publisher
    publisher: {
        title: "Publisher & Scheduler",
        description: "Create videos and schedule posts for your social media platforms.",
        createVideo: "Create Video",
        creatingVideo: "Sending to render...",
        schedulePost: "Schedule Post",
        scheduled: "Scheduled",
        readyToPublish: "All content generated. Ready to create video or schedule post.",
        notReady: "No products are ready for publishing. Complete content generation first.",
        videoSim: "Simulating video generation... this would integrate with Canva/InVideo API.",
        modalTitle: "Schedule Post for {productName}",
        modalContentLabel: "Post Content",
        modalPlatformsLabel: "Select Platforms",
        modalScheduleTimeLabel: "Schedule Time",
        modalScheduleButton: "Schedule Post",
        modalCancelButton: "Cancel",
        noPlatformsConnected: "No social platforms connected. Please add them in the Connections page."
    },

    // AI Video Studio
    aiVideoStudio: {
      title: "AI Video Studio Pro",
      description: "Orchestrate multiple AI models in a timeline-based editor to craft the perfect video.",
      selectProduct: "Select Product to Begin",
      noProducts: "No products with generated scripts available.",
      controls: "AI Controls",
      scriptAndVisuals: "Script & Visuals",
      voiceover: "Voiceover",
      music: "Music",
      sfx: "Sound Effects",
      effects: "Effects",
      scene: "Scene",
      selectVoiceModel: "Select Voice Model",
      generateVoiceover: "Generate Voiceover",
      selectVideoModel: "Select Video Model",
      generateVisuals: "Generate Visuals",
      selectMusicModel: "Select Music Model",
      generateMusic: "Generate Music",
      musicPromptPlaceholder: "e.g., epic cinematic synthwave",
      generateSfx: "Generate SFX",
      sfxPromptPlaceholder: "e.g., whoosh, computer beep, explosion",
      sfxLibrary: "SFX Library",
      preview: "Studio Preview",
      timeline: "Timeline",
      timelineDescription: "Arrange your AI-generated clips, voiceover, music, and sound effects.",
      videoTrack: "Video",
      voiceTrack: "Voice",
      musicTrack: "Music",
      sfxTrack: "SFX",
      sendToRender: "Send to Render Queue",
      assetsNeeded: "Generate a voiceover and at least one visual clip to enable rendering.",
      generating: "Generating..."
    },
    
    // Renamed from 'effects' to 'effectNames' to avoid key collision with aiVideoStudio.effects label.
    effectNames: {
      glitch: "Glitch",
      vintage: "Vintage",
      neon: "Neon Glow"
    },

    // Render Queue
    renderQueue: {
        title: "Video Render Queue",
        description: "Track the progress of your AI-generated videos.",
        product: "Product",
        status: "Status",
        progress: "Progress",
        models: "AI Models",
        created: "Created",
        actions: "Actions",
        download: "Download",
        noJobs: "No video jobs in the queue. Create one from the Publisher page.",
        // Statuses
        Queued: "Queued",
        Rendering: "Rendering",
        Completed: "Completed",
        Composing: "Composing",
        Ready: "Ready",
        Failed: "Failed",
    },

    // Analytics
    analytics: {
        viewsOverTime: "Total Views Over Time",
        viewsDescription: "Monthly views across all platforms.",
        affiliateRevenue: "Affiliate Revenue",
        revenueDescription: "Top performing affiliate products.",
        performanceByPlatform: "Performance by Platform",
        performanceDescription: "Track your video performance across different social media.",
        views: "Views",
        likes: "Likes",
        shares: "Shares",
    },

    // Automation
    automation: {
        title: "Video Idea Management",
        description: "Manage your content pipeline from idea to publication.",
        placeholder: "Enter new video idea...",
        addIdea: "Add Idea",
        start: "Start",
        publish: "Publish",
        affiliateMonitorTitle: "Affiliate & Social Hub Monitor",
        affiliateMonitorDescription: "Run a check on your affiliate and social media platforms to ensure links are active and tokens are valid.",
        runCheck: "Run Status Check",
        runningCheck: "Checking...",
        reportTitle: "Status Report",
        statusReportHeader: "📊 Daily Affiliate & Social Media Hub Report",
        statusActive: "✅ Active",
        statusError: "⚠️ Link Error/Changed",
        statusTokenMissing: " | ❌ Token not set or invalid",
        statusCheckFailed: "❌ Could not access",
        notificationSettingsTitle: "Notification Settings (For Demonstration)",
        notificationSettingsDescription: "In a real application, these settings would be stored securely on a backend server to send automated reports.",
        telegramBotToken: "Telegram Bot Token",
        telegramChatId: "Telegram Chat ID",
        adminEmail: "Admin Email for Reports",
        securityWarning: "SECURITY WARNING: Never expose secret keys or tokens on the client-side in a production app.",
        // Statuses
        Generated: "Generated",
        'In Production': "In Production",
        Published: "Published",
        // Categories
        Tech: "Tech",
        Health: "Health",
        Lifestyle: "Lifestyle",
        Finance: "Finance",
    },
    
    // Affiliate Dashboard
    affiliateDashboard: {
        title: "Affiliate & Social Media Hub",
        description: "Live statistics from your connected affiliate and social media platforms.",
        totalRevenue: "Total Revenue",
        totalClicks: "Total Clicks",
        totalConversions: "Total Conversions",
        lastUpdated: "Last Updated: {time}",
        chartTitle: "Revenue by Platform (USD)",
        refreshButton: "Refresh Data",
        refreshingButton: "Refreshing...",
        notConnected: "Not Connected"
    },

    // Connections
    connections: {
        hubTitle: "AI Universal Connections Hub",
        hubDescription: "Connect your accounts to enable the 24/7 automation engine.",
        setupGuide: "View Setup Guide",
        geminiCoreTitle: "Gemini Core AI Engine",
        geminiCoreDescription: "The central AI powering content generation. An API key is required for the app to function.",
        activateButton: "Activate System",
        main_platforms: "Main Platforms",
        manage_connections: "Manage your active connections.",
        connectPlatform: "Connect {platformName}",
        apiKey: "API Key",
        token: "Token",
        autoMode: "Auto Mode",
        autoModeDescription: "Allow agents to use this connection automatically.",
        testConnection: "Check Status",
        testing: "Checking...",
        testSuccess: "Connection successful!",
        testFailed: "Connection failed. Check credentials.",
        connectedAccounts: "Connected Accounts",
        backup: "Backup",
        restore: "Restore",
        backupTooltip: "Save all your connection settings to a JSON file.",
        restoreTooltip: "Load connection settings from a JSON file.",
        export: "Export JSON",
        edit: "Edit",
        delete: "Delete",
        platform: "Platform",
        username: "Username",
        getApiKeyHelp: "Get API Key Help",
        noConnections: "No active connections. Click an icon above to add one.",
        
        // Statuses
        status_connected: "Connected",
        status_disconnected: "Disconnected",
        status_refreshing: "Refreshing",
        status_error: "Error",
        
        // Modal & Actions
        cancel: "Cancel",
        saveAndConnect: "Save & Connect",
        disconnect: "Disconnect",
        confirmDisconnect: "Are you sure you want to disconnect?",
        
        // Categories
        category_ai: "AI & Content Generation",
        category_social: "Social Media",
        category_developer: "Developer Platforms",
        category_affiliate: "Affiliate Marketing",
        category_crypto_financial: "Crypto & Financial",

        // Help Texts
        help: {
            clickForDocs: 'Click for documentation.',
            MERCHANT_ID: "Your unique merchant identifier provided by ShareASale.",
            API_TOKEN: "The API Token for authentication, found in your ShareASale account settings.",
            API_SECRET: "The API Secret for authentication, found in your ShareASale account settings.",
            CLIENT_ID: "The Client ID from your app in the developer console.",
            CLIENT_SECRET: "The Client Secret from your app in the developer console.",
            ACCESS_TOKEN: "The Access Token for API authentication.",
            CLIENT_KEY: "The Client Key from your app in the developer console.",
            API_KEY: "The API Key for authentication.",
            ACCESS_TOKEN_SECRET: "The Access Token Secret for authentication.",
            APP_ID: "The App ID from your application settings.",
            APP_SECRET: "The App Secret from your application settings.",
            DEVELOPER_KEY: "The Developer Key from your account.",
            ASSOCIATE_TAG: "Your unique Amazon Associates tracking ID.",
            ACCESS_KEY: "The Access Key for API authentication.",
            SECRET_KEY: "The Secret Key for API authentication.",
            AFFILIATE_ID: "Your unique affiliate identifier.",
            EMAIL: "The email address associated with your API account.",
            PERSONAL_ACCESS_TOKEN: "Your Personal Access Token (PAT) for API access.",
            PARTNER_ID: "Your Partner ID for the platform's API.",
            BOT_TOKEN: "The token for your Telegram Bot from BotFather.",
            APP_KEY: "The App Key from your app in the developer console.",
            PARTNER_CODE: "Your Partner Code for the API.",
            TMN_CODE: "The TMN Code provided by the payment gateway.",
            HASH_SECRET: "The Hash Secret for signing requests.",
            REFERRAL_CODE: "Your affiliate referral code.",
            REDIRECT_URI: "The Redirect URI configured in your OAuth application.",
            AZURE_CLIENT_ID: "The Application (client) ID from your Azure App Registration.",
            AZURE_CLIENT_SECRET: "The Client Secret from your Azure App Registration.",
        },

        // Platforms
        gemini: "Gemini",
        youtube: "YouTube",
        clickbank: "ClickBank",
        amazon: "Amazon Associates",
        telegram: "Telegram",
        facebook: "Facebook",
        tiktok: "TikTok",
        shopee: "Shopee",
        lazada: "Lazada",
        tiki: "Tiki",
        zalo: "Zalo",
        momo: "Momo",
        vnpay: "VNPay",
        instagram: "Instagram",
        x_twitter: "X (Twitter)",
        pinterest: "Pinterest",
        shareasale: "ShareASale",
        accesstrade: "ACCESSTRADE",
        digistore24: "Digistore24",
        jvzoo: "JVZoo",
        warriorplus: "WarriorPlus",
        rakuten: "Rakuten Advertising",
        semrush: "SEMrush",
        hubspot: "HubSpot",
        cloudways: "Cloudways",
        cj: "CJ Affiliate",
        crypto_com: "Crypto.com",
        binance: "Binance Affiliate",
        bybit: "Bybit Partner",
        host123: "123HOST Affiliate",
        facebook_ads: "Facebook Ads",
        tiktok_ads: "TikTok Creator / Ads",
        youtube_partner: "YouTube Partner",
        instagram_affiliate: "Instagram Affiliate",
        twitter_affiliate: "Twitter Affiliate",
        facebook_token_engine: "Facebook Token Engine",
        microsoft: "Microsoft Azure",
        github: "GitHub",
        discord: "Discord",
        spotify: "Spotify",
        linkedin: "LinkedIn",
        googledrive: "Google Drive",
    },
    
    // Prompt Templates
    promptTemplates: {
        createButton: "Create New Template",
        templates: "Templates",
        editTitle: "Edit Template",
        createTitle: "Create New Template",
        pageDescription: "Define the structure for your AI-generated content.",
        nameLabel: "Template Name",
        typeLabel: "Template Type",
        contentLabel: "Prompt Content",
        placeholder: "e.g., Create a video script about {{product_name}}...",
        helpText: "Use {{variable_name}} for dynamic content.",
        cancel: "Cancel",
        save: "Save Template",
        selectPrompt: "Select a template to edit or create a new one",
        // Types
        script: "Script",
        titles: "Titles",
        description: "Description",
        captions: "Captions",
        storyboard: "Storyboard",
        video_payload: "Video Payload",
        comment: "Comment",
        ab_test: "A/B Test",
        analytics: "Analytics",
        voiceover: "Voiceover",
        // Template Names
        template_names: {
          '15s_video_script': "15s Sales Video Script",
          'caption_hashtag': "Caption & Hashtag Generator",
          'product_description': "Short Product Description",
          'tts_voiceover': "TTS Voiceover Script",
          'short_subtitle': "Short Subtitle Generator",
          'storyboard_generator': "Storyboard Generator",
          'video_ai_payload': "Video AI Payload",
          'comment_responder': "Comment Responder",
          'ab_test_generator': "A/B Test Title Generator",
          'performance_analyzer': "Performance Analyzer",
        }
    },

    // Facebook Token Manager
    fbTokenManager: {
      title: "Facebook Token Automation Engine",
      description: "Automatically manages your Facebook Access Token, converting short-lived tokens to long-lived ones and refreshing them before expiry.",
      appId: "App ID",
      appIdTooltip: "Your Facebook App ID.",
      appSecret: "App Secret",
      appSecretTooltip: "Your Facebook App Secret. This is sensitive, handle with care.",
      shortToken: "Short-Lived Token",
      shortTokenTooltip: "A short-lived user access token from the FB login process.",
      connectButton: "Connect & Exchange Token",
      forceRefreshButton: "Force Refresh",
      disconnectButton: "Disconnect",
      status: "Status",
      currentToken: "Current Long-Lived Token",
      nextRefresh: "Next Refresh In",
      lastUpdated: "Last Updated",
      refreshNeeded: "Refresh required. Please enter a new short-lived token.",
      errorPrefix: "Error"
    },
    
    // API Docs
    apiDocs: {
        title: 'Setup & API Guide',
        description: 'Follow these steps to configure the application and get the necessary API keys for full automation.',
        goToConsole: 'Go to Console',
        viewDocs: 'View Docs',
        installationTitle: 'Installation',
        installationDescription: 'Install the necessary dependencies to run the project.',
        envTitle: '.env Configuration',
        envDescription: 'Create a `.env` file in the project root and add your API keys. This file is kept private and should not be shared.',
        apiCredentialsTitle: 'API Credentials Guide',
        apiCredentialsDescription: 'Official links and instructions for getting API Keys, Client IDs, and Secrets.',
        platforms: {
            google: {
                name: 'Google Cloud API',
                instructions: `- Go to "APIs & Services → Credentials".\n- Click "Create Credentials → OAuth Client ID".\n- Find Client ID and Secret in the results table.`
            },
            facebook: {
                name: 'Facebook / Instagram',
                instructions: `- Create a new App (type "Consumer").\n- Navigate to "Settings → Basic".\n- App ID is your Client ID, App Secret is your Client Secret.`
            },
            zalo: {
                name: 'Zalo Developers',
                instructions: `- Go to "My Applications" → "Create New Application".\n- Find App ID and App Secret in "Application Info".`
            },
            tiktok: {
                name: 'TikTok for Developers',
                instructions: `- Go to "My Apps" → "Create App".\n- Client Key (Client ID) and Client Secret are in "App Details".`
            },
            microsoft: {
                name: 'Microsoft Azure',
                instructions: `- In Azure Portal, go to "App registrations" → "New registration".\n- Go to "Certificates & Secrets" → "New client secret".`
            },
            github: {
                name: 'GitHub Apps',
                instructions: `- Go to "Settings → Developer settings → OAuth Apps".\n- Click "New OAuth App".\n- Generate a new client secret after creation.`
            },
            discord: {
                name: 'Discord Developer Portal',
                instructions: `- Go to "Applications" → "New Application".\n- Client ID and Secret are in the "OAuth2" tab.`
            },
            spotify: {
                name: 'Spotify for Developers',
                instructions: `- Go to your Dashboard → "Create App".\n- Client ID and Client Secret are shown after creation.`
            },
            linkedin: {
                name: 'LinkedIn Developers',
                instructions: `- Go to "My Apps" → "Create App".\n- Client ID and Secret are in the "Auth" tab.`
            }
        }
    },

    // App Guide
    appGuide: {
      title: "NebulaForge AI User Guide",
      description: "Your comprehensive guide to mastering NebulaForge AI.",
      toc: "Table of Contents",
      
      dashboard_title: "Dashboard",
      dashboard_content: "The Dashboard is your mission control. It provides a high-level overview of your entire operation, including key performance metrics like views and shares, a live system log of AI agent activities, and quick-access panels for your latest video ideas and top-performing products.",

      automation_title: "Automation",
      automation_content: "This is where you manage your content strategy. The Automation page allows you to add, organize, and track video ideas. You can move ideas through the production pipeline, from 'Generated' to 'In Production' and finally to 'Published', keeping your content flow organized and efficient.",

      productScout_title: "Product Scout",
      productScout_content: "The Product Scout agent is your automated tool for discovering profitable opportunities. It scans various sources to find trending AI tools and digital products with high affiliate commissions. Products found here can be added directly to your content pipeline with a single click.",

      promptTemplates_title: "Prompt Templates",
      promptTemplates_content: "Customize the brain of your AI. This page allows you to create and edit the prompt templates used by the Gemini AI to generate content. Fine-tune the structure of your scripts, titles, and descriptions to match your channel's unique style and tone.",

      contentGenerator_title: "Content Generator",
      contentGenerator_content: "This is the core of the content creation process. Select a product from your pipeline, and the Content Generator will use your custom prompt templates to automatically generate a video script, catchy titles, an SEO-optimized description, and relevant captions with hashtags.",

      publisher_title: "Publisher",
      publisher_content: "Once all content assets for a product are generated, they appear here. The Publisher page is your final checkpoint before going live. From here, you can send the assets to the Render Queue to create the video and then publish the final product to your connected social media platforms.",

      renderQueue_title: "Render Queue",
      renderQueue_content: "Track the magic as it happens. The Render Queue shows the real-time progress of your videos being generated by various AI models (like VEO 3.1, Suno, etc.). You can monitor the status, see which models are being used, and download the completed video.",

      connections_title: "Connections",
      connections_content: "This is the hub for all your external services. Connect your Gemini AI API key, affiliate platform accounts (like Digistore24), content creation services (Canva, ElevenLabs), and social media accounts (YouTube, TikTok) to enable a fully automated workflow.",

      analytics_title: "Analytics",
      analytics_content: "Measure your success and optimize your strategy. The Analytics page provides detailed charts and data on your channel's performance, including views over time, affiliate revenue from different products, and a breakdown of engagement metrics across all connected platforms.",
    },

    // GitHub Sync
    githubSync: {
      title: "GitHub Sync & Backup",
      description: "Automatically keep local directories in sync with your GitHub repositories.",
      configTitle: "Configuration",
      configDescription: "Set up your GitHub token and local path. This is stored only in your browser.",
      patLabel: "GitHub Personal Access Token (PAT)",
      patPlaceholder: "ghp_...",
      patHelp: "A PAT is required to access private repos and avoid rate limits. Create one with 'repo' scope.",
      getPat: "Get a PAT",
      pathLabel: "Local Backup Path",
      pathPlaceholder: "e.g., /Users/user/Documents/GitHub-Backups",
      pathHelp: "The root folder on your local machine where repositories will be cloned.",
      reposTitle: "Tracked Repositories",
      reposDescription: "Add repositories to keep them synchronized.",
      addRepoLabel: "Add New Repository",
      addRepoPlaceholder: "username/repository-name",
      addRepoButton: "Add",
      syncAllButton: "Sync All",
      autoSyncLabel: "Auto-Sync Every 5 Minutes",
      repo: "Repository",
      status: "Status",
      lastSync: "Last Sync",
      actions: "Actions",
      sync: "Sync",
      remove: "Remove",
      activityTitle: "Activity Log",
      activityDescription: "Live feed of all synchronization activities.",
      never: "Never",
      // Statuses
      synced: "Synced",
      pending: "Pending",
      syncing: "Syncing...",
      error: "Error",
      cloning: "Cloning...",
      // Logs
      logCloning: "Cloning repository {repo}...",
      logCloneSuccess: "Successfully cloned {repo}.",
      logPulling: "Pulling latest changes for {repo}...",
      logPullSuccess: "Successfully synced {repo}.",
      logError: "Error syncing {repo}: {error}",
      logAutoSync: "Auto-sync process started.",
      logAutoSyncComplete: "Auto-sync cycle completed."
    },

     // Control Hub & Placeholder
    controlHub: {
        connectButton: "Connect Account (OAuth)",
        disconnectButton: "Disconnect",
        dataPanel: "Data Panel",
        analysisModule: "AI Analysis Module",
        postingSchedule: "Posting Schedule",
        statistics: "Dashboard Statistics",
        autoRun: "Auto-Run",
        description: "Connect your {platform} account to enable automation, data analysis, and scheduled posting.",
    },
    placeholder: {
        underConstruction: "This page is under construction. Full functionality will be available soon."
    },
    qualitySelector: {
      quality: "Quality",
      fast: "Fast",
      hq: "High Quality"
    }
  },
  vi: {
    // General
    appName: "NebulaForge AI",
    appSlogan: "Tự Động Hóa Thông Minh, Đơn Giản Hóa",
    copyright: "© {year} Mọi quyền được bảo lưu",
    conversions: "chuyển đổi",
    commission: "Hoa hồng",

    // Sidebar Page Names
    Dashboard: "Bảng điều khiển",
    'AI System Overview': "Tổng quan hệ thống AI",
    'Control Center': "Điều khiển trung tâm",
    Automation: "Tự động hóa",
    'App Guide': 'Hướng dẫn ứng dụng',

    'Product Scout': "Săn sản phẩm",
    'Content Generator': "Tạo nội dung",
    Publisher: "Xuất bản",
    'AI Video Studio': "Studio Video AI",
    'Render Queue': "Hàng đợi kết xuất",
    'Prompt Templates': "Mẫu prompt",
    'AI Review Marketplace': "Chợ Review AI",
    'AI Video Selling Automation': "Tự động bán hàng video",
    'AI Social Posting': "Đăng bài xã hội AI",

    'Facebook Control Hub': "Hub điều khiển Facebook",
    'TikTok Automation': "Tự động hóa TikTok",
    'YouTube Studio AI': "YouTube Studio AI",
    'Zalo OA Manager': "Quản lý Zalo OA",
    'Telegram Automation': "Tự động hóa Telegram",
    'Instagram Boost Panel': "Bảng tăng tốc Instagram",
    'Twitter/X Auto-Agent': "Agent tự động Twitter/X",

    'Shopee Seller AI': "AI người bán Shopee",
    'Lazada Seller AI': "AI người bán Lazada",
    'Tiki Seller Center': "Trung tâm người bán Tiki",
    'Amazon FBA Panel': "Bảng điều khiển Amazon FBA",
    
    Connections: "Kết nối",
    Analytics: "Phân tích",
    'GitHub Sync': 'Đồng bộ GitHub',
    'API Docs': 'Tài liệu API',
    
    // Sidebar Groups
    sidebar: {
      group1: "Điều hướng chính",
      group2: "Các module AI",
      group3: "Mạng xã hội",
      group4: "Thương mại điện tử",
      group5: "Cài đặt hệ thống",
    },
    
    // Header Clock
    headerClock: {
        day: 'Thứ',
        date: 'Ngày',
        time: 'Giờ',
        timezone: 'Múi giờ',
        "America/New_York": "New York",
        "Europe/London": "Luân Đôn",
        "Asia/Tokyo": "Tokyo",
        "America/Los_Angeles": "San Francisco",
        "Asia/Ho_Chi_Minh": "Việt Nam"
    },

    // Header
    header: {
      title: "NebulaForge AI",
      systemStatus: "Trạng thái Hệ thống",
      statusActive: "Lõi AI Hoạt động",
      statusInactive: "Lõi AI Tắt - Yêu cầu API Key",
      startDemo: "Bắt đầu Demo",
      demoActive: "Demo đang chạy",
    },
    
    // Dashboard
    dashboard: {
      autocreator_prime: "AUTOCREATOR PRIME",
      viral_idea_generator: "Tạo Ý Tưởng Viral",
      script_production_studio: "Studio Kịch Bản & Sản Xuất",
      channel_policy_adapter: "Điều Hợp Kênh & Chính Sách",
      multi_channel_scheduler: "Lên Lịch & Xuất Bản Đa Kênh",
      system_activated: "HỆ THỐNG ĐÃ KÍCH HOẠT",
      rpm_optimizer_analytics: "Tối Ưu Hóa RPM & Phân Tích",
      revenue_trends: "Xu Hướng Doanh Thu",
      welcome_title: "Chào mừng trở lại Trung tâm Chỉ huy",
      welcome_description: "Mọi thứ đang vận hành trơn tru. Đây là tổng quan về đế chế AI của bạn.",
      totalViews: "Tổng lượt xem",
      totalLikes: "Tổng lượt thích",
      totalShares: "Tổng lượt chia sẻ",
      videosCreated: "Video đã tạo",
      videoIdeasTitle: "Ý tưởng Video",
      videoIdeasDescription: "Quy trình nội dung hiện tại của bạn.",
      productHuntingTitle: "Săn lùng Sản phẩm",
      productHuntingDescription: "Sản phẩm hoa hồng cao.",
      findMoreProducts: "Tìm thêm sản phẩm",
      digistoreTitle: "Tích hợp Digistore24",
      digistoreDescription: "Tóm tắt cửa hàng sản phẩm số của bạn.",
      activeProducts: "Sản phẩm đang hoạt động",
      totalEarnings: "Tổng thu nhập",
      avgCommission: "Hoa hồng TB",
      conversionRate: "Tỷ lệ chuyển đổi",
      systemLogTitle: "Nhật ký Hệ thống",
      systemLogDescription: "Luồng hoạt động trực tiếp của các agent tự động.",
      ctaTitle: "Sẵn sàng Tự động hóa?",
      ctaDescription: "Bắt đầu quy trình tự động hoàn chỉnh để tìm sản phẩm, tạo nội dung và sản xuất video chỉ với một cú nhấp chuột.",
      ctaButton: "Đến trang Săn sản phẩm",
    },
    
    // Product Scout
    productScout: {
      title: "Affiliate Video AI Studio PRO",
      description: "Nhập URL sản phẩm để bắt đầu quy trình tạo video hoàn toàn tự động.",
      urlLabel: "URL Sản phẩm",
      urlPlaceholder: "ví dụ: https://shopee.vn/product/...",
      button: "Bắt đầu Quy trình Tự động",
      buttonLoading: "Quy trình đang chạy...",
      scrapeError: "Không thể lấy thông tin sản phẩm. Vui lòng kiểm tra URL hoặc thử sản phẩm khác.",
    },

    // Content Generator
    contentGenerator: {
      title: "Tạo nội dung",
      description: "Chọn một sản phẩm và tạo tất cả tài sản cần thiết cho video của bạn.",
      selectLabel: "Chọn một sản phẩm từ quy trình của bạn:",
      noProducts: "Không có sản phẩm nào trong quy trình. Hãy đến trang Săn sản phẩm trước.",
      videoScript: "Kịch bản Video",
      videoTitles: "Tiêu đề Video",
      seoDescription: "Mô tả SEO",
      captionsHashtags: "Phụ đề & Hashtag",
      generatedSuccess: "Nội dung đã được tạo thành công.",
      generateDescription: "Tạo {type} cho sản phẩm đã chọn.",
      generating: "Đang tạo...",
      regenerate: "Tạo lại",
      generate: "Tạo",
      caption: "Phụ đề:",
      hashtags: "Hashtag:",
    },
    
    // Publisher
    publisher: {
        title: "Xuất bản & Lên lịch",
        description: "Tạo video và lên lịch đăng bài cho các nền tảng mạng xã hội của bạn.",
        createVideo: "Tạo Video",
        creatingVideo: "Gửi đến hàng đợi...",
        schedulePost: "Lên lịch",
        scheduled: "Đã lên lịch",
        readyToPublish: "Tất cả nội dung đã được tạo. Sẵn sàng để tạo video hoặc lên lịch.",
        notReady: "Chưa có sản phẩm nào sẵn sàng để xuất bản. Hoàn tất việc tạo nội dung trước.",
        videoSim: "Đang mô phỏng quá trình tạo video... tính năng này sẽ tích hợp với API của Canva/InVideo.",
        modalTitle: "Lên lịch cho {productName}",
        modalContentLabel: "Nội dung bài đăng",
        modalPlatformsLabel: "Chọn nền tảng",
        modalScheduleTimeLabel: "Thời gian lên lịch",
        modalScheduleButton: "Lên lịch",
        modalCancelButton: "Hủy",
        noPlatformsConnected: "Chưa có nền tảng xã hội nào được kết nối. Vui lòng thêm trong trang Kết nối."
    },

    // AI Video Studio
    aiVideoStudio: {
      title: "Studio Video AI Pro",
      description: "Điều phối nhiều mô hình AI trong trình chỉnh sửa dựa trên dòng thời gian để tạo ra video hoàn hảo.",
      selectProduct: "Chọn sản phẩm để bắt đầu",
      noProducts: "Không có sản phẩm nào có kịch bản được tạo.",
      controls: "Bảng điều khiển AI",
      scriptAndVisuals: "Kịch bản & Hình ảnh",
      voiceover: "Lồng tiếng",
      music: "Âm nhạc",
      sfx: "Hiệu ứng âm thanh",
      effects: "Hiệu ứng",
      scene: "Cảnh",
      selectVoiceModel: "Chọn mô hình giọng nói",
      generateVoiceover: "Tạo lồng tiếng",
      selectVideoModel: "Chọn mô hình video",
      generateVisuals: "Tạo hình ảnh",
      selectMusicModel: "Chọn mô hình âm nhạc",
      generateMusic: "Tạo nhạc",
      musicPromptPlaceholder: "ví dụ: synthwave điện ảnh hoành tráng",
      generateSfx: "Tạo SFX",
      sfxPromptPlaceholder: "ví dụ: tiếng vút, tiếng bíp máy tính, tiếng nổ",
      sfxLibrary: "Thư viện SFX",
      preview: "Xem trước Studio",
      timeline: "Dòng thời gian",
      timelineDescription: "Sắp xếp các clip, lồng tiếng, nhạc và hiệu ứng âm thanh do AI tạo ra.",
      videoTrack: "Video",
      voiceTrack: "Giọng nói",
      musicTrack: "Nhạc nền",
      sfxTrack: "SFX",
      sendToRender: "Gửi đến hàng đợi kết xuất",
      assetsNeeded: "Tạo lồng tiếng và ít nhất một clip hình ảnh để bật tính năng kết xuất.",
      generating: "Đang tạo..."
    },
    
    effectNames: {
        glitch: "Nhiễu Sóng",
        vintage: "Cổ Điển",
        neon: "Phát Sáng Neon"
    },

    // Render Queue
    renderQueue: {
        title: "Hàng đợi Kết xuất Video",
        description: "Theo dõi tiến trình các video do AI tạo ra.",
        product: "Sản phẩm",
        status: "Trạng thái",
        progress: "Tiến độ",
        models: "Mô hình AI",
        created: "Ngày tạo",
        actions: "Hành động",
        download: "Tải xuống",
        noJobs: "Không có video nào trong hàng đợi. Hãy tạo một video từ trang Xuất bản.",
        // Statuses
        Queued: "Đang chờ",
        Rendering: "Đang kết xuất",
        Completed: "Hoàn thành",
        Composing: "Đang ghép",
        Ready: "Sẵn sàng",
        Failed: "Thất bại",
    },

    // Analytics
    analytics: {
        viewsOverTime: "Tổng lượt xem theo thời gian",
        viewsDescription: "Lượt xem hàng tháng trên tất cả các nền tảng.",
        affiliateRevenue: "Doanh thu liên kết",
        revenueDescription: "Các sản phẩm liên kết hiệu quả nhất.",
        performanceByPlatform: "Hiệu suất theo Nền tảng",
        performanceDescription: "Theo dõi hiệu suất video của bạn trên các mạng xã hội khác nhau.",
        views: "Lượt xem",
        likes: "Lượt thích",
        shares: "Lượt chia sẻ",
    },

    // Automation
    automation: {
        title: "Quản lý ý tưởng Video",
        description: "Quản lý quy trình nội dung của bạn từ ý tưởng đến xuất bản.",
        placeholder: "Nhập ý tưởng video mới...",
        addIdea: "Thêm ý tưởng",
        start: "Bắt đầu",
        publish: "Xuất bản",
        affiliateMonitorTitle: "Giám sát Affiliate & Social Hub",
        affiliateMonitorDescription: "Chạy kiểm tra các nền tảng affiliate và mạng xã hội để đảm bảo link hoạt động và token hợp lệ.",
        runCheck: "Chạy Kiểm tra Trạng thái",
        runningCheck: "Đang kiểm tra...",
        reportTitle: "Báo cáo Trạng thái",
        statusReportHeader: "📊 Báo cáo Hàng ngày Affiliate & Social Media Hub",
        statusActive: "✅ Hoạt động",
        statusError: "⚠️ Lỗi Link / Đã thay đổi",
        statusTokenMissing: " | ❌ Token chưa thiết lập hoặc không hợp lệ",
        statusCheckFailed: "❌ Không thể truy cập",
        notificationSettingsTitle: "Cài đặt Thông báo (Minh họa)",
        notificationSettingsDescription: "Trong một ứng dụng thực tế, các cài đặt này sẽ được lưu trữ an toàn trên máy chủ backend để gửi báo cáo tự động.",
        telegramBotToken: "Telegram Bot Token",
        telegramChatId: "Telegram Chat ID",
        adminEmail: "Email Admin nhận Báo cáo",
        securityWarning: "CẢNH BÁO BẢO MẬT: Không bao giờ để lộ khóa bí mật hoặc token ở phía client trong ứng dụng chính thức.",
        // Statuses
        Generated: "Đã tạo",
        'In Production': "Đang sản xuất",
        Published: "Đã xuất bản",
        // Categories
        Tech: "Công nghệ",
        Health: "Sức khỏe",
        Lifestyle: "Lối sống",
        Finance: "Tài chính",
    },
    
    // Affiliate Dashboard
    affiliateDashboard: {
        title: "Bảng điều khiển Affiliate & Social Media",
        description: "Thống kê trực tiếp từ các nền tảng affiliate và mạng xã hội đã kết nối của bạn.",
        totalRevenue: "Tổng Doanh thu",
        totalClicks: "Tổng Lượt click",
        totalConversions: "Tổng Chuyển đổi",
        lastUpdated: "Cập nhật lần cuối: {time}",
        chartTitle: "Doanh thu theo Nền tảng (USD)",
        refreshButton: "Làm mới dữ liệu",
        refreshingButton: "Đang làm mới...",
        notConnected: "Chưa kết nối"
    },

    // Connections
    connections: {
        hubTitle: "Trung tâm Kết nối AI Toàn cầu",
        hubDescription: "Kết nối các tài khoản của bạn để kích hoạt công cụ tự động 24/7.",
        setupGuide: "Xem Hướng dẫn Cài đặt",
        geminiCoreTitle: "Lõi AI Gemini",
        geminiCoreDescription: "AI trung tâm cung cấp sức mạnh cho việc tạo nội dung. Cần có API key để ứng dụng hoạt động.",
        activateButton: "Kích hoạt Hệ thống",
        main_platforms: "Nền Tảng Chính",
        manage_connections: "Quản lý các kết nối đang hoạt động của bạn.",
        connectPlatform: "Kết nối {platformName}",
        apiKey: "Khóa API",
        token: "Token",
        autoMode: "Chế độ Tự động",
        autoModeDescription: "Cho phép các agent tự động sử dụng kết nối này.",
        testConnection: "Kiểm tra Trạng thái",
        testing: "Đang kiểm tra...",
        testSuccess: "Kết nối thành công!",
        testFailed: "Kết nối thất bại. Kiểm tra lại thông tin.",
        connectedAccounts: "Các tài khoản đã kết nối",
        backup: "Sao lưu",
        restore: "Khôi phục",
        backupTooltip: "Lưu tất cả cài đặt kết nối của bạn vào một tệp JSON.",
        restoreTooltip: "Tải cài đặt kết nối từ một tệp JSON.",
        export: "Xuất JSON",
        edit: "Sửa",
        delete: "Xóa",
        platform: "Nền tảng",
        username: "Tên người dùng",
        getApiKeyHelp: "Trợ giúp lấy API Key",
        noConnections: "Chưa có kết nối nào. Nhấp vào biểu tượng ở trên để thêm.",

        // Statuses
        status_connected: "Đã kết nối",
        status_disconnected: "Đã ngắt kết nối",
        status_refreshing: "Đang làm mới",
        status_error: "Lỗi",
        
        // Modal & Actions
        cancel: "Hủy",
        saveAndConnect: "Lưu & Kết nối",
        disconnect: "Ngắt kết nối",
        confirmDisconnect: "Bạn có chắc chắn muốn ngắt kết nối không?",
        
        // Categories
        category_ai: "AI & Sáng tạo Nội dung",
        category_social: "Mạng xã hội",
        category_developer: "Nền tảng Nhà phát triển",
        category_affiliate: "Tiếp thị liên kết",
        category_crypto_financial: "Crypto & Tài chính",
        
        // Help Texts
        help: {
            clickForDocs: 'Nhấp để xem tài liệu.',
            MERCHANT_ID: "Mã định danh nhà cung cấp duy nhất của bạn do ShareASale cấp.",
            API_TOKEN: "Token API để xác thực, tìm thấy trong cài đặt tài khoản ShareASale của bạn.",
            API_SECRET: "Secret API để xác thực, tìm thấy trong cài đặt tài khoản ShareASale của bạn.",
            CLIENT_ID: "Client ID từ ứng dụng của bạn trong bảng điều khiển nhà phát triển.",
            CLIENT_SECRET: "Client Secret từ ứng dụng của bạn trong bảng điều khiển nhà phát triển.",
            ACCESS_TOKEN: "Access Token để xác thực API.",
            CLIENT_KEY: "Client Key từ ứng dụng của bạn trong bảng điều khiển nhà phát triển.",
            API_KEY: "Khóa API để xác thực.",
            ACCESS_TOKEN_SECRET: "Access Token Secret để xác thực.",
            APP_ID: "App ID từ cài đặt ứng dụng của bạn.",
            APP_SECRET: "App Secret từ cài đặt ứng dụng của bạn.",
            DEVELOPER_KEY: "Developer Key từ tài khoản của bạn.",
            ASSOCIATE_TAG: "ID theo dõi Amazon Associates duy nhất của bạn.",
            ACCESS_KEY: "Access Key để xác thực API.",
            SECRET_KEY: "Secret Key để xác thực API.",
            AFFILIATE_ID: "Mã định danh liên kết duy nhất của bạn.",
            EMAIL: "Địa chỉ email được liên kết với tài khoản API của bạn.",
            PERSONAL_ACCESS_TOKEN: "Personal Access Token (PAT) của bạn để truy cập API.",
            PARTNER_ID: "Partner ID của bạn cho API của nền tảng.",
            BOT_TOKEN: "Token cho Bot Telegram của bạn từ BotFather.",
            APP_KEY: "App Key từ ứng dụng của bạn trong bảng điều khiển nhà phát triển.",
            PARTNER_CODE: "Mã Đối tác của bạn cho API.",
            TMN_CODE: "Mã TMN được cung cấp bởi cổng thanh toán.",
            HASH_SECRET: "Hash Secret để ký yêu cầu.",
            REFERRAL_CODE: "Mã giới thiệu liên kết của bạn.",
            REDIRECT_URI: "URI chuyển hướng được cấu hình trong ứng dụng OAuth của bạn.",
            AZURE_CLIENT_ID: "Application (client) ID từ Azure App Registration của bạn.",
            AZURE_CLIENT_SECRET: "Client Secret từ Azure App Registration của bạn.",
        },

        // Platforms
        gemini: "Gemini",
        youtube: "YouTube",
        clickbank: "ClickBank",
        amazon: "Amazon Associates",
        telegram: "Telegram",
        facebook: "Facebook",
        tiktok: "TikTok",
        shopee: "Shopee",
        lazada: "Lazada",
        tiki: "Tiki",
        zalo: "Zalo",
        momo: "Momo",
        vnpay: "VNPay",
        instagram: "Instagram",
        x_twitter: "X (Twitter)",
        pinterest: "Pinterest",
        shareasale: "ShareASale",
        accesstrade: "ACCESSTRADE",
        digistore24: "Digistore24",
        jvzoo: "JVZoo",
        warriorplus: "WarriorPlus",
        rakuten: "Rakuten Advertising",
        semrush: "SEMrush",
        hubspot: "HubSpot",
        cloudways: "Cloudways",
        cj: "CJ Affiliate",
        crypto_com: "Crypto.com",
        binance: "Binance Affiliate",
        bybit: "Bybit Partner",
        host123: "123HOST Affiliate",
        facebook_ads: "Facebook Ads",
        tiktok_ads: "TikTok Creator / Ads",
        youtube_partner: "YouTube Partner",
        instagram_affiliate: "Instagram Affiliate",
        twitter_affiliate: "Twitter Affiliate",
        facebook_token_engine: "Công cụ Token Facebook",
        microsoft: "Microsoft Azure",
        github: "GitHub",
        discord: "Discord",
        spotify: "Spotify",
        linkedin: "LinkedIn",
        googledrive: "Google Drive",
    },
    
    // Prompt Templates
    promptTemplates: {
        createButton: "Tạo Mẫu mới",
        templates: "Các mẫu",
        editTitle: "Chỉnh sửa Mẫu",
        createTitle: "Tạo Mẫu mới",
        pageDescription: "Xác định cấu trúc cho nội dung do AI tạo ra của bạn.",
        nameLabel: "Tên Mẫu",
        typeLabel: "Loại Mẫu",
        contentLabel: "Nội dung Prompt",
        placeholder: "ví dụ: Tạo kịch bản video về {{product_name}}...",
        helpText: "Sử dụng {{ten_bien}} cho nội dung động.",
        cancel: "Hủy",
        save: "Lưu Mẫu",
        selectPrompt: "Chọn một mẫu để chỉnh sửa hoặc tạo một mẫu mới",
        // Types
        script: "Kịch bản",
        titles: "Tiêu đề",
        description: "Mô tả",
        captions: "Phụ đề",
        storyboard: "Bảng phân cảnh",
        video_payload: "Payload Video",
        comment: "Bình luận",
        ab_test: "Thử nghiệm A/B",
        analytics: "Phân tích",
        voiceover: "Lồng tiếng",
        // Template Names
        template_names: {
            '15s_video_script': "Kịch bản Video Bán hàng 15s",
            'caption_hashtag': "Tạo Caption & Hashtag",
            'product_description': "Mô tả Sản phẩm Ngắn",
            'tts_voiceover': "Kịch bản Lồng tiếng TTS",
            'short_subtitle': "Tạo Phụ đề Ngắn",
            'storyboard_generator': "Tạo Bảng phân cảnh",
            'video_ai_payload': "Payload cho Video AI",
            'comment_responder': "Trả lời Bình luận",
            'ab_test_generator': "Tạo Tiêu đề A/B Test",
            'performance_analyzer': "Phân tích Hiệu suất",
        }
    },

    // Facebook Token Manager
    fbTokenManager: {
      title: "Công cụ Tự động hóa Token Facebook",
      description: "Tự động quản lý Access Token Facebook của bạn, chuyển đổi token ngắn hạn thành dài hạn và làm mới chúng trước khi hết hạn.",
      appId: "App ID",
      appIdTooltip: "App ID Facebook của bạn.",
      appSecret: "App Secret",
      appSecretTooltip: "App Secret Facebook của bạn. Đây là thông tin nhạy cảm, hãy cẩn thận.",
      shortToken: "Token Ngắn hạn",
      shortTokenTooltip: "User access token ngắn hạn từ quá trình đăng nhập Facebook.",
      connectButton: "Kết nối & Đổi Token",
      forceRefreshButton: "Buộc làm mới",
      disconnectButton: "Ngắt kết nối",
      status: "Trạng thái",
      currentToken: "Token Dài hạn Hiện tại",
      nextRefresh: "Làm mới tiếp theo sau",
      lastUpdated: "Cập nhật lần cuối",
      refreshNeeded: "Cần làm mới. Vui lòng nhập một token ngắn hạn mới.",
      errorPrefix: "Lỗi"
    },
    
    // API Docs
    apiDocs: {
        title: 'Hướng dẫn Cài đặt & API',
        description: 'Làm theo các bước sau để cấu hình ứng dụng và lấy các khóa API cần thiết cho việc tự động hóa hoàn toàn.',
        goToConsole: 'Đến Bảng điều khiển',
        viewDocs: 'Xem Tài liệu',
        installationTitle: 'Cài đặt',
        installationDescription: 'Cài đặt các dependency cần thiết để chạy dự án.',
        envTitle: 'Cấu hình .env',
        envDescription: 'Tạo một tệp `.env` ở thư mục gốc của dự án và thêm các khóa API của bạn. Tệp này được giữ bí mật và không nên chia sẻ.',
        apiCredentialsTitle: 'Hướng dẫn Lấy Thông tin API',
        apiCredentialsDescription: 'Link chính thức và hướng dẫn để lấy API Key, Client ID, và Secret.',
        platforms: {
            google: {
                name: 'Google Cloud API',
                instructions: `- Vào "APIs & Services → Credentials".\n- Nhấn "Create Credentials → OAuth Client ID".\n- Xem Client ID và Secret trong bảng kết quả.`
            },
            facebook: {
                name: 'Facebook / Instagram',
                instructions: `- Tạo App mới (chọn "Consumer").\n- Vào "Settings → Basic".\n- App ID là Client ID, App Secret là Client Secret của bạn.`
            },
            zalo: {
                name: 'Zalo Developers',
                instructions: `- Vào "Ứng dụng của tôi" → "Tạo ứng dụng mới".\n- Xem App ID và App Secret trong "Thông tin ứng dụng".`
            },
            tiktok: {
                name: 'TikTok for Developers',
                instructions: `- Vào "My Apps" → "Create App".\n- Client Key (Client ID) và Client Secret nằm trong "App Details".`
            },
            microsoft: {
                name: 'Microsoft Azure',
                instructions: `- Trong Azure Portal, vào "App registrations" → "New registration".\n- Vào "Certificates & Secrets" → "New client secret".`
            },
            github: {
                name: 'GitHub Apps',
                instructions: `- Vào "Settings → Developer settings → OAuth Apps".\n- Nhấn "New OAuth App".\n- Tạo client secret mới sau khi tạo app.`
            },
            discord: {
                name: 'Discord Developer Portal',
                instructions: `- Vào "Applications" → "New Application".\n- Client ID và Secret nằm trong tab "OAuth2".`
            },
            spotify: {
                name: 'Spotify for Developers',
                instructions: `- Vào Dashboard → "Create App".\n- Client ID và Client Secret hiển thị sau khi tạo.`
            },
            linkedin: {
                name: 'LinkedIn Developers',
                instructions: `- Vào "My Apps" → "Create App".\n- Client ID và Secret nằm trong tab "Auth".`
            }
        }
    },

    // App Guide
    appGuide: {
      title: "Hướng dẫn sử dụng NebulaForge AI",
      description: "Hướng dẫn toàn diện để bạn làm chủ NebulaForge AI.",
      toc: "Mục lục",

      dashboard_title: "Bảng điều khiển",
      dashboard_content: "Bảng điều khiển là trung tâm chỉ huy của bạn. Nó cung cấp cái nhìn tổng quan về toàn bộ hoạt động, bao gồm các chỉ số hiệu suất chính như lượt xem và chia sẻ, nhật ký hệ thống trực tiếp về hoạt động của các agent AI, và các bảng điều khiển truy cập nhanh cho các ý tưởng video mới nhất và sản phẩm hiệu quả nhất.",
      
      automation_title: "Tự động hóa",
      automation_content: "Đây là nơi bạn quản lý chiến lược nội dung của mình. Trang Tự động hóa cho phép bạn thêm, sắp xếp và theo dõi các ý tưởng video. Bạn có thể di chuyển các ý tưởng qua quy trình sản xuất, từ 'Đã tạo' đến 'Đang sản xuất' và cuối cùng là 'Đã xuất bản', giúp luồng nội dung của bạn được tổ chức và hiệu quả.",
      
      productScout_title: "Săn sản phẩm",
      productScout_content: "Agent Săn sản phẩm là công cụ tự động của bạn để khám phá các cơ hội sinh lời. Nó quét các nguồn khác nhau để tìm các công cụ AI và sản phẩm số thịnh hành có hoa hồng liên kết cao. Các sản phẩm được tìm thấy ở đây có thể được thêm trực tiếp vào quy trình nội dung của bạn chỉ bằng một cú nhấp chuột.",
      
      promptTemplates_title: "Mẫu prompt",
      promptTemplates_content: "Tùy chỉnh bộ não của AI của bạn. Trang này cho phép bạn tạo và chỉnh sửa các mẫu prompt được Gemini AI sử dụng để tạo nội dung. Tinh chỉnh cấu trúc kịch bản, tiêu đề và mô tả của bạn để phù hợp với phong cách và giọng điệu độc đáo của kênh bạn.",
      
      contentGenerator_title: "Tạo nội dung",
      contentGenerator_content: "Đây là cốt lõi của quá trình tạo nội dung. Chọn một sản phẩm từ quy trình của bạn, và Trình tạo nội dung sẽ sử dụng các mẫu prompt tùy chỉnh của bạn để tự động tạo kịch bản video, các tiêu đề hấp dẫn, mô tả được tối ưu hóa SEO và các phụ đề có liên quan cùng với hashtag.",
      
      publisher_title: "Xuất bản",
      publisher_content: "Khi tất cả tài sản nội dung cho một sản phẩm được tạo, chúng sẽ xuất hiện ở đây. Trang Xuất bản là điểm kiểm tra cuối cùng của bạn trước khi phát hành. Từ đây, bạn có thể gửi các tài sản đến Hàng đợi Kết xuất để tạo video và sau đó xuất bản sản phẩm cuối cùng lên các nền tảng mạng xã hội đã kết nối của bạn.",
      
      renderQueue_title: "Hàng đợi Kết xuất",
      renderQueue_content: "Theo dõi điều kỳ diệu khi nó xảy ra. Hàng đợi Kết xuất hiển thị tiến trình thời gian thực của các video đang được tạo bởi các mô hình AI khác nhau (như VEO 3.1, Suno, v.v.). Bạn có thể theo dõi trạng thái, xem mô hình nào đang được sử dụng và tải xuống video đã hoàn thành.",
      
      connections_title: "Kết nối",
      connections_content: "Đây là trung tâm cho tất cả các dịch vụ bên ngoài của bạn. Kết nối khóa API Gemini AI, tài khoản nền tảng liên kết (như Digistore24), dịch vụ tạo nội dung (Canva, ElevenLabs), và tài khoản mạng xã hội (YouTube, TikTok) để kích hoạt một quy trình làm việc hoàn toàn tự động.",
      
      analytics_title: "Phân tích",
      analytics_content: "Đo lường thành công và tối ưu hóa chiến lược của bạn. Trang Phân tích cung cấp các biểu đồ và dữ liệu chi tiết về hiệu suất của kênh bạn, bao gồm lượt xem theo thời gian, doanh thu liên kết từ các sản phẩm khác nhau và phân tích chi tiết các chỉ số tương tác trên tất cả các nền tảng đã kết nối.",
    },

    // GitHub Sync
    githubSync: {
      title: "Đồng bộ & Sao lưu GitHub",
      description: "Tự động giữ các thư mục cục bộ đồng bộ với kho lưu trữ GitHub của bạn.",
      configTitle: "Cấu hình",
      configDescription: "Thiết lập token GitHub và đường dẫn cục bộ. Thông tin này chỉ được lưu trữ trong trình duyệt của bạn.",
      patLabel: "GitHub Personal Access Token (PAT)",
      patPlaceholder: "ghp_...",
      patHelp: "Cần có PAT để truy cập các repo riêng tư và tránh giới hạn tốc độ. Tạo một token với phạm vi 'repo'.",
      getPat: "Lấy PAT",
      pathLabel: "Đường dẫn Sao lưu Cục bộ",
      pathPlaceholder: "ví dụ: /Users/user/Documents/GitHub-Backups",
      pathHelp: "Thư mục gốc trên máy tính của bạn nơi các kho lưu trữ sẽ được nhân bản.",
      reposTitle: "Các kho lưu trữ được theo dõi",
      reposDescription: "Thêm các kho lưu trữ để giữ chúng được đồng bộ hóa.",
      addRepoLabel: "Thêm Kho lưu trữ mới",
      addRepoPlaceholder: "tên-người-dùng/tên-kho-lưu-trữ",
      addRepoButton: "Thêm",
      syncAllButton: "Đồng bộ tất cả",
      autoSyncLabel: "Tự động đồng bộ mỗi 5 phút",
      repo: "Kho lưu trữ",
      status: "Trạng thái",
      lastSync: "Lần đồng bộ cuối",
      actions: "Hành động",
      sync: "Đồng bộ",
      remove: "Xóa",
      activityTitle: "Nhật ký Hoạt động",
      activityDescription: "Luồng trực tiếp của tất cả các hoạt động đồng bộ hóa.",
      never: "Chưa bao giờ",
      // Statuses
      synced: "Đã đồng bộ",
      pending: "Đang chờ",
      syncing: "Đang đồng bộ...",
      error: "Lỗi",
      cloning: "Đang nhân bản...",
      // Logs
      logCloning: "Đang nhân bản kho lưu trữ {repo}...",
      logCloneSuccess: "Đã nhân bản thành công {repo}.",
      logPulling: "Đang kéo các thay đổi mới nhất cho {repo}...",
      logPullSuccess: "Đã đồng bộ thành công {repo}.",
      logError: "Lỗi đồng bộ {repo}: {error}",
      logAutoSync: "Quá trình tự động đồng bộ đã bắt đầu.",
      logAutoSyncComplete: "Chu kỳ tự động đồng bộ đã hoàn tất."
    },

    // Control Hub & Placeholder
    controlHub: {
        connectButton: "Kết nối Tài khoản (OAuth)",
        disconnectButton: "Ngắt kết nối",
        dataPanel: "Bảng Dữ liệu",
        analysisModule: "Module Phân tích AI",
        postingSchedule: "Lịch Đăng bài",
        statistics: "Thống kê Dashboard",
        autoRun: "Chạy Tự động",
        description: "Kết nối tài khoản {platform} của bạn để bật tự động hóa, phân tích dữ liệu và đăng bài theo lịch.",
    },
    placeholder: {
        underConstruction: "Trang này đang được xây dựng. Chức năng đầy đủ sẽ sớm có sẵn."
    },
    qualitySelector: {
      quality: "Chất lượng",
      fast: "Nhanh",
      hq: "Chất lượng cao"
    }
  }
};