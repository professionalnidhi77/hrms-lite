import requests
r = requests.get('http://127.0.0.1:8000/employees')
print('status:', r.status_code)
print('text:', r.text)
print('headers:', r.headers)
