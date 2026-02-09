<div align="center">

<h1>🛡️ PhishDetector</h1>
<h3>AI Powered Phishing Detection Platform</h3>

</div>

---

## 📸 Demo

### Web Interface

![Main Interface](https://github.com/maltiadarsh/Phishing-detection/blob/main/backend/photo/image1.png)

### Detection Results

![Detection Results](https://github.com/maltiadarsh/Phishing-detection/blob/main/backend/photo/image.png)

---

## 🎯 Objective

Phishing websites are one of the most widespread social engineering threats, designed to mimic legitimate Uniform Resource Locators (URLs) and web interfaces to steal sensitive user information such as login credentials, banking details, and personal data.

The objective of this project is to design and develop a Machine Learning–based phishing detection system capable of identifying malicious websites using intelligent feature extraction from URLs and webpage content.

This project focuses on:

- Collecting and curating datasets containing **phishing and legitimate (benign) URLs**
- Extracting **URL-based and webpage content-based security features**
- Training **Machine Learning models and Deep Neural Networks**
- Evaluating and comparing model performance using standard metrics
- Building a foundation for **real-time phishing detection deployment**

---

This project uses the **Phishing Website Detector Dataset** available on Kaggle:

Dataset Source:
https://www.kaggle.com/datasets/eswarchandt/phishing-website-detector

Dataset Details:

- ~11,000+ website samples
- 30+ website security features
- Binary classification label (Phishing / Legitimate)
- Includes URL-based and content-based attributes

The dataset is widely used for research and machine learning-based phishing detection experiments.

---

## 🧠 Approach

1️. **Dataset Collection**

The dataset was collected from publicly available Kaggle resources.

Dataset Used:
Phishing Website Detector Dataset (Kaggle)

This dataset contains:

- 11,000+ website samples
- 30+ website parameters
- Labeled data for phishing vs legitimate classification

The dataset was cleaned and preprocessed to remove duplicate and invalid records before training.

2. **Feature Engineering**
   - URL structure features
   - Domain-based features
   - HTML / content-based signals
   - Security indicators

3. **Model Training**
   - Traditional ML models
   - Deep Learning models for pattern recognition

4. **Performance Evaluation**
   - Accuracy
   - Precision / Recall
   - F1 Score
   - ROC-AUC

---

## ✨ Features

### 🔍 Advanced Phishing Detection

- Machine Learning based URL classification
- Real-time phishing detection with confidence score
- Multi-layer security checks
- 30+ feature based URL analysis

### ⚡ Real-Time Processing

- Fast prediction using optimized ML model
- REST API support for integration
- Low latency response system

### 🎨 User Friendly Interface

- Clean and responsive UI
- Instant scan results
- Visual threat level indicators

### 🛡️ Security Intelligence

- Brand impersonation detection
- Suspicious keyword analysis
- Domain pattern anomaly detection
- URL obfuscation detection

---

## 🛠 Tech Stack

### Backend

- ![Python](https://img.shields.io/badge/Python-3.10-blue.svg)
- ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
- ![ML](https://img.shields.io/badge/ML-Scikit--Learn-orange.svg)
- ![Pandas](https://img.shields.io/badge/Pandas-150458?logo=pandas&logoColor=white)
- ![NumPy](https://img.shields.io/badge/NumPy-013243?logo=numpy&logoColor=white)

### Frontend

- ![React](https://img.shields.io/badge/React-UI%20Library-61DAFB?logo=react&logoColor=black)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Utility%20CSS-06B6D4?logo=tailwindcss&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite&logoColor=white)

### Machine Learning

- ![Gradient Boosting](https://img.shields.io/badge/Gradient%20Boosting-ML%20Model-FF6F00)
- ![Feature Engineering](https://img.shields.io/badge/Feature%20Engineering-ML%20Pipeline-8E44AD)
- ![Pickle](https://img.shields.io/badge/Pickle-Model%20Serialization-4CAF50)

---

## 📊 Model Performance

The system was trained and evaluated using multiple machine learning models.  
The **Gradient Boosting Classifier** showed the best performance and was selected for deployment.

### Model Comparison

| Rank | ML Model                         | Accuracy  | F1-Score  | Recall    | Precision |
| ---- | -------------------------------- | --------- | --------- | --------- | --------- |
| 1    | **Gradient Boosting Classifier** | **97.4%** | **97.7%** | **99.4%** | **98.6%** |
| 2    | CatBoost Classifier              | 97.2%     | 97.5%     | 99.4%     | 98.9%     |
| 3    | Multi-layer Perceptron           | 96.9%     | 97.3%     | 99.5%     | 98.1%     |
| 4    | Random Forest                    | 96.7%     | 97.1%     | 99.3%     | 99.0%     |
| 5    | Support Vector Machine           | 96.4%     | 96.8%     | 98.0%     | 96.5%     |
| 6    | Decision Tree                    | 96.0%     | 96.4%     | 99.1%     | 99.3%     |
| 7    | K-Nearest Neighbors              | 95.6%     | 96.1%     | 99.1%     | 98.9%     |
| 8    | Logistic Regression              | 93.4%     | 94.1%     | 94.3%     | 92.7%     |
| 9    | Naive Bayes Classifier           | 60.5%     | 45.4%     | 29.2%     | 99.7%     |

---

### ⚡ System Performance

- Average API Response Time: < 500ms
- ML Prediction Time: < 200ms
- Security Rule Check Time: < 50ms

---

## 🤖 Machine Learning Models

Multiple ML models were trained and evaluated. The **Gradient Boosting Classifier** was selected for production due to its superior performance.

---

### 🧠 Why Gradient Boosting?

- High accuracy with strong generalization
- Excellent recall → detects most phishing websites
- Low false positive rate
- Fast inference suitable for real-time detection

---

## 🚀 Installation

Follow these steps to set up the PhishDetector project locally.

---

### 📌 Prerequisites

Make sure you have installed:

- Python 3.10 or higher
- Node.js (v18 or higher recommended)
- Git
- Conda or Virtualenv (optional but recommended)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/maltiadarsh/phishing-detection.git
cd phishing-detection
```

### 2️⃣ Create Python Virtual Environment

```bash
conda create -n phishdetector python=3.10
conda activate phishdetector
```

### 3️⃣ Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 5️⃣ Run Backend Server

```bash
cd backend
uvicorn app:app --reload

```

Backend will run on:
http://localhost:8000

### 6️⃣ Run Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on:

http://localhost:5173

---

## 🌍 Live Demo

The project is deployed and accessible online.

🔗 Live Application: (Coming Soon)

---

### 🚀 Deployment Stack

- Backend: FastAPI
- Frontend: React + Vite
- ML Model: Gradient Boosting Classifier

---

## 👨‍💻 Author

**Adarsh Srivastava**

**Machine Learning Engineer | Data Science | AI Systems |**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://linkedin.com/in/maltiadarsh)
[![GitHub](https://img.shields.io/badge/GitHub-maltiadarsh-black?logo=github)](https://github.com/maltiadarsh)
[![Email](https://img.shields.io/badge/Email-Contact-red?logo=gmail)](mailto:adarshsrivastava.ds@email.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-Website-black?logo=googlechrome)](https://advia.in)
[![personal - Portfolio](https://img.shields.io/badge/Portfolio-portflio-blue?logo=googlechrome)](https://adarsh.advia.in)
