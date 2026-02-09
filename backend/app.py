from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import numpy as np
import pickle
import warnings
import logging
import os

from utils.convert import convertion
from utils.feature import FeatureExtraction
from config.settings import Config
from config.security_rules import SecurityChecker
from config.url_utils import URLProcessor

warnings.filterwarnings("ignore")

# -------------------------------
# Logging
# -------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# -------------------------------
# FastAPI App
# -------------------------------
app = FastAPI(title="Phishing Detection API", version="1.0")

# -------------------------------
# Load Model
# -------------------------------
try:
    with open(Config.MODEL_PATH, "rb") as file:
        gbc = pickle.load(file)
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    gbc = None

# -------------------------------
# Request Schema
# -------------------------------
class URLRequest(BaseModel):
    url: str

# -------------------------------
# API ROUTES
# -------------------------------
@app.post("/api/check")
def api_check(request: URLRequest):
    try:
        url = request.url.strip()

        if not url:
            raise HTTPException(status_code=400, detail="URL is required")

        # Normalize URL
        url = URLProcessor.normalize_url(url)

        # Security Checks
        is_suspicious, override_reason = SecurityChecker.run_all_checks(url)

        if is_suspicious:
            return {
                "url": url,
                "is_safe": False,
                "prediction": "phishing",
                "confidence": 95.0,
                "threat_level": "HIGH",
                "reason": override_reason
            }

        # ML Prediction
        if gbc is None:
            raise HTTPException(status_code=500, detail="Model not loaded")

        obj = FeatureExtraction(url)
        x = np.array(obj.getFeaturesList()).reshape(1, 30)

        y_pred = gbc.predict(x)[0]
        y_proba = gbc.predict_proba(x)[0]

        confidence = y_proba[1] * 100 if y_pred == 1 else y_proba[0] * 100

        return {
            "url": url,
            "is_safe": bool(y_pred == 1),
            "prediction": "safe" if y_pred == 1 else "phishing",
            "confidence": round(confidence, 2),
            "threat_level": "LOW" if y_pred == 1 else ("HIGH" if confidence > 80 else "MEDIUM")
        }

    except Exception as e:
        logger.error(f"API error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# -------------------------------
# FRONTEND STATIC SERVE (React Build)
# -------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
frontend_dist = os.path.join(BASE_DIR, "..", "frontend", "dist")

if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
    print("✅ Serving Vite dist frontend")
else:
    print("⚠ Frontend dist folder not found")

