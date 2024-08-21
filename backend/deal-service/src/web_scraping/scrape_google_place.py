import os
from selenium import webdriver
from bs4 import BeautifulSoup
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from utils.addressConverter import getLongLatFromAddressString

def scrape_google_place_info(restaurant_name: str):
    if not restaurant_name:
        raise ValueError("restaurant_name is required")
    
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")  # This bypasses OS security model (for docker)
    options.add_argument("--disable-dev-shm-usage")  # overcome limited resource problems (for docker)
    options.add_argument("--disable-gpu") # (for docker)
    
    driver = None
    SELENIUM_URL = os.environ.get('SELENIUM_URL', '')

    if SELENIUM_URL:
        driver = webdriver.Remote(command_executor=SELENIUM_URL, options=options)
    else:
        driver = webdriver.Chrome(options=options) # not running on docker, assume have chrome stuff
    try:
        return get_webscrape_data_google_places(driver, restaurant_name)
    except Exception as e:
        print(f"Error while trying to scrape: {e}")
        driver.quit()
        raise e

def get_webscrape_data_google_places(driver: webdriver, restaurant_name: str):
    # Open the website
    driver.get(f"https://www.google.com/maps/search/\"{restaurant_name}\"")

    res = scroll_to_bottom_get_place_results(driver, restaurant_name)

    driver.quit()

    return res


def scroll_to_bottom_get_place_results(driver: webdriver, restaurant_name: str):
    # Find the scrollable container that contains "Results for {restaurant name}"
    scrollable_element = driver.find_element(By.XPATH, f"//div[@aria-label='Results for \"{restaurant_name}\"']")

    # Scroll the specific element down
    while True:
        # Scroll the element down by sending "Page Down" key
        scrollable_element.send_keys(Keys.END)
        
        # Wait for content to load
        time.sleep(2)
        
        # Check if the bottom of the element is reached
        last_height = driver.execute_script("return arguments[0].scrollTop", scrollable_element)
        driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", scrollable_element)
        new_height = driver.execute_script("return arguments[0].scrollTop", scrollable_element)
        
        if last_height == new_height:
            break
    
    soup = BeautifulSoup(scrollable_element.get_attribute('innerHTML'), 'html.parser')

    child_divs = soup.find_all('div', recursive=False)  # Only direct children

    res = []

    # Loop through each child div and check if it is a plain <div>...</div>
    for div in child_divs:
        # Check if the div has no attributes (i.e., it's a plain <div>...</div>)
        if not div.attrs:
            font_body_medium_div = div.find('div', class_='fontBodyMedium')
            
            if font_body_medium_div:
                name_div = font_body_medium_div.find_all('div', recursive=False)[0]
                name = name_div.find('div', class_='fontHeadlineSmall').text
                
                # Get the last direct child div of font_body_medium_div
                address_div = font_body_medium_div.find_all('div', recursive=False)[-1]

                # Get div to check if permanetly closed
                closed_div = address_div.find_all('div', recursive=False)[1].find('span', string='Permanently closed')
                if closed_div:
                    #print("Permanently closed")
                    continue

                # Get the first direct child div of the last div
                address_inner_div = address_div.find_all('div', recursive=False)[0]

                # Get the last direct child span of the first div
                spans = address_inner_div.find_all('span', recursive=False)
                if len(spans) > 1:
                    address = spans[-1].find_all('span', recursive=False)[-1].text
                    if not name or not address:
                        continue
                    long, lat, building_name = getLongLatFromAddressString(address)
                    res.append({"name": name, "address": address, "long": long, "lat": lat, "building_name": building_name})
    return res

if __name__ == "__main__":
    scrape_google_place_info("McDonalds")
