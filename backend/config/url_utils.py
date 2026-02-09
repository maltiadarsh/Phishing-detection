import requests
from .settings import Config

class URLProcessor:
    """Handle URL normalization and validation"""
    
    @staticmethod
    def normalize_url(url):
        """Auto-detect and add HTTP/HTTPS protocol"""
        if not url.startswith(('http://', 'https://')):
            try:
                test_url = 'https://' + url
                response = requests.head(test_url, timeout=Config.REQUEST_TIMEOUT, allow_redirects=True)
                return test_url
            except:
                return 'http://' + url
        return url
    
    @staticmethod
    def validate_url(url):
        """Validate URL format and length"""
        if not url or len(url) > Config.MAX_URL_LENGTH:
            return False, "Invalid URL length"
        
        if not any(url.startswith(prefix) for prefix in ['http://', 'https://']):
            return False, "Invalid URL format"
        
        return True, ""
