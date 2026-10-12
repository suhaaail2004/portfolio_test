# Suhail Shihabudheen — DevOps & Cloud Engineer Portfolio

A modern, high-performance, and visually captivating developer portfolio built with **pure HTML5, CSS3, and vanilla JavaScript** (zero external frameworks or runtime dependencies). 

Designed specifically for entry-level **DevOps Engineer** and **Cloud Engineer** roles, highlighting practical Linux administration, Red Hat Certified System Administrator (**RHCSA**) credentials, and AWS cloud hosting competencies.

---

## 📁 Project Architecture & File Directory

```
portfolio/
├── index.html                # Semantic HTML5 single-page application structure
├── css/
│   └── style.css             # Design system, CSS variables, dark/light themes & responsiveness
├── js/
│   └── script.js             # Vanilla JS for navigation, theme toggle, typing & animations
├── assets/
│   └── images/
│       ├── avatar.svg        # Developer monogram badge vector
│       ├── rhcsa-badge.svg   # Red Hat Certified System Administrator badge vector
│       ├── project-portfolio.svg # Architecture diagram: EC2 + Nginx Web Hosting
│       ├── project-linux.svg     # Linux Server Administration Lab terminal visual
│       └── project-aws.svg       # AWS EC2 Cloud Provisioning & Security Groups visual
├── resume/
│   └── suhail__shihabudheen.pdf # Your official resume document (accessible via download & view)
└── README.md                 # Complete documentation and deployment guide
```

### File Responsibilities
1. **`index.html`**:
   - Contains semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Implements 7 distinct sections: Sticky Navigation, Hero, About Me, Technical Skills, Featured Projects, Certifications (RHCSA), Learning Journey, and Direct Contact Channels.
   - Includes full OpenGraph metadata, SEO tags, accessible `aria-*` attributes, and inline SVGs.
2. **`css/style.css`**:
   - Centralizes design tokens in `:root` CSS variables (`--bg-primary`, `--accent-cyan`, `--border-card`, etc.).
   - Full dark mode (navy/slate/cyan palette) with toggleable light mode (`[data-theme="light"]`).
   - Custom sleek scrollbar, glassmorphic navbar, responsive grid/flexbox layouts down to 320px mobile width.
   - Respects user accessibility preferences (`prefers-reduced-motion`).
3. **`js/script.js`**:
   - **Theme Switching**: Toggles dark and light mode, stores user preference in `localStorage`.
   - **Mobile Drawer**: Handles responsive hamburger menu open/close, click outside, and `Escape` key listeners.
   - **ScrollSpy & Smooth Scroll**: Dynamically highlights active navigation links as you scroll through sections.
   - **Typing Animation**: Smooth typing effect cycling through technical headlines in the hero section.
   - **Interactive Terminal**: Allows users to click tabs (`neofetch.sh`, `systemctl.log`, `deploy.sh`) to see different server logs.
   - **Clipboard Copy with Toast**: Copies email address with 1-click and triggers a floating toast confirmation.
   - **Scroll Reveal**: Uses modern `IntersectionObserver` API for buttery-smooth element reveals.
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
2. Install the **Live Server** extension (`ritwickdey.liveserver`) if installed.
3. Click **"Go Live"** in the bottom status bar to view on `http://127.0.0.1:5500`.

### Method 3: Using Python Static Server (Optional)
If Python is installed on your machine:
```powershell
cd C:\Users\Suhail\Desktop\portfolio_test
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

---

## 🎨 How to Customize Content, Colors & Links

All configurable data is cleanly organized with explicit comments:

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
  /* Change dark theme base colors */
  --bg-primary: #090d16;      /* Main background */
  --accent-cyan: #38bdf8;     /* Primary neon blue accent */
  --accent-indigo: #818cf8;   /* Secondary purple accent */
  --color-success: #10b981;   /* Terminal & status green */
}

[data-theme="light"] {
  /* Change light theme colors */
  --bg-primary: #f8fafc;
  --text-primary: #0f172a;
}
```

### 3. Customizing the Hero Typing Text
Open `js/script.js` and modify the array in `typeEffect()`:
```javascript
const words = [
  'Aspiring DevOps Engineer',
  'Cloud Infrastructure Enthusiast',
  'RHCSA Certified SysAdmin',
  'Linux & Automation Specialist'
];
```

---

## 🐙 How to Upload the Project to GitHub

Follow these steps using Git in PowerShell:

### Step 1: Initialize Git Repository
```powershell
cd C:\Users\Suhail\Desktop\portfolio_test
git init
```

### Step 2: Add Files & Make Initial Commit
```powershell
git add .
git commit -m "feat: initial commit of Suhail Shihabudheen DevOps portfolio"
```

### Step 3: Link to Remote GitHub Repository
1. Go to [github.com/new](https://github.com/new) and create a repository named `portfolio` (keep it Public).
2. Run:
```powershell
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
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
   - **Key Pair**: Create or select an existing `.pem` key pair (e.g. `suhail-key.pem`)
3. **Network Settings (Security Group)**:
   - Allow **SSH** (Port `22`) from your IP address
   - Allow **HTTP** (Port `80`) from `0.0.0.0/0` (Anywhere)
   - Allow **HTTPS** (Port `443`) from `0.0.0.0/0` (Anywhere)
4. Click **Launch Instance**. Note the **Public IPv4 address** of your instance.

---

### Step 2: Connect to your EC2 Instance via SSH
From your local terminal (where your key is saved):
```bash
ssh -i "path/to/suhail-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
```

---

### Step 3: Update System Packages and Install Nginx & Git
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
Remove the default Nginx welcome page and clone your repository:
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

    server_name _; # Or replace with your custom domain name (e.g. suhail.dev)

    root /var/www/portfolio;
    index index.html;

    # Gzip Compression for high performance
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
# Enable the site configuration
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Remove the default site link
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx syntax
sudo nginx -t

# Reload Nginx service
sudo systemctl reload nginx
```

Now open `http://<YOUR_EC2_PUBLIC_IP>` in your web browser. Your portfolio is live! 🚀

---

### Step 6: (Optional) Set up Free SSL via Let's Encrypt (Certbot)
If you point a domain name (e.g., `suhail.dev`) to your EC2 Public IP:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d suhail.dev -d www.suhail.dev
```
Certbot will automatically configure HTTPS on port 443 with auto-renewal!

---

## 🛡️ License & Attributions
Created by **Suhail Shihabudheen**. Open for portfolio usage, learning, and customization.
All trademarks (Red Hat, AWS, Nginx, Linux) belong to their respective owners.
