#!/usr/bin/env python3
"""
Skrip Penerbitan Automatik ke GitHub dan Vercel (Menggunakan Python Standard Library - Tanpa Kebergantungan)
"""

import os
import sys
import json
import base64
import urllib.request
import urllib.error

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_NAME = "anti-gravity-tajwid"

FILES_TO_UPLOAD = [
    "index.html",
    "style.css",
    "game.js",
    "tajwid-data.js",
    "vercel.json",
    ".gitignore",
    "README.md"
]

def make_request(url, method="GET", headers=None, data=None):
    if headers is None:
        headers = {}
    req = urllib.request.Request(url, method=method)
    for k, v in headers.items():
        req.add_header(k, v)
    if data is not None:
        if isinstance(data, dict):
            body = json.dumps(data).encode("utf-8")
            req.add_header("Content-Type", "application/json")
        elif isinstance(data, bytes):
            body = data
        else:
            body = data.encode("utf-8")
        req.data = body

    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode("utf-8")
            return resp.status, json.loads(content) if content else {}
    except urllib.error.HTTPError as e:
        err_content = e.read().decode("utf-8")
        try:
            err_json = json.loads(err_content)
        except Exception:
            err_json = {"raw": err_content}
        return e.code, err_json
    except Exception as e:
        return 0, {"error": str(e)}

def publish_to_github(token, repo_name=REPO_NAME, is_private=False):
    print(f"\n[*] Menyambung ke GitHub API...")
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "User-Agent": "AntiGravity-Deployer"
    }
    
    # 1. Dapatkan info pengguna
    status, user_info = make_request("https://api.github.com/user", headers=headers)
    if status != 200:
        print(f"[!] Ralat Pengesahan GitHub (Status {status}): {user_info.get('message', user_info)}")
        return None
    
    username = user_info["login"]
    print(f"[+] Disahkan sebagai pengguna GitHub: {username}")
    
    # 2. Cipta repositori jika belum wujud
    repo_url = f"https://api.github.com/repos/{username}/{repo_name}"
    status, repo_info = make_request(repo_url, headers=headers)
    if status == 404:
        print(f"[*] Mencipta repositori baharu '{repo_name}' di GitHub...")
        payload = {
            "name": repo_name,
            "description": "Permainan Mini Pendidikan Interaktif Kursus Tajwid Universiti (Tema Angkasa & Anti-Graviti)",
            "private": is_private,
            "auto_init": False
        }
        status, repo_info = make_request("https://api.github.com/user/repos", method="POST", headers=headers, data=payload)
        if status not in (200, 201):
            print(f"[!] Gagal mencipta repositori: {repo_info.get('message', repo_info)}")
            return None
        print(f"[+] Repositori berjaya dicipta: {repo_info.get('html_url')}")
    else:
        print(f"[+] Repositori sedia ada ditemui: {repo_info.get('html_url')}")

    # 3. Muat naik fail-fail projek
    print(f"[*] Memuat naik fail projek ke GitHub branch 'main'...")
    for filename in FILES_TO_UPLOAD:
        filepath = os.path.join(PROJECT_DIR, filename)
        if not os.path.exists(filepath):
            continue
        with open(filepath, "rb") as f:
            file_bytes = f.read()
        b64_content = base64.b64encode(file_bytes).decode("utf-8")
        
        # Semak sha fail sedia ada jika ada
        file_api_url = f"https://api.github.com/repos/{username}/{repo_name}/contents/{filename}"
        status, existing_file = make_request(file_api_url, headers=headers)
        
        upload_payload = {
            "message": f"Upload {filename} for Anti-Gravity Tajwid Challenge",
            "content": b64_content,
            "branch": "main"
        }
        if status == 200 and "sha" in existing_file:
            upload_payload["sha"] = existing_file["sha"]
            
        status, res = make_request(file_api_url, method="PUT", headers=headers, data=upload_payload)
        if status in (200, 201):
            print(f"  [✓] {filename} berjaya dimuat naik")
        else:
            print(f"  [✗] Gagal memuat naik {filename}: {res.get('message', res)}")
            
    html_url = repo_info.get("html_url", f"https://github.com/{username}/{repo_name}")
    print(f"\n🎉 Berjaya diterbitkan ke GitHub: {html_url}")
    return html_url

def deploy_to_vercel(token, project_name=REPO_NAME):
    print(f"\n[*] Menyambung ke Vercel API...")
    headers = {
        "Authorization": f"Bearer {token}",
        "User-Agent": "AntiGravity-Deployer"
    }
    
    # Kumpulkan fail untuk deployment
    files_payload = []
    for filename in FILES_TO_UPLOAD:
        filepath = os.path.join(PROJECT_DIR, filename)
        if not os.path.exists(filepath):
            continue
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        files_payload.append({
            "file": filename,
            "data": content
        })
        
    print(f"[*] Menghantar fail ke Vercel untuk deployment...")
    payload = {
        "name": project_name,
        "files": files_payload,
        "projectSettings": {
            "framework": None
        }
    }
    
    status, res = make_request("https://api.vercel.com/v13/deployments", method="POST", headers=headers, data=payload)
    if status in (200, 201):
        deploy_url = res.get("url")
        print(f"\n🚀 Selesai! Projek berjaya di-deploy ke Vercel:")
        print(f"   URL: https://{deploy_url}")
        return f"https://{deploy_url}"
    else:
        print(f"[!] Gagal deploy ke Vercel (Status {status}): {res.get('error', {}).get('message', res)}")
        return None

if __name__ == "__main__":
    github_token = os.environ.get("GITHUB_TOKEN")
    vercel_token = os.environ.get("VERCEL_TOKEN")

    if len(sys.argv) > 1:
        for arg in sys.argv[1:]:
            if arg.startswith("--github="):
                github_token = arg.split("=", 1)[1]
            elif arg.startswith("--vercel="):
                vercel_token = arg.split("=", 1)[1]

    if not github_token and not vercel_token:
        print("Panduan Penggunaan:")
        print("  python publish_and_deploy.py --github=<GITHUB_PAT> --vercel=<VERCEL_TOKEN>")
        print("Atau tetapkan env variable: GITHUB_TOKEN dan VERCEL_TOKEN")
        sys.exit(0)

    if github_token:
        publish_to_github(github_token)

    if vercel_token:
        deploy_to_vercel(vercel_token)
