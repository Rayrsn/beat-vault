#!/usr/bin/env python3
"""
Cloudflare R2 Beat Pack Uploader Script
Uploads all 10 Beat Pack directories & keys to your Cloudflare R2 Bucket.

Usage:
  python3 upload_to_r2.py

Requirements:
  pip install boto3
"""

import os
import sys
import mimetypes

try:
    import boto3
    from botocore.config import Config
except ImportError:
    print("Installing required 'boto3' library...")
    os.system(f"{sys.executable} -m pip install boto3")
    import boto3
    from botocore.config import Config

# Interactive or environment credentials
account_id = os.environ.get("CLOUDFLARE_ACCOUNT_ID") or input("Enter Cloudflare Account ID: ").strip()
access_key_id = os.environ.get("R2_ACCESS_KEY_ID") or input("Enter R2 Access Key ID: ").strip()
secret_access_key = os.environ.get("R2_SECRET_ACCESS_KEY") or input("Enter R2 Secret Access Key: ").strip()
bucket_name = os.environ.get("R2_BUCKET_NAME") or input("Enter R2 Bucket Name (e.g. rayr-beats-audio): ").strip()

endpoint_url = f"https://{account_id}.r2.cloudflarestorage.com"

# Initialize S3 client for R2
s3_client = boto3.client(
    "s3",
    endpoint_url=endpoint_url,
    aws_access_key_id=access_key_id,
    aws_secret_access_key=secret_access_key,
    config=Config(signature_version="s3v4"),
    region_name="auto"
)

# Directories to upload
target_dirs = [
    "beat-pack-3",
    "beat-pack-4-keys",
    "beat-pack-5-keys",
    "beat-pack-6-keys",
    "beat-pack-7-keys",
    "beat-pack-8-keys",
    "beat-pack-special-keys",
    "beat-pack-x-keys",
    "beats",
    "new-beats"
]

content_type_map = {
    ".m3u8": "application/x-mpegurl",
    ".ts": "video/MP2T",
    ".key": "application/octet-stream",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp"
}

total_files = 0
uploaded_files = 0

print(f"\n🚀 Starting upload to Cloudflare R2 bucket: '{bucket_name}'...")
print(f"🔗 Target Public Domain: https://beats.rayr.cf\n")

for target in target_dirs:
    if not os.path.exists(target):
        print(f"⚠️ Directory '{target}' not found, skipping...")
        continue

    for root, _, files in os.walk(target):
        for f in files:
            local_path = os.path.join(root, f)
            # R2 key maintains clean relative path
            r2_key = os.path.relpath(local_path, ".").replace("\\", "/")

            ext = os.path.splitext(f)[1].lower()
            content_type = content_type_map.get(ext, mimetypes.guess_type(local_path)[0] or "application/octet-stream")

            try:
                print(f"Uploading [{uploaded_files + 1}] {r2_key} ({content_type})...")
                s3_client.upload_file(
                    local_path,
                    bucket_name,
                    r2_key,
                    ExtraArgs={
                        "ContentType": content_type,
                        "CacheControl": "public, max-age=31536000"
                    }
                )
                uploaded_files += 1
            except Exception as e:
                print(f"❌ Failed to upload {r2_key}: {e}")

print(f"\n🎉 UPLOAD COMPLETE! {uploaded_files} files successfully uploaded to Cloudflare R2 bucket '{bucket_name}'.")
print(f"⚡ All tracks in beats-manifest.json now stream directly from https://beats.rayr.cf!")
