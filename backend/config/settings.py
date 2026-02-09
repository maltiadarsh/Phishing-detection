import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    MODEL_PATH = "backend/models/phishing_model.pkl"
    
    # Security settings
    MAX_URL_LENGTH = 2048
    REQUEST_TIMEOUT = 3
    
    # Phishing detection thresholds
    LONG_URL_THRESHOLD = 150
    QUERY_PARAMS_THRESHOLD = 5
    OBFUSCATION_PATTERN_LENGTH = 20
    
    # Popular brands for impersonation detection
    POPULAR_BRANDS = [
        'paypal', 'amazon', 'microsoft', 'google', 'facebook', 'apple',
        'netflix', 'instagram', 'twitter', 'linkedin', 'ebay', 'walmart',
        'skype', 'dropbox', 'adobe', 'yahoo', 'chase', 'wellsfargo',
        'bankofamerica', 'citibank', 'americanexpress', 'dhl', 'fedex'
    ]
    
    # Phishing keywords
    PHISHING_KEYWORDS = [
        'login', 'signin', 'verify', 'verification', 'confirm', 'update',
        'secure', 'account', 'banking', 'suspend', 'locked', 'unusual',
        'activity', 'restore', 'recover', 'validate', 'authenticate'
    ]
