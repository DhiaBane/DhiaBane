// JWT Secret for authentication
export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-for-development"

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    VERIFY_PHONE: "/api/auth/verify-phone",
    VERIFY_CODE: "/api/auth/verify-code",
    RESEND_CODE: "/api/auth/resend-code",
    CREATE_PROFILE: "/api/auth/create-profile",
    CONNECT_SOCIAL: "/api/auth/connect-social",
  },
  USER: {
    PROFILE: "/api/user/profile",
    FRIENDS: "/api/user/friends",
  },
  SOCIAL: {
    SHARE: "/api/social/share",
    INVITE: "/api/social/invite",
  },
}

// Feature flags
export const FEATURES = {
  SOCIAL_SHARING: true,
  FRIEND_PAYMENTS: true,
  GIFT_CARDS: true,
}
