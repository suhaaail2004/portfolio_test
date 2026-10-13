# Suhail Shihabudheen — Junior DevOps & Cloud Engineer Portfolio

A clean, modern, minimal, and professional developer portfolio built with **pure HTML5, CSS3, and vanilla JavaScript** (zero external frameworks or runtime dependencies). 

Designed specifically for entry-level **Junior DevOps Engineer**, **Cloud Engineer**, and **Linux System Administrator** roles, highlighting practical Linux administration, Red Hat Certified System Administrator (**RHCSA**) credentials, and AWS cloud hosting competencies.

---

## 📁 Project Architecture & File Directory

```
portfolio/
├── index.html                # Semantic HTML5 single-page application structure
├── css/
│   └── style.css             # Minimal design system, CSS variables, light/dark themes & responsiveness
├── js/
│   └── script.js             # Vanilla JS for navigation, theme toggle, clipboard copy & scrollspy
├── assets/
│   └── images/
│       ├── avatar.svg        # Developer monogram badge vector
│       ├── rhcsa-badge.svg   # Red Hat Certified System Administrator badge vector
│       ├── project-portfolio.svg # Architecture diagram: EC2 + Nginx Web Hosting
│       ├── project-linux.svg     # Linux Server Administration Lab terminal visual
│       └── project-aws.svg       # AWS EC2 Cloud Provisioning & Security Groups visual
├── resume/
│   └── suhail__shihabudheen.pdf # Official resume document (accessible via download & view)
└── README.md                 # Complete documentation and deployment guide
```

### File Responsibilities
1. **`index.html`**:
   - Contains semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Implements 7 distinct sections: Navigation, Hero with Engineering Profile Card, About Me, Technical Skills (6 clean categories), Featured Projects, Certifications (RHCSA), Learning Journey, and Direct Contact Channels.
   - Includes OpenGraph metadata, SEO tags, accessible `aria-*` attributes, and clean SVG iconography.
2. **`css/style.css`**:
   - Centralizes design tokens in `:root` CSS variables using a clean, light theme by default (`#F8FAFC` background, `#172033` dark navy text, `#2563EB` blue accent, `#FFFFFF` cards, `#E2E8F0` borders).
   - Understated slate dark mode toggleable via `[data-theme="dark"]`.
   - Subtle shadows, moderate rounded corners, Inter typography, and responsive layouts down to 320px mobile width.
   - Respects user accessibility preferences (`prefers-reduced-motion`).
3. **`js/script.js`**:
   - **Theme Switching**: Toggles light and dark mode, defaulting to light mode and persisting preference in `localStorage`.
   - **Mobile Drawer**: Handles responsive hamburger menu open/close, click outside, and `Escape` key listeners.
   - **ScrollSpy & Smooth Scroll**: Dynamically highlights active navigation links as you scroll through sections.
   - **Clipboard Copy with Toast**: Copies email address with 1-click and triggers a subtle toast confirmation.
   - **Scroll Reveal**: Uses `IntersectionObserver` API for smooth element reveals.
   - **Dynamic Date**: Keeps copyright year current (`new Date().getFullYear()`).

---

## 🚀 How to Run the Website Locally

Because this project is built using vanilla web standards, you do not need any compilers, bundlers, or Node.js packages to run it.

### Method 1: Direct File Open (Fastest)
1. Navigate to the project folder:
   ```
   C:\Users\Suhail\Desktop\portfolio_test
   ```
2. Double-click **`index.html`** or right-click and select **Open with > Google Chrome** (or Edge / Firefox / Brave).

### Method 2: Using VS Code Live Server
1. Open the folder in VS Code:
   ```powershell
   code C:\Users\Suhail\Desktop\portfolio_test
   ```
2. Click **"Go Live"** in the bottom status bar if Live Server is installed to view on `http://127.0.0.1:5500`.

---

## 🎨 How to Customize Content, Colors & Links

All configurable data is cleanly organized:

### 1. Customizing Personal Details & Social Links
Open `index.html` and search for these placeholders:
- **Email Address**: Search for `suhail.shihabudheen.devops@example.com` and replace with your actual email.
- **LinkedIn Profile**: Search for `linkedin.com/in/suhail-shihabudheen` and replace with your profile URL.
- **GitHub Profile**: Search for `github.com/suhail-shihabudheen` and replace with your GitHub username.
- **RHCSA Verification Link**: Search for `https://www.redhat.com/en/services/certification` and paste your official verification URL.
- **Project Repositories**: Search for `https://github.com/yourusername/` in the `#projects` section.

### 2. Customizing Color Themes & Styles
Open `css/style.css` at the top:
```css
:root {
  --bg-primary: #F8FAFC;         /* Clean slate-50 background */
  --bg-surface: #FFFFFF;         /* Pure white cards */
  --text-primary: #172033;       /* Dark navy text */
  --text-secondary: #64748B;     /* Slate-500 secondary text */
  --accent-blue: #2563EB;        /* Professional blue accent */
  --border-color: #E2E8F0;       /* Slate-200 clean borders */
}
```

---

## ☁️ How to Deploy on an AWS EC2 Ubuntu Instance Using Nginx

This setup follows industry best practices for hosting static websites on AWS.

### Step 1: Provision an Amazon EC2 Instance
1. Log in to the **AWS Management Console** and navigate to **EC2**.
2. Click **Launch Instance**:
   - **Name**: `devops-portfolio-webserver`
   - **AMI**: Ubuntu Server 22.04 LTS (HVM), SSD Volume Type
   - **Instance Type**: `t2.micro` or `t3.micro` (Free Tier eligible)
   - **Key Pair**: Create or select an existing `.pem` key pair
3. **Network Settings (Security Group)**:
   - Allow **SSH** (Port `22`) from your IP address
   - Allow **HTTP** (Port `80`) from `0.0.0.0/0` (Anywhere)
   - Allow **HTTPS** (Port `443`) from `0.0.0.0/0` (Anywhere)
4. Click **Launch Instance**. Note the **Public IPv4 address** of your instance.

---

### Step 2: Connect to your EC2 Instance via SSH
From your local terminal:
```bash
ssh -i "path/to/your-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
```

---

### Step 3: Update Packages and Install Nginx & Git
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git
```

Verify Nginx is active:
```bash
sudo systemctl status nginx
```

---

### Step 4: Clone Your Portfolio onto the Server
```bash
# Remove default web root
sudo rm -rf /var/www/html/*

# Clone your GitHub portfolio into /var/www/portfolio
sudo git clone https://github.com/<your-username>/portfolio.git /var/www/portfolio

# Ensure correct file permissions
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio
```

---

### Step 5: Configure Nginx Virtual Host
Create a custom Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Paste the following production configuration:
```nginx
server {
    listen 80;
    listen [::]:80;

    server_name _; # Or replace with your domain name (e.g. suhail.dev)

    root /var/www/portfolio;
    index index.html;

    # Gzip Compression for fast load times
    gzip on;
    gzip_types text/plain text/css application/javascript image/svg+xml;
    gzip_min_length 256;

    # Caching headers for static assets
    location ~* \.(css|js|svg|png|jpg|pdf)$ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

Enable the configuration and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Now open `http://<YOUR_EC2_PUBLIC_IP>` in your web browser. Your portfolio is live! 🚀

---

## 🛡️ License & Attributions
Created by **Suhail Shihabudheen**. Open for portfolio usage, learning, and customization.
All trademarks (Red Hat, AWS, Nginx, Linux) belong to their respective owners.
