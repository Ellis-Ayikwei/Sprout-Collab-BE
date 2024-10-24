from cerberus import Validator
"""Validates user data before saving it to the database"""


schema = {
    'email': {'type': 'string', 'regex': r'[^@]+@[^@]+\.[^@]+'},
    'first_name': {'type': 'string', 'regex': r'^[a-zA-Z]+$'},
    'last_name': {'type': 'string', 'regex': r'^[a-zA-Z]+$'},
    'phone_number': {'type': 'string', 'regex': r'^\d{10}$'},
    'address': {'type': 'string', 'minlength': 5, "empty": True},
    'city': {'type': 'string'},
    'state': {'type': 'string'},
    'zip_code': {'type': 'string', 'regex': r'^\d{5}(?:[-\s]\d{4})?$'},
    'country': {'type': 'string'},
    'username': {'type': 'string', 'minlength': 4, 'maxlength': 20},
    # 'role': {'type': 'string', 'allowed': ["regular", "admin", "superadmin"]},
    'password': {'type': 'string', 'minlength': 8}
}

def validate_user_data(data: dict) -> dict:
    """
    Validates user data against the predefined schema.

    Args:
        data (dict): The user data to be validated

    Returns:
        dict: The validated user data

    Raises:
        ValueError: If the data does not validate against the schema
    """
    v = Validator(schema)
    v.allow_unknown = True

    # Remove leading and trailing whitespace from string values
    for key, value in data.items():
        if isinstance(value, str):
            data[key] = value.strip()

    if v.validate(data):
        return data

    # Raise a ValueError with the validation errors
    validation_errors = ', '.join(f'{key}: {"Not Valid"}' for key, error in v.errors.items())
    raise ValueError(validation_errors)

# # Example usage
# data = {
#     'email': 'test@example.com',
#     'first_name': 'John',
#     'last_name': 'Doe',
#     'phone_number': '1234567890',
#     'address': '123 Main St',
#     'city': 'Gotham',
#     'state': 'NY',
#     'zip_code': '10001',
#     'country': 'USA',
#     'role': 'admin',
#     'password': 'password123'
# }

# try:
#     validated_data = validate_user_data(data)
#     print("Validated data:", validated_data)
# except ValueError as e:
#     print(e)
