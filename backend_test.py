import requests
import sys
from datetime import datetime
import json

class SalesportAPITester:
    def __init__(self, base_url="https://ai-sales-portal-2.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                except:
                    print(f"Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")

            self.test_results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response": response.text[:500] if response.text else ""
            })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )
        return success

    def test_create_contact(self):
        """Test contact creation"""
        test_contact = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+52 123 456 7890",
            "company": "Test Company",
            "message": "This is a test message for Salesport contact form."
        }
        
        success, response = self.run_test(
            "Create Contact",
            "POST",
            "api/contact",
            200,
            data=test_contact
        )
        
        if success and 'id' in response:
            print(f"✅ Contact created with ID: {response['id']}")
            return response['id']
        return None

    def test_get_contacts(self):
        """Test getting all contacts"""
        success, response = self.run_test(
            "Get All Contacts",
            "GET",
            "api/contacts",
            200
        )
        
        if success:
            print(f"✅ Retrieved {len(response)} contacts")
            return len(response)
        return 0

    def test_contact_validation(self):
        """Test contact validation with invalid data"""
        invalid_contact = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "message": ""  # Empty message
        }
        
        success, response = self.run_test(
            "Contact Validation (Invalid Data)",
            "POST",
            "api/contact",
            422,  # Expecting validation error
            data=invalid_contact
        )
        return success

def main():
    print("🚀 Starting Salesport API Testing...")
    print("=" * 50)
    
    # Setup
    tester = SalesportAPITester()
    
    # Test sequence
    print("\n📋 Running API Tests:")
    
    # 1. Test root endpoint
    tester.test_root_endpoint()
    
    # 2. Test contact creation
    contact_id = tester.test_create_contact()
    
    # 3. Test getting contacts
    contact_count = tester.test_get_contacts()
    
    # 4. Test validation
    tester.test_contact_validation()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed. Check the details above.")
        
        # Print failed tests
        failed_tests = [test for test in tester.test_results if not test['success']]
        if failed_tests:
            print("\n🔍 Failed Tests:")
            for test in failed_tests:
                error_msg = test.get('error', f'Status {test["actual_status"]}')
                print(f"  - {test['test']}: {error_msg}")
        
        return 1

if __name__ == "__main__":
    sys.exit(main())