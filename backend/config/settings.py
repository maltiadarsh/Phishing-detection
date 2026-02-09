import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'

    # -------- MODEL PATH (Render + Local Safe) --------
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODEL_PATH = os.path.join(BASE_DIR, "models", "phishing_model.pkl")

    # -------- Security Settings --------
    MAX_URL_LENGTH = 2048
    REQUEST_TIMEOUT = 3

    # -------- Detection Thresholds --------
    LONG_URL_THRESHOLD = 150
    QUERY_PARAMS_THRESHOLD = 5
    OBFUSCATION_PATTERN_LENGTH = 20

    # -------- Popular Brands --------
    POPULAR_BRANDS = [
        'paypal', 'amazon', 'microsoft', 'google', 'facebook', 'apple',
        'netflix', 'instagram', 'twitter', 'linkedin', 'ebay', 'walmart',
        'skype', 'dropbox', 'adobe', 'yahoo', 'chase', 'wellsfargo',
        'bankofamerica', 'citibank', 'americanexpress', 'dhl', 'fedex'
    ]

    # -------- Phishing Keywords --------
    PHISHING_KEYWORDS = [
        'login', 'signin', 'verify', 'verification', 'confirm', 'update',
        'secure', 'account', 'banking', 'suspend', 'locked', 'unusual',
        'activity', 'restore', 'recover', 'validate', 'authenticate'
    ]
