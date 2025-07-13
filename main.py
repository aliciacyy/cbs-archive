from playwright.sync_api import sync_playwright
import os
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import date

load_dotenv()  # Load environment variables from .env

def run():
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)  # Change to True to run headless
        context = browser.new_context()

        # Go to the site
        page = context.new_page()
        # Before the page loads
        page.add_init_script("""
            window._copiedText = '';
            const originalWriteText = navigator.clipboard.writeText;
            navigator.clipboard.writeText = function(text) {
                window._copiedText = text;
                return originalWriteText.call(this, text);
            };
        """)
        page.goto("https://cluesbysam.com")

        # Wait for the button and click it
        button = page.locator("button", has_text="Share progress").first
        button.wait_for(timeout=10000)
        button.click()

        # Wait briefly for clipboard operation to complete
        page.wait_for_timeout(1000)

        # Now retrieve the intercepted value
        copied_text = page.evaluate("window._copiedText")
        print("Intercepted clipboard content:", copied_text)

        # create date in yyyy-mm-dd format
        today = date.today().isoformat()

        print("copied_text:", copied_text)
        response = (
            supabase.table("clues_by_sam_links")
            .insert({"date": today, "link": str(copied_text)})
            .execute()
        )
        print(response)

        # Evaluate clipboard in the browser context
        # clipboard_content = page.evaluate("navigator.clipboard.readText()")
        # print("📋 Clipboard content:", clipboard_content)

        browser.close()

if __name__ == "__main__":
    run()
