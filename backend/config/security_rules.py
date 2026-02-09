import re
from urllib.parse import urlparse
from .settings import Config

class SecurityChecker:
    """Advanced security checks for phishing detection"""
    
    @staticmethod
    def check_brand_impersonation(url):
        """Check if URL impersonates popular brands"""
        parsed = urlparse(url)
        path_lower = parsed.path.lower()
        domain_lower = parsed.netloc.lower()
        
        for brand in Config.POPULAR_BRANDS:
            if brand in path_lower and brand not in domain_lower:
                return True, f"Brand impersonation: '{brand}' in path but not in domain '{parsed.netloc}'"
        return False, ""
    
    @staticmethod
    def check_phishing_keywords(url):
        """Check for multiple phishing keywords"""
        parsed = urlparse(url)
        path_lower = parsed.path.lower()
        
        found_keywords = [kw for kw in Config.PHISHING_KEYWORDS if kw in path_lower]
        if len(found_keywords) >= 2:
            return True, f"Multiple phishing keywords: {', '.join(found_keywords[:3])}"
        return False, ""
    
    @staticmethod
    def check_suspicious_domain(url):
        """Check for suspicious domain patterns"""
        parsed = urlparse(url)
        domain_name = parsed.netloc.split('.')[0]
        
        if re.search(r'\d{3,}', domain_name):
            return True, f"Suspicious domain pattern: '{parsed.netloc}' contains random numbers"
        return False, ""
    
    @staticmethod
    def check_url_length(url):
        """Check for excessively long URLs"""
        if len(url) > Config.LONG_URL_THRESHOLD:
            return True, f"Extremely long URL ({len(url)} characters)"
        return False, ""
    
    @staticmethod
    def check_query_params(url):
        """Check for excessive query parameters"""
        parsed = urlparse(url)
        if '?' in url:
            query_params = parsed.query.split('&')
            if len(query_params) > Config.QUERY_PARAMS_THRESHOLD:
                return True, f"Excessive query parameters ({len(query_params)} params)"
        return False, ""
    
    @staticmethod
    def check_obfuscation(url):
        """Check for obfuscated/encoded strings"""
        if re.search(r'[A-Za-z0-9]{20,}', url):
            return True, "Obfuscated/encoded string detected"
        return False, ""
    
    @staticmethod
    def run_all_checks(url):
        """Run all security checks and return first match"""
        checks = [
            SecurityChecker.check_brand_impersonation,
            SecurityChecker.check_phishing_keywords,
            SecurityChecker.check_suspicious_domain,
            SecurityChecker.check_url_length,
            SecurityChecker.check_query_params,
            SecurityChecker.check_obfuscation
        ]
        
        for check in checks:
            is_suspicious, reason = check(url)
            if is_suspicious:
                return True, reason
        
        return False, ""
