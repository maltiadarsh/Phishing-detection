import ipaddress
import re
import socket
from urllib.parse import urlparse
from datetime import date
from concurrent.futures import ThreadPoolExecutor, TimeoutError as FuturesTimeoutError
import requests
from bs4 import BeautifulSoup
import whois

# Global timeout settings for speed
REQUEST_TIMEOUT = 2  # seconds
WHOIS_TIMEOUT = 2    # seconds


class FeatureExtraction:
    """Optimized feature extraction with timeouts and concurrent requests."""
    
    def __init__(self, url):
        self.features = []
        self.url = url
        self.domain = ""
        self.whois_response = None
        self.urlparse = None
        self.response = None
        self.soup = None

        # Parse URL first (instant, no network)
        try:
            self.urlparse = urlparse(url)
            self.domain = self.urlparse.netloc
        except:
            pass

        # Run network operations concurrently with timeouts
        self._fetch_data_concurrently()

        # Extract all 30 features
        self._extract_features()

    def _fetch_data_concurrently(self):
        """Fetch webpage and WHOIS data concurrently with strict timeouts."""
        def fetch_webpage():
            try:
                resp = requests.get(self.url, timeout=REQUEST_TIMEOUT, 
                                   headers={'User-Agent': 'Mozilla/5.0'})
                return resp
            except:
                return None

        def fetch_whois():
            try:
                return whois.whois(self.domain)
            except:
                return None

        # Run both requests in parallel
        with ThreadPoolExecutor(max_workers=2) as executor:
            page_future = executor.submit(fetch_webpage)
            whois_future = executor.submit(fetch_whois)

            try:
                self.response = page_future.result(timeout=REQUEST_TIMEOUT + 0.5)
                if self.response:
                    self.soup = BeautifulSoup(self.response.text, 'html.parser')
            except:
                self.response = None

            try:
                self.whois_response = whois_future.result(timeout=WHOIS_TIMEOUT + 0.5)
            except:
                self.whois_response = None

    def _extract_features(self):
        """Extract all 30 features for ML model."""
        self.features = [
            self.UsingIp(),
            self.longUrl(),
            self.shortUrl(),
            self.symbol(),
            self.redirecting(),
            self.prefixSuffix(),
            self.SubDomains(),
            self.Hppts(),
            self.DomainRegLen(),
            self.Favicon(),
            self.NonStdPort(),
            self.HTTPSDomainURL(),
            self.RequestURL(),
            self.AnchorURL(),
            self.LinksInScriptTags(),
            self.ServerFormHandler(),
            self.InfoEmail(),
            self.AbnormalURL(),
            self.WebsiteForwarding(),
            self.StatusBarCust(),
            self.DisableRightClick(),
            self.UsingPopupWindow(),
            self.IframeRedirection(),
            self.AgeofDomain(),
            self.DNSRecording(),
            self.WebsiteTraffic(),
            self.PageRank(),
            self.GoogleIndex(),
            self.LinksPointingToPage(),
            self.StatsReport()
        ]

    # 1. UsingIp
    def UsingIp(self):
        try:
            ipaddress.ip_address(self.url)
            return -1
        except:
            return 1

    # 2. longUrl
    def longUrl(self):
        if len(self.url) < 54:
            return 1
        if 54 <= len(self.url) <= 75:
            return 0
        return -1

    # 3. shortUrl
    def shortUrl(self):
        shorteners = r'bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|lnkd\.in|db\.tt|qr\.ae|adf\.ly|bitly\.com|cur\.lv|tinyurl\.com|ity\.im|q\.gs|po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|link\.zip\.net'
        if re.search(shorteners, self.url):
            return -1
        return 1

    # 4. Symbol@
    def symbol(self):
        return -1 if "@" in self.url else 1

    # 5. Redirecting//
    def redirecting(self):
        return -1 if self.url.rfind('//') > 6 else 1

    # 6. prefixSuffix
    def prefixSuffix(self):
        try:
            return -1 if '-' in self.domain else 1
        except:
            return -1

    # 7. SubDomains
    def SubDomains(self):
        dot_count = self.url.count('.')
        if dot_count == 1:
            return 1
        elif dot_count == 2:
            return 0
        return -1

    # 8. HTTPS
    def Hppts(self):
        try:
            return 1 if self.urlparse.scheme == 'https' else -1
        except:
            return 1

    # 9. DomainRegLen
    def DomainRegLen(self):
        try:
            if not self.whois_response:
                return -1
            exp = self.whois_response.expiration_date
            cre = self.whois_response.creation_date
            if isinstance(exp, list): exp = exp[0]
            if isinstance(cre, list): cre = cre[0]
            age = (exp.year - cre.year) * 12 + (exp.month - cre.month)
            return 1 if age >= 12 else -1
        except:
            return -1

    # 10. Favicon
    def Favicon(self):
        try:
            if not self.soup:
                return -1
            for link in self.soup.find_all('link', href=True):
                href = link['href']
                if self.domain in href or href.startswith('/') or href.startswith('./'):
                    return 1
            return -1
        except:
            return -1

    # 11. NonStdPort
    def NonStdPort(self):
        try:
            return -1 if ':' in self.domain.split(':')[-1].replace(self.domain.split(':')[0], '') else 1
        except:
            return 1

    # 12. HTTPSDomainURL
    def HTTPSDomainURL(self):
        return -1 if 'https' in self.domain.lower() else 1

    # 13. RequestURL
    def RequestURL(self):
        try:
            if not self.soup:
                return 0
            total, success = 0, 0
            for tag in self.soup.find_all(['img', 'audio', 'embed', 'iframe'], src=True):
                total += 1
                src = tag['src']
                if self.domain in src or src.startswith('/') or src.startswith('./'):
                    success += 1
            if total == 0:
                return 0
            pct = (success / total) * 100
            if pct >= 61:
                return -1
            elif pct >= 22:
                return 0
            return 1
        except:
            return 0

    # 14. AnchorURL
    def AnchorURL(self):
        try:
            if not self.soup:
                return -1
            total, unsafe = 0, 0
            for a in self.soup.find_all('a', href=True):
                total += 1
                href = a['href'].lower()
                if '#' in href or 'javascript' in href or 'mailto' in href:
                    unsafe += 1
                elif self.domain not in href and not href.startswith('/'):
                    unsafe += 1
            if total == 0:
                return -1
            pct = (unsafe / total) * 100
            if pct >= 67:
                return -1
            elif pct >= 31:
                return 0
            return 1
        except:
            return -1

    # 15. LinksInScriptTags
    def LinksInScriptTags(self):
        try:
            if not self.soup:
                return 0
            total, success = 0, 0
            for tag in self.soup.find_all(['link', 'script'], src=True):
                total += 1
                src = tag.get('src') or tag.get('href', '')
                if self.domain in src or src.startswith('/'):
                    success += 1
            for tag in self.soup.find_all('link', href=True):
                total += 1
                if self.domain in tag['href'] or tag['href'].startswith('/'):
                    success += 1
            if total == 0:
                return 0
            pct = (success / total) * 100
            if pct >= 81:
                return -1
            elif pct >= 17:
                return 0
            return 1
        except:
            return 0

    # 16. ServerFormHandler
    def ServerFormHandler(self):
        try:
            if not self.soup:
                return 1
            forms = self.soup.find_all('form', action=True)
            if not forms:
                return 1
            for form in forms:
                action = form['action']
                if action in ('', 'about:blank'):
                    return -1
                if self.domain not in action and not action.startswith('/'):
                    return 0
            return 1
        except:
            return -1

    # 17. InfoEmail
    def InfoEmail(self):
        try:
            if not self.soup:
                return 1
            text = str(self.soup)
            return -1 if 'mailto:' in text.lower() else 1
        except:
            return 1

    # 18. AbnormalURL
    def AbnormalURL(self):
        try:
            if self.whois_response and self.domain in str(self.whois_response):
                return 1
            return -1
        except:
            return -1

    # 19. WebsiteForwarding
    def WebsiteForwarding(self):
        try:
            if not self.response:
                return -1
            redirects = len(self.response.history)
            if redirects <= 1:
                return 1
            elif redirects <= 4:
                return 0
            return -1
        except:
            return -1

    # 20. StatusBarCust
    def StatusBarCust(self):
        try:
            if not self.response:
                return -1
            return 1 if 'onmouseover' in self.response.text.lower() else -1
        except:
            return -1

    # 21. DisableRightClick
    def DisableRightClick(self):
        try:
            if not self.response:
                return -1
            return 1 if 'event.button' in self.response.text else -1
        except:
            return -1

    # 22. UsingPopupWindow
    def UsingPopupWindow(self):
        try:
            if not self.response:
                return -1
            return 1 if 'alert(' in self.response.text else -1
        except:
            return -1

    # 23. IframeRedirection
    def IframeRedirection(self):
        try:
            if not self.response:
                return -1
            text = self.response.text.lower()
            return 1 if '<iframe' in text or '<frameborder' in text else -1
        except:
            return -1

    # 24. AgeofDomain
    def AgeofDomain(self):
        try:
            if not self.whois_response:
                return -1
            creation = self.whois_response.creation_date
            if isinstance(creation, list):
                creation = creation[0]
            today = date.today()
            age = (today.year - creation.year) * 12 + (today.month - creation.month)
            return 1 if age >= 6 else -1
        except:
            return -1

    # 25. DNSRecording (same as AgeofDomain)
    def DNSRecording(self):
        return self.AgeofDomain()

    # 26. WebsiteTraffic - FAST VERSION (Alexa is dead, return neutral)
    def WebsiteTraffic(self):
        # Alexa service discontinued - return neutral value
        return 0

    # 27. PageRank - FAST VERSION (skip slow external API)
    def PageRank(self):
        # External API too slow - return neutral value based on domain age
        try:
            if self.whois_response and self.whois_response.creation_date:
                return 1  # Has WHOIS = likely legitimate
            return -1
        except:
            return -1

    # 28. GoogleIndex - FAST VERSION (skip slow Google search)
    def GoogleIndex(self):
        # Google search is too slow - check if site responds instead
        return 1 if self.response and self.response.status_code == 200 else -1

    # 29. LinksPointingToPage
    def LinksPointingToPage(self):
        try:
            if not self.response:
                return -1
            links = self.response.text.count('<a href=')
            if links == 0:
                return 1
            elif links <= 2:
                return 0
            return -1
        except:
            return -1

    # 30. StatsReport
    def StatsReport(self):
        bad_patterns = r'at\.ua|usa\.cc|pe\.hu|esy\.es|hol\.es|sweddy\.com|myjino\.ru|96\.lt|ow\.ly'
        if re.search(bad_patterns, self.url):
            return -1
        # Skip slow DNS lookup for IP blacklist check
        return 1

    def getFeaturesList(self):
        return self.features
